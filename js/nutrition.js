(function () {
  "use strict";
  var Store = window.KoachStore;
  var I18n = window.KoachI18n;
  function t(k) { return I18n.t(k); }

  var TIME_ORDER = ["morning", "midday", "afternoon", "evening"];
  var GOAL_LABEL_KEYS = { cut: "templateCut", maintenance: "templateMaintenance", bulk: "templateBulk" };
  var addFoodTargetMealId = null;

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
  function showToast(msg) {
    var toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._tm);
    showToast._tm = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }

  /* ===================== ROOT RENDER ===================== */
  function render() {
    var data = Store.getData();
    var root = document.getElementById("nutritionRoot");
    root.innerHTML = "";
    if (!data.meta.nutritionSetupComplete) {
      root.appendChild(renderSetup());
    } else {
      Store.ensureMealsSeeded();
      root.appendChild(renderSummary());
      root.appendChild(renderMealBoard());
    }
  }

  /* ===================== SETUP (real body info → calculated suggestion) =====================
     Two steps, both gated on real data — nothing here is ever invented:
       1) collect height/age/sex/activity/goal (+ a first weight entry if none exists yet,
          which becomes the user's real Progress weight log, not a separate fake value)
       2) show a calculated suggestion (Mifflin-St Jeor) the user can edit before saving */
  function renderSetup() {
    if (!Store.isProfileComplete()) return renderProfileForm();
    return renderSuggestionStep();
  }

  function renderProfileForm() {
    var profile = Store.getProfile();
    var hasWeight = Store.getWeightEntries().length > 0;
    var wrap = el('<div class="setup-shell" style="text-align:start;max-width:520px;"></div>');
    wrap.innerHTML =
      "<h1 style=\"text-align:center;\">" + t("nutritionSetupTitle") + "</h1>" +
      '<p style="text-align:center;">' + t("nutritionSetupSubtitle") + "</p>" +
      '<div class="card" style="text-align:start;margin-top:var(--space-5);">' +
      (hasWeight ? "" : '<div class="form-row"><label>' + t("weightKgLabel") + '</label><input type="number" step="0.1" min="0" id="pfWeight"></div>') +
      '<div class="form-grid">' +
      '<div class="form-row"><label>' + t("heightLabel") + '</label><input type="number" min="0" id="pfHeight" value="' + (profile.heightCm || "") + '"></div>' +
      '<div class="form-row"><label>' + t("ageLabel") + '</label><input type="number" min="0" id="pfAge" value="' + (profile.age || "") + '"></div>' +
      "</div>" +
      '<div class="form-row"><label>' + t("sexLabel") + '</label><div class="pill-select" id="pfSex">' +
      ["male", "female"].map(function (s) { return '<button type="button" data-val="' + s + '" class="' + (profile.sex === s ? "active" : "") + '">' + t("sex_" + s) + "</button>"; }).join("") +
      "</div></div>" +
      '<div class="form-row"><label>' + t("activityLabel") + '</label><div class="pill-select" id="pfActivity">' +
      Store.ACTIVITY_LEVELS.map(function (a) { return '<button type="button" data-val="' + a.id + '" class="' + (profile.activityLevel === a.id ? "active" : "") + '">' + t("activity_" + a.id) + "</button>"; }).join("") +
      "</div></div>" +
      '<div class="form-row"><label>' + t("goalLabel") + '</label><div class="pill-select" id="pfGoal">' +
      Store.GOALS.map(function (g) { return '<button type="button" data-val="' + g + '" class="' + (profile.goal === g ? "active" : "") + '">' + t(GOAL_LABEL_KEYS[g]) + "</button>"; }).join("") +
      "</div></div>" +
      '<button class="btn btn-primary" id="pfContinue" style="width:100%;margin-top:var(--space-3);">' + t("continueBtn") + "</button>" +
      "</div>";

    function pillPick(containerId, field) {
      wrap.querySelector(containerId).addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;
        wrap.querySelectorAll(containerId + " button").forEach(function (b) { b.classList.toggle("active", b === btn); });
        btn.dataset.picked = "1";
      });
    }
    pillPick("#pfSex", "sex");
    pillPick("#pfActivity", "activityLevel");
    pillPick("#pfGoal", "goal");

    wrap.querySelector("#pfContinue").addEventListener("click", function () {
      var height = parseFloat(wrap.querySelector("#pfHeight").value);
      var age = parseInt(wrap.querySelector("#pfAge").value, 10);
      var sexBtn = wrap.querySelector("#pfSex .active");
      var activityBtn = wrap.querySelector("#pfActivity .active");
      var goalBtn = wrap.querySelector("#pfGoal .active");
      var weightInput = wrap.querySelector("#pfWeight");
      var weight = weightInput ? parseFloat(weightInput.value) : null;

      if (!height || !age || !sexBtn || !activityBtn || !goalBtn || (weightInput && !weight)) {
        showToast(t("fillAllFieldsMsg"));
        return;
      }
      Store.updateProfile({
        heightCm: height,
        age: age,
        sex: sexBtn.getAttribute("data-val"),
        activityLevel: activityBtn.getAttribute("data-val"),
        goal: goalBtn.getAttribute("data-val")
      });
      if (weightInput) Store.addWeightEntry(weight);
      render();
    });

    return wrap;
  }

  function renderSuggestionStep() {
    var profile = Store.getProfile();
    var weightEntries = Store.getWeightEntries();
    var latestWeight = weightEntries[weightEntries.length - 1].weightKg;
    var suggestion = Store.calculateSuggestedTargets(profile, latestWeight);

    var wrap = el('<div class="setup-shell" style="max-width:480px;"></div>');
    wrap.innerHTML =
      "<h1>" + t("suggestionTitle") + "</h1><p>" + t("suggestionSubtitle") + "</p>" +
      '<div class="card" style="text-align:start;margin-top:var(--space-5);">' +
      '<div class="form-grid">' +
      '<div class="form-row"><label>' + t("dailyCaloriesLabel") + '</label><input type="number" id="sgCalories" value="' + suggestion.calories + '"></div>' +
      '<div class="form-row"><label>' + t("dailyProteinLabel") + '</label><input type="number" id="sgProtein" value="' + suggestion.protein + '"></div>' +
      "</div>" +
      '<p class="chart-empty" style="text-align:start;padding:0;margin-top:4px;">' + t("suggestionNote") + '</p>' +
      '<button class="btn btn-primary" id="sgConfirm" style="width:100%;margin-top:var(--space-4);">' + t("saveTargetsBtn") + '</button>' +
      '<button class="btn btn-ghost btn-sm" id="sgEditProfile" style="width:100%;margin-top:var(--space-2);">' + t("editProfileBtn") + "</button>" +
      "</div>";

    wrap.querySelector("#sgConfirm").addEventListener("click", function () {
      var cal = parseInt(wrap.querySelector("#sgCalories").value, 10) || suggestion.calories;
      var pro = parseInt(wrap.querySelector("#sgProtein").value, 10) || suggestion.protein;
      Store.updateNutritionTargets(cal, pro);
      Store.getData().meta.nutritionSetupComplete = true;
      Store.save();
      render();
    });
    wrap.querySelector("#sgEditProfile").addEventListener("click", function () {
      Store.updateProfile({ goal: null });
      render();
    });

    return wrap;
  }

  /* ===================== SUMMARY ===================== */
  function renderSummary() {
    var data = Store.getData();
    var totals = Store.computeDailyTotals();
    var targets = data.nutrition.targets;

    var calRemaining = targets.calories - totals.calories;
    var proRemaining = targets.protein - totals.protein;

    var card = el('<div class="card"></div>');
    card.innerHTML =
      '<div class="card-title-row"><h2>' + t("nutritionPageTitle") + '</h2>' +
      '<button class="btn btn-ghost btn-sm" id="editTargetsBtn">' + t("editTargetsBtn") + "</button></div>" +
      '<div class="nutrition-summary">' +
      '<div class="nutrition-metric">' +
      '<div class="metric-row"><b>' + totals.calories + " / " + targets.calories + "</b><span>" + t("caloriesUnit") + "</span></div>" +
      '<div class="metric-feedback' + (calRemaining < 0 ? " over" : "") + '">' +
      (calRemaining >= 0 ? calRemaining + " " + t("caloriesUnit") + " " + t("remainingLabel") : Math.abs(calRemaining) + " " + t("caloriesUnit") + " " + t("overLabel")) +
      "</div></div>" +
      '<div class="nutrition-metric">' +
      '<div class="metric-row"><b>' + totals.protein + " / " + targets.protein + "g</b><span>" + t("proteinLabel") + "</span></div>" +
      '<div class="metric-feedback' + (proRemaining < 0 ? " over" : "") + '">' +
      (proRemaining >= 0 ? proRemaining + "g " + t("remainingLabel") : Math.abs(proRemaining) + "g " + t("overLabel")) +
      "</div></div>" +
      "</div>";

    card.querySelector("#editTargetsBtn").addEventListener("click", openTargetsModal);
    return card;
  }

  function openTargetsModal() {
    var data = Store.getData();
    var overlay = document.getElementById("targetsOverlay");
    var sheet = overlay.querySelector(".modal-sheet");
    sheet.innerHTML =
      '<div class="modal-head"><h2>' + t("targetsTitle") + '</h2>' +
      '<button class="modal-close" id="closeTargets"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></div>' +
      '<div class="form-row"><label>' + t("dailyCaloriesLabel") + '</label><input type="number" id="targetCalories" value="' + data.nutrition.targets.calories + '"></div>' +
      '<div class="form-row"><label>' + t("dailyProteinLabel") + '</label><input type="number" id="targetProtein" value="' + data.nutrition.targets.protein + '"></div>' +
      '<div class="modal-actions"><button class="btn btn-ghost" id="cancelTargets">' + t("cancelBtn") + '</button>' +
      '<button class="btn btn-primary" id="saveTargets">' + t("saveTargetsBtn") + "</button></div>";

    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    function close() { overlay.hidden = true; document.body.style.overflow = ""; }
    sheet.querySelector("#closeTargets").addEventListener("click", close);
    sheet.querySelector("#cancelTargets").addEventListener("click", close);
    sheet.querySelector("#saveTargets").addEventListener("click", function () {
      var cal = parseInt(sheet.querySelector("#targetCalories").value, 10) || 0;
      var pro = parseInt(sheet.querySelector("#targetProtein").value, 10) || 0;
      Store.updateNutritionTargets(cal, pro);
      close();
      render();
    });
  }

  /* ===================== MEAL BOARD ===================== */
  function renderMealBoard() {
    var data = Store.getData();
    var card = el('<div class="card"></div>');
    card.innerHTML =
      '<div class="card-title-row"><h3 style="font-size:0.95rem;font-weight:600;color:var(--color-text-muted);">' + t("dragHint") + "</h3></div>" +
      '<div class="meal-columns" id="mealColumns"></div>';

    var columnsEl = card.querySelector("#mealColumns");
    TIME_ORDER.forEach(function (tod) {
      var col = el('<div class="meal-column" data-tod="' + tod + '"></div>');
      col.innerHTML =
        '<div class="meal-column-head">' + t(tod + "Label") + "</div>" +
        '<div class="meal-column-drop" data-tod="' + tod + '"></div>' +
        '<button class="add-meal-tile" data-tod="' + tod + '">+ ' + t("addMealBtn") + "</button>";

      var meals = data.nutrition.meals.filter(function (m) { return m.timeOfDay === tod; }).sort(function (a, b) { return a.order - b.order; });
      var dropEl = col.querySelector(".meal-column-drop");
      if (!meals.length) {
        dropEl.innerHTML = '<div class="empty-state" style="padding:var(--space-3) 0;">' + t("noMealsYet") + "</div>";
      }
      meals.forEach(function (meal) { dropEl.appendChild(renderMealCard(meal)); });

      col.querySelector(".add-meal-tile").addEventListener("click", function () {
        var name = prompt(t("mealNamePlaceholder"));
        if (!name) return;
        Store.addMeal(name.trim(), tod);
        render();
      });
      columnsEl.appendChild(col);
    });

    initMealDrag(columnsEl);
    return card;
  }

  function renderMealCard(meal) {
    var totalCals = meal.items.reduce(function (s, i) { return s + (i.calories || 0); }, 0);
    var card = el('<div class="meal-card" data-meal-id="' + meal.id + '"></div>');
    card.innerHTML =
      '<div class="meal-head">' +
      '<span class="drag-handle" data-role="meal-drag-handle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="6" r="1.5" fill="currentColor"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="9" cy="18" r="1.5" fill="currentColor"/><circle cx="15" cy="6" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="18" r="1.5" fill="currentColor"/></svg></span>' +
      '<h4>' + escapeHtml(meal.name) + '</h4>' +
      '<button class="icon-btn" data-role="delete-meal" aria-label="' + t("deleteMealBtn") + '" style="width:28px;height:28px;">' +
      '<svg viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>' +
      '<div class="meal-cals">' + totalCals + " " + t("caloriesUnit") + "</div>" +
      '<div data-role="items"></div>' +
      '<button class="meal-add-food-btn" data-role="add-food">+ ' + t("addFoodBtn") + "</button>";

    var itemsEl = card.querySelector('[data-role="items"]');
    if (!meal.items.length) {
      itemsEl.innerHTML = '<div style="color:var(--color-text-muted);font-size:0.78rem;padding-top:6px;">' + t("emptyMealMsg") + "</div>";
    } else {
      meal.items.forEach(function (item) {
        var row = el(
          '<div class="food-item-row">' +
          '<div><div class="fi-name">' + escapeHtml(item.name) + '</div><div class="fi-amount">' + item.amount + " " + escapeHtml(item.unit || "g") + "</div></div>" +
          '<div class="fi-macro">' + item.calories + " " + t("caloriesUnit") + " · " + item.protein + "g</div>" +
          '<button data-role="remove-item" aria-label="' + t("removeItemBtn") + '"><svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>' +
          "</div>"
        );
        row.querySelector('[data-role="remove-item"]').addEventListener("click", function () {
          Store.removeFoodItemFromMeal(meal.id, item.id);
          render();
        });
        itemsEl.appendChild(row);
      });
    }

    card.querySelector('[data-role="delete-meal"]').addEventListener("click", function () {
      Store.deleteMeal(meal.id);
      render();
    });
    card.querySelector('[data-role="add-food"]').addEventListener("click", function () {
      openAddFoodModal(meal.id);
    });

    return card;
  }

  /* Pointer-based drag reorder for meal cards — works with mouse AND touch
     (unlike HTML5 dragstart/dragover, which most mobile browsers never fire),
     and supports moving a meal between time-of-day columns, not just within one. */
  var draggingMealCard = null;

  function initMealDrag(columnsEl) {
    columnsEl.addEventListener("pointerdown", function (e) {
      var handle = e.target.closest('[data-role="meal-drag-handle"]');
      if (!handle) return;
      var card = handle.closest(".meal-card");
      if (!card) return;
      e.preventDefault();
      draggingMealCard = card;
      card.classList.add("dragging");
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}
    });

    columnsEl.addEventListener("pointermove", function (e) {
      if (!draggingMealCard) return;
      var dropEl = findDropZoneAtPoint(columnsEl, e.clientX, e.clientY);
      if (!dropEl) return;
      columnsEl.querySelectorAll(".meal-column-drop").forEach(function (d) { d.classList.toggle("drag-over", d === dropEl); });
      var emptyMsg = dropEl.querySelector(".empty-state");
      if (emptyMsg) emptyMsg.remove();
      var after = getDragAfterElement(dropEl, e.clientY);
      if (after == null) dropEl.appendChild(draggingMealCard);
      else dropEl.insertBefore(draggingMealCard, after);
    });

    function endDrag() {
      if (!draggingMealCard) return;
      draggingMealCard.classList.remove("dragging");
      columnsEl.querySelectorAll(".meal-column-drop").forEach(function (dropEl) {
        dropEl.classList.remove("drag-over");
        var tod = dropEl.getAttribute("data-tod");
        Array.from(dropEl.querySelectorAll(".meal-card")).forEach(function (c, idx) {
          Store.moveMeal(c.getAttribute("data-meal-id"), tod, idx);
        });
      });
      draggingMealCard = null;
      render();
    }
    columnsEl.addEventListener("pointerup", endDrag);
    columnsEl.addEventListener("pointercancel", endDrag);
  }

  function findDropZoneAtPoint(columnsEl, x, y) {
    var zones = Array.from(columnsEl.querySelectorAll(".meal-column-drop"));
    return zones.find(function (z) {
      var box = z.getBoundingClientRect();
      return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
    }) || null;
  }

  function getDragAfterElement(container, y) {
    var els = Array.from(container.querySelectorAll(".meal-card:not(.dragging)"));
    return els.reduce(function (closest, child) {
      var box = child.getBoundingClientRect();
      var offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
  }

  /* ===================== ADD FOOD MODAL ===================== */
  function openAddFoodModal(mealId) {
    addFoodTargetMealId = mealId;
    var overlay = document.getElementById("addFoodOverlay");
    var sheet = overlay.querySelector(".modal-sheet");
    var foods = Store.getFoods();

    sheet.innerHTML =
      '<div class="modal-head"><h2>' + t("addFoodBtn") + '</h2>' +
      '<button class="modal-close" id="closeAddFood"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></div>' +
      (foods.length
        ? '<div class="form-row"><label>' + t("useExistingFoodLabel") + '</label>' +
          '<select id="existingFoodSelect"><option value="">' + t("createNewFoodOption") + "</option>" +
          foods.map(function (f) { return '<option value="' + f.id + '">' + escapeHtml(f.name) + " (" + f.baseCalories + " " + t("caloriesUnit") + "/" + f.baseAmount + f.baseUnit + ")</option>"; }).join("") +
          "</select></div>"
        : "") +
      '<div id="foodFormFields"></div>' +
      '<div class="modal-actions"><button class="btn btn-ghost" id="cancelAddFood">' + t("cancelBtn") + '</button>' +
      '<button class="btn btn-primary" id="saveAddFood">' + t("saveFoodBtn") + "</button></div>";

    var fieldsEl = sheet.querySelector("#foodFormFields");

    function renderNewFoodFields() {
      fieldsEl.innerHTML =
        '<div class="form-row"><label>' + t("foodNameLabel") + '</label><input type="text" id="foodName"></div>' +
        '<div class="form-grid">' +
        '<div class="form-row"><label>' + t("amountLabel") + '</label><input type="number" id="foodAmount" value="100"></div>' +
        '<div class="form-row"><label>' + t("amountUnitLabel") + '</label><input type="text" id="foodUnit" value="g"></div>' +
        '<div class="form-row"><label>' + t("caloriesLabel") + '</label><input type="number" id="foodCalories"></div>' +
        '<div class="form-row"><label>' + t("proteinLabel") + '</label><input type="number" id="foodProtein"></div>' +
        "</div>";
    }

    function renderExistingFoodFields(food) {
      fieldsEl.innerHTML =
        '<div class="form-row"><label>' + t("amountLabel") + " (" + escapeHtml(food.baseUnit) + ")</label>" +
        '<input type="number" id="existingAmount" value="' + food.baseAmount + '"></div>' +
        '<div style="color:var(--color-text-muted);font-size:0.85rem;" id="scaledPreview"></div>';
      var amountInput = fieldsEl.querySelector("#existingAmount");
      var preview = fieldsEl.querySelector("#scaledPreview");
      function updatePreview() {
        var amt = parseFloat(amountInput.value) || 0;
        var scaled = Store.scaleFood(food, amt);
        preview.textContent = scaled.calories + " " + t("caloriesUnit") + " · " + scaled.protein + "g " + t("proteinLabel");
      }
      amountInput.addEventListener("input", updatePreview);
      updatePreview();
    }

    renderNewFoodFields();

    var existingSelect = sheet.querySelector("#existingFoodSelect");
    if (existingSelect) {
      existingSelect.addEventListener("change", function () {
        if (!existingSelect.value) { renderNewFoodFields(); return; }
        var food = foods.find(function (f) { return f.id === existingSelect.value; });
        if (food) renderExistingFoodFields(food);
      });
    }

    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    function close() { overlay.hidden = true; document.body.style.overflow = ""; addFoodTargetMealId = null; }
    sheet.querySelector("#closeAddFood").addEventListener("click", close);
    sheet.querySelector("#cancelAddFood").addEventListener("click", close);
    sheet.querySelector("#saveAddFood").addEventListener("click", function () {
      var mealId = addFoodTargetMealId;
      if (existingSelect && existingSelect.value) {
        var food = foods.find(function (f) { return f.id === existingSelect.value; });
        var amt = parseFloat(fieldsEl.querySelector("#existingAmount").value) || food.baseAmount;
        var scaled = Store.scaleFood(food, amt);
        Store.addFoodItemToMeal(mealId, { foodId: food.id, name: food.name, amount: amt, unit: food.baseUnit, calories: scaled.calories, protein: scaled.protein });
      } else {
        var name = fieldsEl.querySelector("#foodName").value.trim();
        if (!name) return;
        var amount = parseFloat(fieldsEl.querySelector("#foodAmount").value) || 100;
        var unit = fieldsEl.querySelector("#foodUnit").value.trim() || "g";
        var calories = parseFloat(fieldsEl.querySelector("#foodCalories").value) || 0;
        var protein = parseFloat(fieldsEl.querySelector("#foodProtein").value) || 0;
        var newFood = Store.addOrReuseFood(name, amount, unit, calories, protein);
        Store.addFoodItemToMeal(mealId, { foodId: newFood.id, name: newFood.name, amount: amount, unit: unit, calories: calories, protein: protein });
      }
      close();
      showToast(t("saveFoodBtn"));
      render();
    });
  }

  window.KoachAuth.ready.then(function () {
    render();
    I18n.onChange(function () { render(); });
  });
})();
