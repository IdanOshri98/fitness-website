(function () {
  "use strict";
  var Store = window.KoachStore;
  var I18n = window.KoachI18n;
  function t(k) { return I18n.t(k); }

  function el(html) {
    var tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  }
  function escapeHtml(str) {
    var d = document.createElement("div");
    d.textContent = str == null ? "" : str;
    return d.innerHTML;
  }
  function muscleTag(key) {
    return '<span class="muscle-tag">' + (t("muscle_" + key) || key) + "</span>";
  }

  var SPLIT_NAME_KEYS = { full_body: "splitFullBody", ab: "splitAB", abc: "splitABC", ppl: "splitPPL" };

  function render() {
    var root = document.getElementById("dashboardRoot");
    root.innerHTML = "";
    var data = Store.getData();

    /* Each card below decides for itself what it has enough data to show —
       a missing workout program must never hide profile/nutrition info the
       user already entered, and vice versa. See the "מסך הבית" plan section. */
    root.appendChild(renderTodaysGoals(data));
    root.appendChild(renderTodaysWorkout(data));
    root.appendChild(renderUserSummary(data));
  }

  /* ===================== TODAY'S GOALS ===================== */
  function renderTodaysGoals(data) {
    var hasProgram = data.meta.setupComplete && data.program.workouts.length;
    var card = el('<div class="card"></div>');
    card.innerHTML = '<div class="card-title-row"><h2>' + t("todaysGoalsTitle") + "</h2></div>";
    var row = el('<div class="goal-tile-row"></div>');

    if (hasProgram) {
      var next = Store.getNextWorkout();
      row.appendChild(el(
        '<div class="goal-tile"><div class="gt-label">' + t("goalWorkoutLabel") + '</div><div class="gt-value">' +
        escapeHtml(next.name) + "</div></div>"
      ));
    } else {
      row.appendChild(el(
        '<div class="goal-tile prompt"><div class="gt-label">' + t("goalWorkoutLabel") + '</div>' +
        '<a href="workout.html">' + t("setUpWorkoutLink") + "</a></div>"
      ));
    }

    if (data.meta.nutritionSetupComplete) {
      var totals = Store.computeDailyTotals();
      var targets = data.nutrition.targets;
      row.appendChild(el(
        '<div class="goal-tile"><div class="gt-label">' + t("goalCaloriesLabel") + '</div><div class="gt-value">' +
        totals.calories + " / " + targets.calories + "</div></div>"
      ));
      row.appendChild(el(
        '<div class="goal-tile"><div class="gt-label">' + t("goalProteinLabel") + '</div><div class="gt-value">' +
        totals.protein + " / " + targets.protein + "g</div></div>"
      ));
    } else {
      row.appendChild(el(
        '<div class="goal-tile prompt"><div class="gt-label">' + t("goalCaloriesLabel") + '</div>' +
        '<a href="nutrition.html">' + t("setUpNutritionLink") + "</a></div>"
      ));
    }

    row.appendChild(renderSleepTile());

    card.appendChild(row);
    return card;
  }

  /* ===================== SLEEP (small tile inside Today's Goals) ===================== */
  function renderSleepTile() {
    var todayIso = Store.todayISO();
    var todayEntry = Store.getSleepEntryForDate(todayIso);
    var avg = Store.getAverageSleepLast7Days();
    var avgLine = avg !== null
      ? '<div class="gt-sub">' + t("sleepAvgLabel") + " " + avg + t("hoursShort") + "</div>"
      : "";

    var tile = el('<div class="goal-tile sleep-tile"><div class="gt-label">' + t("goalSleepLabel") + "</div></div>");

    if (todayEntry) {
      tile.innerHTML +=
        '<div class="sleep-logged-row"><span class="gt-value">' + todayEntry.hours + t("hoursShort") + '</span>' +
        '<button class="icon-btn sleep-edit-btn" id="sleepEditBtn" aria-label="' + t("editBtn") + '"><svg viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>' +
        avgLine;
      tile.querySelector("#sleepEditBtn").addEventListener("click", function () {
        var newTile = renderSleepInputState(todayIso, todayEntry.hours, avgLine);
        tile.replaceWith(newTile);
      });
    } else {
      var inputWrap = renderSleepInputState(todayIso, "", avgLine);
      return inputWrap;
    }

    return tile;
  }

  function renderSleepInputState(dateISO, currentValue, avgLine) {
    var tile = el(
      '<div class="goal-tile sleep-tile"><div class="gt-label">' + t("goalSleepLabel") + '</div>' +
      '<div class="sleep-input-row">' +
      '<input type="number" inputmode="decimal" step="0.5" min="0" max="24" id="sleepHoursInput" placeholder="' + t("hoursPlaceholder") + '" value="' + escapeHtml(String(currentValue)) + '">' +
      '<button class="icon-btn sleep-save-btn" id="sleepSaveBtn" aria-label="' + t("saveBtn") + '"><svg viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4 10-10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      "</div>" + avgLine + "</div>"
    );
    var input = tile.querySelector("#sleepHoursInput");
    function save() {
      var hours = parseFloat(input.value);
      if (isNaN(hours) || hours < 0) { input.focus(); return; }
      Store.addSleepEntry(hours, dateISO);
      render();
    }
    tile.querySelector("#sleepSaveBtn").addEventListener("click", save);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); save(); } });
    return tile;
  }

  /* ===================== TODAY'S WORKOUT ===================== */
  function renderTodaysWorkout(data) {
    var hasProgram = data.meta.setupComplete && data.program.workouts.length;
    var card = el('<div class="card"></div>');
    if (!hasProgram) {
      card.innerHTML =
        '<div class="empty-state">' + t("noProgramYet") + " " +
        '<a href="workout.html" style="color:var(--color-primary);font-weight:700;text-decoration:none;">' + t("setUpWorkoutLink") + "</a></div>";
      return card;
    }
    var next = Store.getNextWorkout();
    card.innerHTML =
      '<div class="next-workout-banner">' +
      '<div><div class="label">' + t("nextWorkoutLabel") + '</div><h3>' + escapeHtml(next.name) + '</h3>' +
      '<div class="muscle-tags">' + next.muscleGroups.map(muscleTag).join("") + "</div></div>" +
      '<a class="btn btn-primary" href="workout.html">' + t("startWorkoutBtn") + "</a>" +
      "</div>";
    return card;
  }

  /* ===================== USER SUMMARY ===================== */
  function renderUserSummary(data) {
    var profile = Store.getProfile();
    var weightEntries = Store.getWeightEntries();
    var weeks = Store.getWeeklyWorkoutCounts(4);
    var avgConsistency = Math.round((weeks.reduce(function (s, w) { return s + w.count; }, 0) / weeks.length) * 10) / 10;
    var hasProgram = data.meta.setupComplete && data.program.workouts.length;
    var splitLabel = data.program.splitType && SPLIT_NAME_KEYS[data.program.splitType]
      ? t(SPLIT_NAME_KEYS[data.program.splitType])
      : t("splitCustom");

    var card = el('<div class="card"></div>');
    card.innerHTML =
      '<div class="card-title-row"><h2>' + t("userSummaryTitle") + '</h2>' +
      '<button class="btn btn-ghost btn-sm" id="editProfileLink">' + t("editProfileBtn") + "</button></div>";

    var grid = el('<div class="summary-grid"></div>');

    grid.appendChild(weightEntries.length
      ? el('<div class="summary-item"><span>' + t("weightKgLabel") + '</span><b>' + weightEntries[weightEntries.length - 1].weightKg + " kg</b></div>")
      : el('<div class="summary-item missing"><span>' + t("weightKgLabel") + '</span><a href="progress.html">' + t("addWeightBtn") + "</a></div>"));

    grid.appendChild(profile.heightCm
      ? el('<div class="summary-item"><span>' + t("heightLabel") + '</span><b>' + profile.heightCm + " cm</b></div>")
      : el('<div class="summary-item missing"><span>' + t("heightLabel") + '</span><a href="nutrition.html">' + t("addBtn") + "</a></div>"));

    grid.appendChild(profile.goal
      ? el('<div class="summary-item"><span>' + t("goalLabel") + '</span><b>' + t(profile.goal === "cut" ? "templateCut" : profile.goal === "bulk" ? "templateBulk" : "templateMaintenance") + "</b></div>")
      : el('<div class="summary-item missing"><span>' + t("goalLabel") + '</span><a href="nutrition.html">' + t("addBtn") + "</a></div>"));

    grid.appendChild(hasProgram
      ? el('<div class="summary-item"><span>' + t("currentProgramLabel") + '</span><b>' + escapeHtml(splitLabel) + "</b></div>")
      : el('<div class="summary-item missing"><span>' + t("currentProgramLabel") + '</span><a href="workout.html">' + t("addBtn") + "</a></div>"));
    grid.appendChild(el('<div class="summary-item"><span>' + t("consistencyLabel") + '</span><b>' + avgConsistency + " " + t("workoutsPerWeekLabel") + "</b></div>"));

    card.appendChild(grid);
    card.querySelector("#editProfileLink").addEventListener("click", openProfileModal);
    return card;
  }

  /* ===================== EDIT PROFILE MODAL ===================== */
  function openProfileModal() {
    var profile = Store.getProfile();
    var overlay = document.getElementById("profileOverlay");
    var sheet = overlay.querySelector(".modal-sheet");
    sheet.innerHTML =
      '<div class="modal-head"><h2>' + t("editProfileBtn") + '</h2>' +
      '<button class="modal-close" id="closeProfile"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></div>' +
      '<div class="form-grid">' +
      '<div class="form-row"><label>' + t("heightLabel") + '</label><input type="number" id="epHeight" value="' + (profile.heightCm || "") + '"></div>' +
      '<div class="form-row"><label>' + t("ageLabel") + '</label><input type="number" id="epAge" value="' + (profile.age || "") + '"></div>' +
      "</div>" +
      '<div class="form-row"><label>' + t("sexLabel") + '</label><div class="pill-select" id="epSex">' +
      ["male", "female"].map(function (s) { return '<button type="button" data-val="' + s + '" class="' + (profile.sex === s ? "active" : "") + '">' + t("sex_" + s) + "</button>"; }).join("") +
      "</div></div>" +
      '<div class="form-row"><label>' + t("activityLabel") + '</label><div class="pill-select" id="epActivity">' +
      Store.ACTIVITY_LEVELS.map(function (a) { return '<button type="button" data-val="' + a.id + '" class="' + (profile.activityLevel === a.id ? "active" : "") + '">' + t("activity_" + a.id) + "</button>"; }).join("") +
      "</div></div>" +
      '<div class="form-row"><label>' + t("goalLabel") + '</label><div class="pill-select" id="epGoal">' +
      Store.GOALS.map(function (g) { return '<button type="button" data-val="' + g + '" class="' + (profile.goal === g ? "active" : "") + '">' + t(g === "cut" ? "templateCut" : g === "bulk" ? "templateBulk" : "templateMaintenance") + "</button>"; }).join("") +
      "</div></div>" +
      '<div class="modal-actions"><button class="btn btn-ghost" id="cancelProfile">' + t("cancelBtn") + '</button>' +
      '<button class="btn btn-primary" id="saveProfile">' + t("saveBtn") + "</button></div>";

    function pillPick(containerId) {
      sheet.querySelector(containerId).addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;
        sheet.querySelectorAll(containerId + " button").forEach(function (b) { b.classList.toggle("active", b === btn); });
      });
    }
    pillPick("#epSex");
    pillPick("#epActivity");
    pillPick("#epGoal");

    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    function close() { overlay.hidden = true; document.body.style.overflow = ""; }
    sheet.querySelector("#closeProfile").addEventListener("click", close);
    sheet.querySelector("#cancelProfile").addEventListener("click", close);
    sheet.querySelector("#saveProfile").addEventListener("click", function () {
      var sexBtn = sheet.querySelector("#epSex .active");
      var activityBtn = sheet.querySelector("#epActivity .active");
      var goalBtn = sheet.querySelector("#epGoal .active");
      Store.updateProfile({
        heightCm: parseFloat(sheet.querySelector("#epHeight").value) || profile.heightCm,
        age: parseInt(sheet.querySelector("#epAge").value, 10) || profile.age,
        sex: sexBtn ? sexBtn.getAttribute("data-val") : profile.sex,
        activityLevel: activityBtn ? activityBtn.getAttribute("data-val") : profile.activityLevel,
        goal: goalBtn ? goalBtn.getAttribute("data-val") : profile.goal
      });
      close();
      render();
    });
  }

  window.KoachAuth.ready.then(function () {
    render();
    I18n.onChange(function () { render(); });
  });
})();
