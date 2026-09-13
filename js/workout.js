(function () {
  "use strict";
  var Store = window.KoachStore;
  var I18n = window.KoachI18n;
  function t(k) { return I18n.t(k); }

  var WEEKDAY_KEYS = ["weekdaySun", "weekdayMon", "weekdayTue", "weekdayWed", "weekdayThu", "weekdayFri", "weekdaySat"];
  var SPLIT_ORDER = ["full_body", "ab", "abc", "ppl"];
  var SPLIT_NAME_KEYS = { full_body: "splitFullBody", ab: "splitAB", abc: "splitABC", ppl: "splitPPL" };
  var activeWorkout = null; // { workout, entries: {exerciseId:{weight, reps:[]}} }
  var selectedSplit = null;
  var editingProgram = null; // deep-clone while editing

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function showToast(msg) {
    var toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._tm);
    showToast._tm = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }

  function muscleTag(key) {
    return '<span class="muscle-tag">' + (t("muscle_" + key) || key) + "</span>";
  }

  /* ===================== ROOT RENDER ===================== */
  function render() {
    var data = Store.getData();
    var root = document.getElementById("workoutRoot");
    root.innerHTML = "";
    if (!data.meta.setupComplete || !data.program.workouts.length) {
      root.appendChild(renderSetup());
    } else {
      root.appendChild(renderHome());
    }
  }

  /* ===================== SETUP WIZARD ===================== */
  function renderSetup() {
    var wrap = el('<div class="setup-shell"></div>');
    wrap.innerHTML =
      '<h1>' + t("setupTitle") + '</h1><p>' + t("setupSubtitle") + '</p>' +
      '<div class="choice-grid" id="splitChoices"></div>' +
      '<div class="setup-actions"><button class="btn btn-primary" id="setupContinueBtn" disabled>' + t("continueBtn") + '</button></div>';

    var grid = wrap.querySelector("#splitChoices");
    SPLIT_ORDER.forEach(function (key) {
      var nameKey = SPLIT_NAME_KEYS[key];
      var card = el(
        '<div class="choice-card" data-split="' + key + '" tabindex="0" role="button">' +
        "<h3>" + t(nameKey) + "</h3><p>" + t(nameKey + "Desc") + "</p></div>"
      );
      card.addEventListener("click", function () {
        selectedSplit = key;
        grid.querySelectorAll(".choice-card").forEach(function (c) { c.classList.toggle("selected", c === card); });
        wrap.querySelector("#setupContinueBtn").disabled = false;
      });
      grid.appendChild(card);
    });

    wrap.querySelector("#setupContinueBtn").addEventListener("click", function () {
      if (!selectedSplit) return;
      Store.applySplitTemplate(selectedSplit);
      selectedSplit = null;
      render();
    });

    return wrap;
  }

  /* ===================== HOME (dashboard) ===================== */
  function renderHome() {
    var data = Store.getData();
    var wrap = el('<div></div>');

    /* --- rolling 7 days --- */
    var days = Store.getRolling7Days();
    var strip = el('<div class="card"><div class="card-title-row"><h2>' + t("last7DaysTitle") + "</h2></div><div class=\"day-strip\" id=\"dayStrip\"></div></div>");
    var dayStripEl = strip.querySelector("#dayStrip");
    days.forEach(function (d) {
      var label = d.isToday ? t("todayLabel") : t(WEEKDAY_KEYS[d.weekdayIndex]);
      var cell = el(
        '<div class="day-cell' + (d.completed ? " done" : "") + (d.isToday ? " today" : "") + '">' +
        '<span class="day-label">' + label + "</span>" +
        '<span class="day-mark">' + (d.completed ? '<svg viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4 10-10" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' : (d.completed === false && !d.workoutName ? "" : "")) + "</span>" +
        '<span class="day-sub">' + (d.completed ? escapeHtml(d.workoutName) : t("restLabel")) + "</span>" +
        "</div>"
      );
      dayStripEl.appendChild(cell);
    });
    wrap.appendChild(strip);

    /* --- next workout banner --- */
    var next = Store.getNextWorkout();
    var banner = el('<div class="card"></div>');
    if (next) {
      banner.innerHTML =
        '<div class="next-workout-banner">' +
        '<div><div class="label">' + t("nextWorkoutLabel") + '</div><h3>' + escapeHtml(next.name) + '</h3>' +
        '<div class="muscle-tags">' + next.muscleGroups.map(muscleTag).join("") + "</div></div>" +
        '<button class="btn btn-primary" id="startWorkoutBtn">' + t("startWorkoutBtn") + "</button>" +
        "</div>";
    } else {
      banner.innerHTML = '<div class="empty-state">' + t("noProgramYet") + "</div>";
    }
    wrap.appendChild(banner);

    var actions = el('<div class="hero-cta" style="margin-top:var(--space-5);"></div>');
    actions.innerHTML =
      '<button class="btn btn-ghost" id="editProgramBtn">' + t("editProgramBtn") + "</button>" +
      '<button class="btn btn-ghost" id="changeSplitBtn">' + t("changeSplitBtn") + "</button>";
    wrap.appendChild(actions);

    wrap.querySelector("#editProgramBtn").addEventListener("click", openEditProgram);
    wrap.querySelector("#changeSplitBtn").addEventListener("click", function () {
      var data2 = Store.getData();
      data2.meta.setupComplete = false;
      data2.program = { splitType: null, workouts: [] };
      Store.save();
      render();
    });
    if (next) {
      wrap.querySelector("#startWorkoutBtn").addEventListener("click", function () { openActiveWorkout(next); });
    }

    return wrap;
  }

  function formatSetsSummary(sets) {
    if (!sets || !sets.length) return t("noPreviousData");
    return sets.map(function (s) { return s.weight + "kg×" + s.reps; }).join(", ");
  }

  function escapeHtml(str) {
    var d = document.createElement("div");
    d.textContent = str == null ? "" : str;
    return d.innerHTML;
  }

  /* ===================== ACTIVE WORKOUT ===================== */
  function openActiveWorkout(workout) {
    activeWorkout = { workout: workout, entries: {} };
    var overlay = document.getElementById("activeWorkoutOverlay");
    var sheet = overlay.querySelector(".modal-sheet");
    sheet.innerHTML =
      '<div class="modal-head"><h2>' + escapeHtml(workout.name) + '</h2>' +
      '<button class="modal-close" id="closeActiveWorkout" aria-label="' + t("cancelBtn") + '"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></div>' +
      '<div id="activeExerciseList"></div>' +
      '<div class="modal-actions">' +
      '<button class="btn btn-ghost" id="discardWorkoutBtn">' + t("discardBtn") + '</button>' +
      '<button class="btn btn-primary" id="finishWorkoutBtn">' + t("finishWorkoutBtn") + "</button>" +
      "</div>";

    var list = sheet.querySelector("#activeExerciseList");
    workout.exercises.forEach(function (pex) {
      var exercise = Store.getExerciseById(pex.exerciseId) || { name: pex.exerciseId };
      var last = Store.getLastPerformanceForExercise(pex.exerciseId);
      var card = el('<div class="exercise-card compact"></div>');
      var lastText = last ? formatSetsSummary(last.entry.sets) : t("noPreviousData");
      card.innerHTML =
        '<div class="ex-head-row"><h4>' + escapeHtml(exercise.name) + '</h4>' +
        '<span class="ex-meta">' + t("targetLabel") + " " + pex.sets + "×" + pex.repMin + "–" + pex.repMax + "</span></div>" +
        '<div class="ex-last">' + t("lastWorkoutLabel") + ": " + lastText + "</div>" +
        '<div class="set-log-table" data-ex="' + pex.exerciseId + '">' +
        '<div class="set-log-head"><span></span><span>' + t("weightUsedLabel") + '</span><span>' + t("repsHeaderLabel") + "</span></div>" +
        Array.from({ length: pex.sets }).map(function (_, i) {
          return '<div class="set-log-row">' +
            '<span class="set-log-num">' + t("setLabelShort") + " " + (i + 1) + '</span>' +
            '<input type="number" inputmode="decimal" step="0.5" min="0" class="set-log-input" data-role="set-weight" data-ex="' + pex.exerciseId + '" data-set="' + i + '">' +
            '<input type="number" inputmode="numeric" min="0" class="set-log-input" data-role="set-reps" data-ex="' + pex.exerciseId + '" data-set="' + i + '">' +
            "</div>";
        }).join("") +
        "</div>" +
        '<input type="text" class="notes-field" placeholder="' + t("notesPlaceholder") + '" data-role="notes" data-ex="' + pex.exerciseId + '" maxlength="140">';
      list.appendChild(card);
    });

    overlay.hidden = false;
    document.body.style.overflow = "hidden";

    sheet.querySelector("#closeActiveWorkout").addEventListener("click", closeActiveWorkout);
    sheet.querySelector("#discardWorkoutBtn").addEventListener("click", closeActiveWorkout);
    sheet.querySelector("#finishWorkoutBtn").addEventListener("click", finishActiveWorkout);
  }

  function closeActiveWorkout() {
    var overlay = document.getElementById("activeWorkoutOverlay");
    overlay.hidden = true;
    document.body.style.overflow = "";
    activeWorkout = null;
  }

  function finishActiveWorkout() {
    if (!activeWorkout) return;
    var overlay = document.getElementById("activeWorkoutOverlay");
    var entries = [];
    activeWorkout.workout.exercises.forEach(function (pex) {
      var weightInputs = overlay.querySelectorAll('[data-role="set-weight"][data-ex="' + pex.exerciseId + '"]');
      var repInputs = overlay.querySelectorAll('[data-role="set-reps"][data-ex="' + pex.exerciseId + '"]');
      var notesInput = overlay.querySelector('[data-role="notes"][data-ex="' + pex.exerciseId + '"]');
      var sets = Array.from(weightInputs).map(function (inp, i) {
        var w = parseFloat(inp.value);
        var r = parseInt(repInputs[i].value, 10);
        return { weight: isNaN(w) ? 0 : w, reps: isNaN(r) ? 0 : r };
      });
      var hasData = sets.some(function (s) { return s.weight > 0 || s.reps > 0; });
      var notes = notesInput ? notesInput.value.trim() : "";
      if (hasData || notes) {
        entries.push({ exerciseId: pex.exerciseId, sets: sets, notes: notes });
      }
    });
    Store.addSession({
      date: Store.todayISO(),
      workoutId: activeWorkout.workout.id,
      workoutName: activeWorkout.workout.name,
      entries: entries
    });
    closeActiveWorkout();
    showToast(t("workoutSavedMsg"));
    render();
  }

  /* ===================== EDIT PROGRAM ===================== */
  function openEditProgram() {
    var data = Store.getData();
    editingProgram = JSON.parse(JSON.stringify(data.program));
    var overlay = document.getElementById("editProgramOverlay");
    var sheet = overlay.querySelector(".modal-sheet");
    renderEditProgramSheet(sheet);
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeEditProgram() {
    document.getElementById("editProgramOverlay").hidden = true;
    document.body.style.overflow = "";
    editingProgram = null;
  }

  function renderEditProgramSheet(sheet) {
    sheet.innerHTML =
      '<div class="modal-head"><h2>' + t("editProgramTitle") + '</h2>' +
      '<button class="modal-close" id="closeEditProgram" aria-label="' + t("cancelBtn") + '"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></div>' +
      '<div id="programWorkoutBlocks"></div>' +
      '<button class="btn btn-ghost" id="addWorkoutBtn" style="width:100%;margin-top:8px;">' + t("addWorkoutBtn") + '</button>' +
      '<div class="modal-actions">' +
      '<button class="btn btn-ghost" id="cancelEditProgram">' + t("cancelBtn") + '</button>' +
      '<button class="btn btn-primary" id="saveProgramBtn">' + t("saveProgramBtn") + "</button>" +
      "</div>";

    var blocksEl = sheet.querySelector("#programWorkoutBlocks");
    editingProgram.workouts.forEach(function (w, wIdx) {
      blocksEl.appendChild(renderWorkoutBlock(w, wIdx));
    });

    sheet.querySelector("#closeEditProgram").addEventListener("click", closeEditProgram);
    sheet.querySelector("#cancelEditProgram").addEventListener("click", closeEditProgram);
    sheet.querySelector("#addWorkoutBtn").addEventListener("click", function () {
      editingProgram.workouts.push({ id: Store.uid("workout"), name: "Workout " + (editingProgram.workouts.length + 1), muscleGroups: [], exercises: [] });
      renderEditProgramSheet(sheet);
    });
    sheet.querySelector("#saveProgramBtn").addEventListener("click", function () {
      Store.updateProgram(editingProgram);
      closeEditProgram();
      showToast(t("saveBtn"));
      render();
    });
  }

  function renderWorkoutBlock(workout, wIdx) {
    var block = el('<div class="program-workout-block"></div>');
    block.innerHTML =
      '<div class="pwb-head">' +
      '<input type="text" value="' + escapeHtml(workout.name) + '" data-role="workout-name" placeholder="' + t("workoutNameLabel") + '">' +
      '<button class="icon-btn" data-role="remove-workout" aria-label="' + t("removeWorkoutBtn") + '"><svg viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      "</div>" +
      '<div class="pill-select" data-role="muscle-groups">' +
      Store.MUSCLE_GROUPS.map(function (mg) {
        var active = workout.muscleGroups.indexOf(mg) !== -1;
        return '<button type="button" class="' + (active ? "active" : "") + '" data-mg="' + mg + '">' + t("muscle_" + mg) + "</button>";
      }).join("") +
      "</div>" +
      '<div data-role="exercise-rows" style="margin-top:var(--space-3);"></div>' +
      '<div class="form-grid" style="margin-top:var(--space-2);">' +
      '<select data-role="exercise-picker">' +
      '<option value="">' + t("chooseFromLibrary") + '</option>' +
      groupedExerciseOptions() +
      '<option value="__custom__">' + t("customExerciseOption") + '</option>' +
      "</select>" +
      '<button class="btn btn-ghost btn-sm" data-role="add-exercise-btn" type="button">' + t("addExerciseBtn") + '</button>' +
      "</div>";

    var rowsEl = block.querySelector('[data-role="exercise-rows"]');
    workout.exercises.forEach(function (pex, exIdx) {
      rowsEl.appendChild(renderExerciseRow(workout, pex, exIdx));
    });
    enableExerciseReorder(rowsEl, workout);

    block.querySelector('[data-role="workout-name"]').addEventListener("input", function (e) {
      workout.name = e.target.value;
    });
    block.querySelector('[data-role="remove-workout"]').addEventListener("click", function () {
      if (!confirm(t("confirmDeleteWorkout"))) return;
      editingProgram.workouts.splice(wIdx, 1);
      renderEditProgramSheet(document.querySelector("#editProgramOverlay .modal-sheet"));
    });
    block.querySelectorAll('[data-role="muscle-groups"] button').forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mg = btn.getAttribute("data-mg");
        var idx = workout.muscleGroups.indexOf(mg);
        if (idx === -1) {
          workout.muscleGroups.push(mg);
          /* Auto-include exercises the user already uses for this muscle
             group (from history or other workouts) — never the whole
             library, and never exercises they've never touched. */
          var existingIds = workout.exercises.map(function (pex) { return pex.exerciseId; });
          Store.getExercisesUsedForMuscleGroup(mg).forEach(function (ex) {
            if (existingIds.indexOf(ex.id) === -1) {
              workout.exercises.push({ id: Store.uid("pex"), exerciseId: ex.id, sets: 3, repMin: 8, repMax: 10 });
            }
          });
        } else {
          workout.muscleGroups.splice(idx, 1);
          /* Remove this workout's exercises that belong to that muscle group.
             Each exercise has exactly one muscle group in this app, so there
             is no "also belongs to a still-active group" case to protect —
             removing here only detaches it from THIS workout; the exercise
             and all of its historical session/progress data are untouched. */
          workout.exercises = workout.exercises.filter(function (pex) {
            var ex = Store.getExerciseById(pex.exerciseId);
            return !ex || ex.muscleGroup !== mg;
          });
        }
        renderEditProgramSheet(document.querySelector("#editProgramOverlay .modal-sheet"));
      });
    });
    block.querySelector('[data-role="add-exercise-btn"]').addEventListener("click", function () {
      var picker = block.querySelector('[data-role="exercise-picker"]');
      var val = picker.value;
      if (!val) return;
      if (val === "__custom__") {
        var name = prompt(t("customExerciseNamePlaceholder"));
        if (!name) return;
        var ex = Store.addCustomExercise(name.trim(), "other");
        workout.exercises.push({ id: Store.uid("pex"), exerciseId: ex.id, sets: 3, repMin: 8, repMax: 10 });
      } else {
        workout.exercises.push({ id: Store.uid("pex"), exerciseId: val, sets: 3, repMin: 8, repMax: 10 });
      }
      renderEditProgramSheet(document.querySelector("#editProgramOverlay .modal-sheet"));
    });

    return block;
  }

  function renderExerciseRow(workout, pex, exIdx) {
    var exercise = Store.getExerciseById(pex.exerciseId) || { name: pex.exerciseId };
    var row = el('<div class="program-exercise-row" data-pex-id="' + pex.id + '"></div>');
    row.innerHTML =
      '<span class="drag-handle" data-role="drag-handle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="6" r="1.5" fill="currentColor"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="9" cy="18" r="1.5" fill="currentColor"/><circle cx="15" cy="6" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="18" r="1.5" fill="currentColor"/></svg></span>' +
      '<span class="ex-name" data-role="ex-name" tabindex="0" title="' + t("renameExerciseHint") + '">' + escapeHtml(exercise.name) + "</span>" +
      '<div class="mini-field"><input type="number" min="1" max="10" value="' + pex.sets + '" data-role="sets" aria-label="' + t("setsLabel") + '"></div>' +
      '<div class="mini-field"><input type="number" min="1" max="30" value="' + pex.repMin + '" data-role="repMin" aria-label="' + t("repMinLabel") + '"></div>' +
      '<div class="mini-field"><input type="number" min="1" max="30" value="' + pex.repMax + '" data-role="repMax" aria-label="' + t("repMaxLabel") + '"></div>' +
      '<button class="icon-btn" data-role="remove-exercise" aria-label="' + t("removeExerciseBtn") + '"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>';

    row.querySelector('[data-role="sets"]').addEventListener("input", function (e) { pex.sets = parseInt(e.target.value, 10) || 1; });
    row.querySelector('[data-role="repMin"]').addEventListener("input", function (e) { pex.repMin = parseInt(e.target.value, 10) || 1; });
    row.querySelector('[data-role="repMax"]').addEventListener("input", function (e) { pex.repMax = parseInt(e.target.value, 10) || 1; });
    row.querySelector('[data-role="remove-exercise"]').addEventListener("click", function () {
      workout.exercises.splice(exIdx, 1);
      renderEditProgramSheet(document.querySelector("#editProgramOverlay .modal-sheet"));
    });

    var nameEl = row.querySelector('[data-role="ex-name"]');
    function startRename() {
      var input = document.createElement("input");
      input.type = "text";
      input.className = "ex-name-input";
      input.value = exercise.name;
      nameEl.replaceWith(input);
      input.focus();
      input.select();
      function commit() {
        var val = input.value.trim();
        if (val && val !== exercise.name) {
          Store.renameExercise(exercise.id, val);
          showToast(t("exerciseRenamedMsg"));
        }
        renderEditProgramSheet(document.querySelector("#editProgramOverlay .modal-sheet"));
      }
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") input.blur();
        if (e.key === "Escape") { input.value = exercise.name; input.blur(); }
      });
    }
    nameEl.addEventListener("click", startRename);
    nameEl.addEventListener("keydown", function (e) { if (e.key === "Enter") startRename(); });

    return row;
  }

  /* Pointer-based drag reorder for exercise rows — works with mouse AND touch
     (unlike HTML5 dragstart/dragover, which most mobile browsers never fire). */
  function enableExerciseReorder(container, workout) {
    var dragEl = null;

    container.addEventListener("pointerdown", function (e) {
      var handle = e.target.closest('[data-role="drag-handle"]');
      if (!handle) return;
      var row = handle.closest(".program-exercise-row");
      if (!row) return;
      e.preventDefault();
      dragEl = row;
      row.classList.add("dragging");
      try { row.setPointerCapture(e.pointerId); } catch (err) {}
    });

    container.addEventListener("pointermove", function (e) {
      if (!dragEl) return;
      var rows = Array.from(container.querySelectorAll(".program-exercise-row:not(.dragging)"));
      var after = rows.find(function (r) {
        var box = r.getBoundingClientRect();
        return e.clientY < box.top + box.height / 2;
      });
      if (after) container.insertBefore(dragEl, after);
      else container.appendChild(dragEl);
    });

    function endDrag() {
      if (!dragEl) return;
      dragEl.classList.remove("dragging");
      dragEl = null;
      var newOrder = Array.from(container.querySelectorAll(".program-exercise-row")).map(function (row) {
        return row.getAttribute("data-pex-id");
      });
      workout.exercises.sort(function (a, b) { return newOrder.indexOf(a.id) - newOrder.indexOf(b.id); });
    }
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointercancel", endDrag);
  }

  function groupedExerciseOptions() {
    var data = Store.getData();
    var byGroup = {};
    data.exercises.forEach(function (ex) {
      byGroup[ex.muscleGroup] = byGroup[ex.muscleGroup] || [];
      byGroup[ex.muscleGroup].push(ex);
    });
    return Object.keys(byGroup).map(function (mg) {
      return '<optgroup label="' + t("muscle_" + mg) + '">' +
        byGroup[mg].map(function (ex) { return '<option value="' + ex.id + '">' + escapeHtml(ex.name) + "</option>"; }).join("") +
        "</optgroup>";
    }).join("");
  }

  window.KoachAuth.ready.then(function () {
    render();
    I18n.onChange(function () { render(); });
  });
})();
