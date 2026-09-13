(function () {
  "use strict";
  var Store = window.KoachStore;
  var I18n = window.KoachI18n;
  function t(k) { return I18n.t(k); }

  var selectedExerciseId = null;

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

  /* ===================== SVG chart helpers ===================== */
  var CHART_W = 640, CHART_H = 200, PAD = 28;

  function lineChart(points, opts) {
    opts = opts || {};
    if (!points.length) return null;
    var minV = Math.min.apply(null, points.map(function (p) { return p.value; }));
    var maxV = Math.max.apply(null, points.map(function (p) { return p.value; }));
    if (minV === maxV) { minV -= 1; maxV += 1; }
    var range = maxV - minV;
    var innerW = CHART_W - PAD * 2;
    var innerH = CHART_H - PAD * 2;
    var stepX = points.length > 1 ? innerW / (points.length - 1) : 0;

    var coords = points.map(function (p, i) {
      var x = PAD + stepX * i;
      var y = PAD + innerH - ((p.value - minV) / range) * innerH;
      return { x: x, y: y, value: p.value, label: p.label };
    });

    var pathD = coords.map(function (c, i) { return (i === 0 ? "M" : "L") + c.x.toFixed(1) + " " + c.y.toFixed(1); }).join(" ");
    var areaD = pathD + " L" + coords[coords.length - 1].x.toFixed(1) + " " + (PAD + innerH) + " L" + coords[0].x.toFixed(1) + " " + (PAD + innerH) + " Z";

    var svg =
      '<svg class="chart-svg" width="' + CHART_W + '" height="' + CHART_H + '" viewBox="0 0 ' + CHART_W + " " + CHART_H + '" preserveAspectRatio="none" role="img" aria-label="' + (opts.ariaLabel || "") + '">' +
      '<defs><linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.35"/><stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0"/></linearGradient></defs>' +
      '<path d="' + areaD + '" fill="url(#lg1)" stroke="none"></path>' +
      '<path d="' + pathD + '" fill="none" stroke="var(--color-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>' +
      coords.map(function (c) {
        return '<circle cx="' + c.x.toFixed(1) + '" cy="' + c.y.toFixed(1) + '" r="4" fill="var(--color-accent)" stroke="var(--color-bg)" stroke-width="2"><title>' + c.value + (c.label ? " — " + escapeHtml(c.label) : "") + "</title></circle>";
      }).join("") +
      "</svg>";
    return svg;
  }

  function barChart(bars, opts) {
    opts = opts || {};
    if (!bars.length) return null;
    var maxV = Math.max.apply(null, bars.map(function (b) { return b.value; }).concat([1]));
    var innerW = CHART_W - PAD * 2;
    var innerH = CHART_H - PAD * 2;
    var gap = 8;
    var barW = (innerW - gap * (bars.length - 1)) / bars.length;

    var rects = bars.map(function (b, i) {
      var h = maxV ? (b.value / maxV) * innerH : 0;
      var x = PAD + i * (barW + gap);
      var y = PAD + innerH - h;
      return '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="4" fill="' + (b.highlight ? "var(--color-accent)" : "var(--color-primary)") + '"><title>' + b.value + (b.label ? " — " + escapeHtml(b.label) : "") + "</title></rect>" +
        '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (CHART_H - 8) + '" font-size="9" fill="var(--color-text-muted)" text-anchor="middle">' + escapeHtml(b.label || "") + "</text>";
    });

    return '<svg class="chart-svg" width="' + CHART_W + '" height="' + CHART_H + '" viewBox="0 0 ' + CHART_W + " " + CHART_H + '" role="img" aria-label="' + (opts.ariaLabel || "") + '">' + rects.join("") + "</svg>";
  }

  /* ===================== ROOT RENDER ===================== */
  function render() {
    var root = document.getElementById("progressRoot");
    root.innerHTML = "";
    root.appendChild(renderWeightCard());
    root.appendChild(renderConsistencyCard());
    root.appendChild(renderExerciseCard());
  }

  /* ===================== BODY WEIGHT ===================== */
  function renderWeightCard() {
    var entries = Store.getWeightEntries();
    var card = el('<div class="card"></div>');
    card.innerHTML =
      '<div class="card-title-row"><h2>' + t("bodyWeightTitle") + '</h2>' +
      '<button class="btn btn-primary btn-sm" id="addWeightBtn">' + t("addWeightBtn") + "</button></div>" +
      '<div class="chart-wrap" id="weightChartWrap"></div>';

    var chartWrap = card.querySelector("#weightChartWrap");
    if (!entries.length) {
      chartWrap.innerHTML = '<div class="chart-empty">' + t("noWeightData") + "</div>";
    } else {
      var points = entries.map(function (e) { return { value: e.weightKg, label: e.date }; });
      chartWrap.innerHTML = lineChart(points, { ariaLabel: t("bodyWeightTitle") });
      var latest = entries[entries.length - 1];
      var first = entries[0];
      var change = Math.round((latest.weightKg - first.weightKg) * 10) / 10;
      var legend = el('<div class="chart-legend-row"></div>');
      legend.innerHTML =
        '<div><span class="big">' + latest.weightKg + "kg</span> <span class=\"sub\">" + t("latestLabel") + "</span></div>" +
        '<div class="sub">' + t("changeLabel") + ": " + (change > 0 ? "+" : "") + change + "kg</div>";
      chartWrap.appendChild(legend);
    }

    card.querySelector("#addWeightBtn").addEventListener("click", openWeightModal);
    return card;
  }

  function openWeightModal() {
    var overlay = document.getElementById("weightOverlay");
    var sheet = overlay.querySelector(".modal-sheet");
    var today = Store.todayISO();
    sheet.innerHTML =
      '<div class="modal-head"><h2>' + t("addWeightBtn") + '</h2>' +
      '<button class="modal-close" id="closeWeight"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></div>' +
      '<div class="form-row"><label>' + t("weightKgLabel") + '</label><input type="number" step="0.1" min="0" id="weightInput" autofocus></div>' +
      '<div class="form-row"><label>Date</label><input type="date" id="weightDateInput" value="' + today + '" max="' + today + '"></div>' +
      '<div class="modal-actions"><button class="btn btn-ghost" id="cancelWeight">' + t("cancelBtn") + '</button>' +
      '<button class="btn btn-primary" id="saveWeight">' + t("logWeightBtn") + "</button></div>";

    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    function close() { overlay.hidden = true; document.body.style.overflow = ""; }
    sheet.querySelector("#closeWeight").addEventListener("click", close);
    sheet.querySelector("#cancelWeight").addEventListener("click", close);
    sheet.querySelector("#saveWeight").addEventListener("click", function () {
      var val = parseFloat(sheet.querySelector("#weightInput").value);
      if (isNaN(val) || val <= 0) return;
      var date = sheet.querySelector("#weightDateInput").value || today;
      Store.addWeightEntry(val, date);
      close();
      showToast(t("logWeightBtn"));
      render();
    });
  }

  /* ===================== CONSISTENCY ===================== */
  function renderConsistencyCard() {
    var weeks = Store.getWeeklyWorkoutCounts(8);
    var card = el('<div class="card"></div>');
    card.innerHTML = '<div class="card-title-row"><h2>' + t("consistencyTitle") + '</h2></div><div class="chart-wrap" id="consistencyWrap"></div>';
    var wrap = card.querySelector("#consistencyWrap");
    var hasAny = weeks.some(function (w) { return w.count > 0; });
    if (!hasAny) {
      wrap.innerHTML = '<div class="chart-empty">' + t("noConsistencyData") + "</div>";
    } else {
      var bars = weeks.map(function (w, i) {
        var d = new Date(w.startISO + "T00:00:00");
        var label = (d.getMonth() + 1) + "/" + d.getDate();
        return { value: w.count, label: label, highlight: i === weeks.length - 1 };
      });
      wrap.innerHTML = barChart(bars, { ariaLabel: t("consistencyTitle") });
      var avg = Math.round((weeks.reduce(function (s, w) { return s + w.count; }, 0) / weeks.length) * 10) / 10;
      var legend = el('<div class="chart-legend-row"></div>');
      legend.innerHTML = '<div><span class="big">' + avg + "</span> <span class=\"sub\">" + t("workoutsPerWeekLabel") + " (" + t("latestLabel").toLowerCase() + " 8)</span></div>";
      wrap.appendChild(legend);
    }
    return card;
  }

  /* ===================== EXERCISE PROGRESS ===================== */
  function renderExerciseCard() {
    var data = Store.getData();
    var historyIds = Store.getExercisesWithHistory();
    var card = el('<div class="card"></div>');
    card.innerHTML = '<div class="card-title-row"><h2>' + t("exerciseProgressTitle") + "</h2></div>";

    if (!historyIds.length) {
      card.innerHTML += '<div class="chart-empty">' + t("noExerciseHistory") + "</div>";
      return card;
    }

    var currentExerciseIds = {};
    data.program.workouts.forEach(function (w) {
      w.exercises.forEach(function (pex) { currentExerciseIds[pex.exerciseId] = true; });
    });

    var active = historyIds.filter(function (id) { return currentExerciseIds[id]; });
    var historical = historyIds.filter(function (id) { return !currentExerciseIds[id]; });

    if (!selectedExerciseId || historyIds.indexOf(selectedExerciseId) === -1) {
      selectedExerciseId = active[0] || historical[0];
    }

    var pickerRow = el('<div class="pill-select exercise-select-row" id="exercisePicker"></div>');
    function makeChip(id, muted) {
      var ex = Store.getExerciseById(id) || { name: id };
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = ex.name;
      btn.className = (id === selectedExerciseId ? "active" : "") + (muted ? " historical-chip" : "");
      if (muted) btn.style.opacity = "0.55";
      btn.addEventListener("click", function () {
        selectedExerciseId = id;
        var newCard = renderExerciseCard();
        card.replaceWith(newCard);
      });
      return btn;
    }
    active.forEach(function (id) { pickerRow.appendChild(makeChip(id, false)); });
    historical.forEach(function (id) { pickerRow.appendChild(makeChip(id, true)); });
    card.appendChild(pickerRow);

    var chartWrap = el('<div class="chart-wrap"></div>');
    var progressData = Store.getExerciseProgress(selectedExerciseId);
    if (!progressData.length) {
      chartWrap.innerHTML = '<div class="chart-empty">' + t("noExerciseHistory") + "</div>";
    } else {
      var points = progressData.map(function (p) { return { value: p.weight, label: p.date + " · " + p.reps.join("/") }; });
      chartWrap.innerHTML = lineChart(points, { ariaLabel: t("weightTrendLabel") });
      var latest = progressData[progressData.length - 1];
      var first = progressData[0];
      var change = Math.round((latest.weight - first.weight) * 10) / 10;
      var legend = el('<div class="chart-legend-row"></div>');
      legend.innerHTML =
        '<div><span class="big">' + latest.weight + 'kg</span> <span class="sub">' + t("latestLabel") + " · " + latest.reps.join("/") + " " + t("repsShort") + "</span></div>" +
        '<div class="sub">' + t("startLabel") + ": " + first.weight + "kg → " + t("changeLabel") + ": " + (change > 0 ? "+" : "") + change + "kg</div>";
      chartWrap.appendChild(legend);
    }
    card.appendChild(chartWrap);

    return card;
  }

  window.KoachAuth.ready.then(function () {
    render();
    I18n.onChange(function () { render(); });
  });
})();
