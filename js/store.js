/* Koach data layer — single localStorage-backed store shared by all pages.
   No backend: everything lives in the browser under KEY. */
(function (global) {
  "use strict";

  var KEY = "koach:data:v1";

  function uid(prefix) {
    return (prefix || "id") + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  /* Format a Date using its LOCAL calendar date (not UTC) as YYYY-MM-DD.
     toISOString() converts to UTC first, which silently shifts the date
     for any timezone ahead of UTC (e.g. Israel) — that was the "Today"
     mismatch bug. Always use this helper for date-only values. */
  function toLocalISO(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function todayISO() {
    return toLocalISO(new Date());
  }

  function daysAgoISO(n) {
    var d = new Date();
    d.setDate(d.getDate() - n);
    return toLocalISO(d);
  }

  /* ---------------- Exercise library (seed) ---------------- */
  var EXERCISE_LIBRARY = [
    { id: "ex_bench", name: "Bench Press", muscleGroup: "chest" },
    { id: "ex_incline_db", name: "Incline Dumbbell Press", muscleGroup: "chest" },
    { id: "ex_fly", name: "Chest Fly", muscleGroup: "chest" },
    { id: "ex_dip", name: "Dip", muscleGroup: "chest" },
    { id: "ex_ohp", name: "Overhead Press", muscleGroup: "shoulders" },
    { id: "ex_lateral", name: "Lateral Raise", muscleGroup: "shoulders" },
    { id: "ex_row", name: "Barbell Row", muscleGroup: "back" },
    { id: "ex_pullup", name: "Pull-up", muscleGroup: "back" },
    { id: "ex_lat_pulldown", name: "Lat Pulldown", muscleGroup: "back" },
    { id: "ex_deadlift", name: "Deadlift", muscleGroup: "back" },
    { id: "ex_squat", name: "Squat", muscleGroup: "legs" },
    { id: "ex_leg_press", name: "Leg Press", muscleGroup: "legs" },
    { id: "ex_rdl", name: "Romanian Deadlift", muscleGroup: "legs" },
    { id: "ex_leg_curl", name: "Leg Curl", muscleGroup: "legs" },
    { id: "ex_calf_raise", name: "Calf Raise", muscleGroup: "legs" },
    { id: "ex_curl", name: "Bicep Curl", muscleGroup: "biceps" },
    { id: "ex_hammer_curl", name: "Hammer Curl", muscleGroup: "biceps" },
    { id: "ex_tricep", name: "Tricep Pushdown", muscleGroup: "triceps" },
    { id: "ex_skullcrusher", name: "Skull Crusher", muscleGroup: "triceps" },
    { id: "ex_plank", name: "Plank", muscleGroup: "core" },
    { id: "ex_situp", name: "Sit-up", muscleGroup: "core" }
  ];

  var MUSCLE_GROUPS = ["chest", "back", "shoulders", "legs", "biceps", "triceps", "core"];

  /* ---------------- Split templates ----------------
     Each returns an array of workout definitions: {name, muscleGroups, exercises:[{exerciseId,sets,repMin,repMax}]} */
  function defaultSets(exerciseId) {
    return { exerciseId: exerciseId, sets: 3, repMin: 8, repMax: 10 };
  }

  var SPLIT_TEMPLATES = {
    full_body: function () {
      return [
        {
          name: "Full Body",
          muscleGroups: ["chest", "back", "legs"],
          exercises: [
            defaultSets("ex_squat"),
            defaultSets("ex_bench"),
            defaultSets("ex_row"),
            defaultSets("ex_ohp"),
            defaultSets("ex_plank")
          ]
        }
      ];
    },
    ab: function () {
      return [
        {
          name: "Workout A",
          muscleGroups: ["chest", "shoulders", "triceps", "biceps"],
          exercises: [defaultSets("ex_bench"), defaultSets("ex_incline_db"), defaultSets("ex_ohp"), defaultSets("ex_tricep"), defaultSets("ex_curl")]
        },
        {
          name: "Workout B",
          muscleGroups: ["back", "legs"],
          exercises: [defaultSets("ex_squat"), defaultSets("ex_deadlift"), defaultSets("ex_row"), defaultSets("ex_pullup"), defaultSets("ex_calf_raise")]
        }
      ];
    },
    abc: function () {
      return [
        {
          name: "Workout A",
          muscleGroups: ["chest", "shoulders"],
          exercises: [defaultSets("ex_bench"), defaultSets("ex_incline_db"), defaultSets("ex_ohp"), defaultSets("ex_lateral")]
        },
        {
          name: "Workout B",
          muscleGroups: ["back", "biceps"],
          exercises: [defaultSets("ex_row"), defaultSets("ex_pullup"), defaultSets("ex_lat_pulldown"), defaultSets("ex_curl")]
        },
        {
          name: "Workout C",
          muscleGroups: ["legs", "core"],
          exercises: [defaultSets("ex_squat"), defaultSets("ex_rdl"), defaultSets("ex_leg_press"), defaultSets("ex_plank")]
        }
      ];
    },
    ppl: function () {
      return [
        {
          name: "Push",
          muscleGroups: ["chest", "shoulders", "triceps"],
          exercises: [defaultSets("ex_bench"), defaultSets("ex_ohp"), defaultSets("ex_incline_db"), defaultSets("ex_tricep")]
        },
        {
          name: "Pull",
          muscleGroups: ["back", "biceps"],
          exercises: [defaultSets("ex_deadlift"), defaultSets("ex_row"), defaultSets("ex_pullup"), defaultSets("ex_curl")]
        },
        {
          name: "Legs",
          muscleGroups: ["legs", "core"],
          exercises: [defaultSets("ex_squat"), defaultSets("ex_rdl"), defaultSets("ex_leg_press"), defaultSets("ex_calf_raise")]
        }
      ];
    }
  };

  /* Kept only so any old saved reference doesn't crash; the setup flow now
     computes a real suggestion from the user's own body data instead. */
  var NUTRITION_PRESETS = {
    cut: { calories: 1800, protein: 150 },
    maintenance: { calories: 2200, protein: 140 },
    bulk: { calories: 2700, protein: 165 }
  };

  var ACTIVITY_LEVELS = [
    { id: "sedentary", factor: 1.2 },
    { id: "light", factor: 1.375 },
    { id: "moderate", factor: 1.55 },
    { id: "active", factor: 1.725 },
    { id: "very_active", factor: 1.9 }
  ];
  var GOALS = ["cut", "maintenance", "bulk"];
  var GOAL_CALORIE_OFFSET = { cut: -500, maintenance: 0, bulk: 300 };

  /* Standard Mifflin-St Jeor estimate — an estimate, not a medical
     calculation. Requires every input; the caller (isProfileComplete +
     a weight entry) must guarantee that before calling this, since we
     never want to silently fall back to a guessed number. */
  function calculateSuggestedTargets(profile, weightKg) {
    var bmr = 10 * weightKg + 6.25 * profile.heightCm - 5 * profile.age + (profile.sex === "female" ? -161 : 5);
    var activity = ACTIVITY_LEVELS.find(function (a) { return a.id === profile.activityLevel; });
    var tdee = bmr * (activity ? activity.factor : 1.2);
    var calories = Math.round((tdee + (GOAL_CALORIE_OFFSET[profile.goal] || 0)) / 10) * 10;
    var protein = Math.round(weightKg * 1.8);
    return { calories: calories, protein: protein };
  }

  var DEFAULT_MEAL_TEMPLATE = [
    { name: "Breakfast", timeOfDay: "morning" },
    { name: "Lunch", timeOfDay: "midday" },
    { name: "Snack", timeOfDay: "afternoon" },
    { name: "Dinner", timeOfDay: "evening" }
  ];

  /* ---------------- Store ---------------- */
  function blankData() {
    return {
      meta: { setupComplete: false, nutritionSetupComplete: false },
      exercises: EXERCISE_LIBRARY.slice(),
      program: { splitType: null, workouts: [] },
      sessions: [],
      foods: [],
      nutrition: { targets: { calories: 2200, protein: 140 }, meals: [] },
      weightEntries: [],
      sleepEntries: [],
      /* Real body/profile info the user enters themselves — never pre-filled
         with guessed values. null means "not provided yet", which the UI
         must treat as "ask the user", not as zero/default. */
      profile: { heightCm: null, age: null, sex: null, activityLevel: null, goal: null }
    };
  }

  var cache = null;

  /* One-time, best-effort migrations for data saved by older versions of the app.
     These only reshape/relabel data that already exists — nothing here invents
     new values (weights, reps, targets, etc.). */
  function migrate(data) {
    /* "arms" muscle group was split into "biceps" / "triceps". */
    data.exercises.forEach(function (ex) {
      if (ex.muscleGroup === "arms") {
        ex.muscleGroup = /tricep/i.test(ex.name) ? "triceps" : "biceps";
      }
    });
    (data.program.workouts || []).forEach(function (w) {
      if (w.muscleGroups && w.muscleGroups.indexOf("arms") !== -1) {
        var expanded = [];
        w.muscleGroups.forEach(function (mg) {
          if (mg === "arms") {
            if (expanded.indexOf("biceps") === -1) expanded.push("biceps");
            if (expanded.indexOf("triceps") === -1) expanded.push("triceps");
          } else if (expanded.indexOf(mg) === -1) {
            expanded.push(mg);
          }
        });
        w.muscleGroups = expanded;
      }
    });

    /* Session entries used to record one weight for the whole exercise plus a
       bare reps array. Now every set has its own {weight, reps}. Reshape old
       entries using the weight actually recorded (never invent a new value). */
    (data.sessions || []).forEach(function (s) {
      (s.entries || []).forEach(function (entry) {
        if (!entry.sets && entry.reps) {
          entry.sets = entry.reps.map(function (r) { return { weight: entry.weight || 0, reps: r }; });
          delete entry.reps;
          delete entry.weight;
        }
        if (entry.notes === undefined) entry.notes = "";
      });
    });

    return data;
  }

  function fillAndMigrate(obj) {
    var blank = blankData();
    Object.keys(blank).forEach(function (k) {
      if (obj[k] === undefined) obj[k] = blank[k];
    });
    return migrate(obj);
  }

  function load() {
    if (cache) return cache;
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        cache = fillAndMigrate(JSON.parse(raw));
        return cache;
      }
    } catch (e) {}
    cache = blankData();
    return cache;
  }

  /* ---------------- Server sync (Supabase) ----------------
     The whole app's data is stored as one JSONB blob per signed-in user
     (table `app_data`, column `data`) — this keeps every function above
     synchronous and unchanged; only load/save touch the network. */
  var currentUserId = null;
  var pushTimer = null;

  function setUserId(userId) {
    currentUserId = userId;
  }

  var warnedNoRemoteThisSession = false;

  function warnSaveFailed() {
    /* Throttled so a run of failed saves (e.g. offline) doesn't spam toasts —
       once per session is enough to tell the user their data isn't syncing. */
    if (warnedNoRemoteThisSession) return;
    warnedNoRemoteThisSession = true;
    if (window.KoachToast && window.KoachI18n) {
      window.KoachToast(window.KoachI18n.t("saveFailedMsg"), "error");
    }
  }

  function pushRemote() {
    if (!currentUserId) return;
    if (!window.sb) {
      warnSaveFailed();
      return;
    }
    window.sb.from("app_data")
      .upsert({ id: currentUserId, data: cache, updated_at: new Date().toISOString() })
      .then(function (res) {
        if (res.error) {
          console.error("Koach: failed to save to the server", res.error);
          warnSaveFailed();
        } else {
          warnedNoRemoteThisSession = false;
        }
      })
      .catch(function (err) {
        console.error("Koach: failed to save to the server", err);
        warnSaveFailed();
      });
  }

  /* Loads this user's row from Supabase into the in-memory cache. Must
     resolve before any page calls getData()/render() for the first time.
     If the user has no row yet (first ever sign-in), starts them from a
     blank state and creates the row immediately. */
  function loadRemote(userId) {
    currentUserId = userId;
    if (!window.sb) {
      console.error("Koach: Supabase client not available, falling back to local-only data.");
      return Promise.resolve(load());
    }
    return window.sb.from("app_data").select("data").eq("id", userId).maybeSingle().then(function (res) {
      if (res.error) {
        console.error("Koach: failed to load from the server, falling back to local-only data.", res.error);
        cache = load();
        return cache;
      }
      cache = res.data && res.data.data ? fillAndMigrate(res.data.data) : blankData();
      try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {}
      if (!res.data) pushRemote();
      return cache;
    });
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(cache));
    } catch (e) {}
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushRemote, 500);
  }

  function getData() {
    return load();
  }

  /* ---------------- Program ---------------- */
  function applySplitTemplate(splitType) {
    var data = load();
    var builder = SPLIT_TEMPLATES[splitType] || SPLIT_TEMPLATES.full_body;
    var workouts = builder().map(function (w) {
      return {
        id: uid("workout"),
        name: w.name,
        muscleGroups: w.muscleGroups,
        exercises: w.exercises.map(function (e) {
          return { id: uid("pex"), exerciseId: e.exerciseId, sets: e.sets, repMin: e.repMin, repMax: e.repMax };
        })
      };
    });
    data.program = { splitType: splitType, workouts: workouts };
    data.meta.setupComplete = true;
    save();
    return data.program;
  }

  function updateProgram(program) {
    var data = load();
    data.program = program;
    save();
  }

  function getExerciseById(id) {
    var data = load();
    var found = null;
    data.exercises.some(function (e) {
      if (e.id === id) { found = e; return true; }
      return false;
    });
    return found;
  }

  function addCustomExercise(name, muscleGroup) {
    var data = load();
    var ex = { id: uid("ex"), name: name, muscleGroup: muscleGroup || "other", isCustom: true };
    data.exercises.push(ex);
    save();
    return ex;
  }

  /* Rename an exercise in place — same id, so every session, program entry
     and progress chart that references it by id keeps working untouched. */
  function renameExercise(exerciseId, newName) {
    var ex = getExerciseById(exerciseId);
    if (!ex || !newName || !newName.trim()) return null;
    ex.name = newName.trim();
    save();
    return ex;
  }

  /* Exercises tagged with `muscleGroup` that the user already has some
     relationship with — either logged history, or currently placed in any
     workout in the program. Used to auto-suggest exercises when a muscle
     group is added to a workout, so we only ever surface exercises the user
     is already using, never the whole library. */
  function getExercisesUsedForMuscleGroup(muscleGroup) {
    var data = load();
    var usedIds = {};
    data.sessions.forEach(function (s) {
      s.entries.forEach(function (e) { usedIds[e.exerciseId] = true; });
    });
    data.program.workouts.forEach(function (w) {
      w.exercises.forEach(function (pex) { usedIds[pex.exerciseId] = true; });
    });
    return data.exercises.filter(function (ex) {
      return ex.muscleGroup === muscleGroup && usedIds[ex.id];
    });
  }

  /* ---------------- Sessions (Workout Log) ---------------- */
  function addSession(session) {
    var data = load();
    session.id = session.id || uid("session");
    session.date = session.date || todayISO();
    data.sessions.push(session);
    /* keep newest last is fine; sort ascending by date for consistency */
    data.sessions.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    save();
    return session;
  }

  function getSessions() {
    return load().sessions;
  }

  function getLastSessionForWorkout(workoutId) {
    var sessions = load().sessions.filter(function (s) { return s.workoutId === workoutId; });
    return sessions.length ? sessions[sessions.length - 1] : null;
  }

  function getLastPerformanceForExercise(exerciseId, beforeDate) {
    var sessions = load().sessions.slice().reverse();
    for (var i = 0; i < sessions.length; i++) {
      if (beforeDate && sessions[i].date >= beforeDate) continue;
      var entry = sessions[i].entries.find(function (e) { return e.exerciseId === exerciseId; });
      if (entry) return { date: sessions[i].date, entry: entry };
    }
    return null;
  }

  /* Determine the next workout in the program's rotation. */
  function getNextWorkout() {
    var data = load();
    var workouts = data.program.workouts;
    if (!workouts.length) return null;
    var sessions = data.sessions;
    if (!sessions.length) return workouts[0];
    var last = sessions[sessions.length - 1];
    var idx = workouts.findIndex(function (w) { return w.id === last.workoutId; });
    if (idx === -1) return workouts[0];
    return workouts[(idx + 1) % workouts.length];
  }

  /* Rolling last 7 days (including today), each day -> { dateISO, weekday, workoutShortName|null, isToday, completed } */
  function getRolling7Days() {
    var data = load();
    var out = [];
    for (var i = 6; i >= 0; i--) {
      var dateISO = daysAgoISO(i);
      var d = new Date(dateISO + "T00:00:00");
      var session = data.sessions.find(function (s) { return s.date === dateISO; });
      out.push({
        date: dateISO,
        weekdayIndex: d.getDay(),
        isToday: i === 0,
        workoutName: session ? session.workoutName : null,
        completed: !!session
      });
    }
    return out;
  }

  /* ---------------- Weight entries ---------------- */
  function addWeightEntry(weightKg, dateISO) {
    var data = load();
    var entry = { id: uid("weight"), date: dateISO || todayISO(), weightKg: weightKg };
    /* replace existing entry for the same date if present */
    var existingIdx = data.weightEntries.findIndex(function (w) { return w.date === entry.date; });
    if (existingIdx !== -1) data.weightEntries[existingIdx] = entry;
    else data.weightEntries.push(entry);
    data.weightEntries.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    save();
    return entry;
  }

  function getWeightEntries() {
    return load().weightEntries;
  }

  /* ---------------- Sleep entries ---------------- */
  function addSleepEntry(hours, dateISO) {
    var data = load();
    var entry = { id: uid("sleep"), date: dateISO || todayISO(), hours: hours };
    var existingIdx = data.sleepEntries.findIndex(function (s) { return s.date === entry.date; });
    if (existingIdx !== -1) data.sleepEntries[existingIdx] = entry;
    else data.sleepEntries.push(entry);
    data.sleepEntries.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    save();
    return entry;
  }

  function getSleepEntries() {
    return load().sleepEntries;
  }

  function getSleepEntryForDate(dateISO) {
    return load().sleepEntries.find(function (s) { return s.date === dateISO; }) || null;
  }

  /* Average of whatever real entries exist within the last 7 calendar days
     (today included). Returns null if there is no data at all — never
     invents a number for missing days. */
  function getAverageSleepLast7Days() {
    var data = load();
    var cutoff = daysAgoISO(6);
    var todayIso = todayISO();
    var relevant = data.sleepEntries.filter(function (s) { return s.date >= cutoff && s.date <= todayIso; });
    if (!relevant.length) return null;
    var sum = relevant.reduce(function (acc, s) { return acc + s.hours; }, 0);
    return Math.round((sum / relevant.length) * 10) / 10;
  }

  /* Weekly workout counts for the last N weeks, oldest first: [{weekLabel, count}] */
  function getWeeklyWorkoutCounts(weeks) {
    weeks = weeks || 8;
    var data = load();
    var out = [];
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    for (var w = weeks - 1; w >= 0; w--) {
      var end = new Date(now);
      end.setDate(end.getDate() - w * 7);
      var start = new Date(end);
      start.setDate(start.getDate() - 6);
      var startISO = toLocalISO(start);
      var endISO = toLocalISO(end);
      var count = data.sessions.filter(function (s) { return s.date >= startISO && s.date <= endISO; }).length;
      out.push({ startISO: startISO, endISO: endISO, count: count });
    }
    return out;
  }

  /* Exercise progress: top working weight (+ its reps) per session for a given exercise.
     "Top set" = the heaviest weight logged that session, since sets can vary in weight. */
  function getExerciseProgress(exerciseId) {
    var data = load();
    var out = [];
    data.sessions.forEach(function (s) {
      var entry = s.entries.find(function (e) { return e.exerciseId === exerciseId; });
      if (entry && entry.sets && entry.sets.length) {
        var topSet = entry.sets.reduce(function (best, set) {
          return !best || set.weight > best.weight ? set : best;
        }, null);
        if (topSet && topSet.weight) {
          out.push({ date: s.date, weight: topSet.weight, reps: [topSet.reps], allSets: entry.sets.slice() });
        }
      }
    });
    return out;
  }

  /* List of exercise ids that have at least one logged session, most recently used first */
  function getExercisesWithHistory() {
    var data = load();
    var seen = {};
    var order = [];
    data.sessions.slice().reverse().forEach(function (s) {
      s.entries.forEach(function (e) {
        if (!seen[e.exerciseId]) {
          seen[e.exerciseId] = true;
          order.push(e.exerciseId);
        }
      });
    });
    return order;
  }

  /* ---------------- Foods & Nutrition Plan ---------------- */
  /* ---------------- Profile (real body info, never guessed) ---------------- */
  function getProfile() {
    return load().profile;
  }

  function updateProfile(fields) {
    var data = load();
    data.profile = Object.assign({}, data.profile, fields);
    save();
    return data.profile;
  }

  /* True only once every field needed for a personalized calculation exists.
     Weight is intentionally NOT part of the profile — it lives in
     weightEntries (the Progress log) so there is a single source of truth;
     "has weight" means "has at least one weight entry". */
  function isProfileComplete() {
    var p = load().profile;
    return !!(p.heightCm && p.age && p.sex && p.activityLevel && p.goal && getWeightEntries().length);
  }

  function getFoods() {
    return load().foods;
  }

  function addOrReuseFood(name, baseAmount, baseUnit, baseCalories, baseProtein) {
    var data = load();
    var existing = data.foods.find(function (f) { return f.name.toLowerCase() === name.toLowerCase(); });
    if (existing) return existing;
    var food = {
      id: uid("food"),
      name: name,
      baseAmount: baseAmount,
      baseUnit: baseUnit,
      baseCalories: baseCalories,
      baseProtein: baseProtein
    };
    data.foods.push(food);
    save();
    return food;
  }

  function scaleFood(food, amount) {
    var ratio = food.baseAmount ? amount / food.baseAmount : 1;
    return {
      calories: Math.round(food.baseCalories * ratio),
      protein: Math.round(food.baseProtein * ratio * 10) / 10
    };
  }

  function ensureMealsSeeded() {
    var data = load();
    if (data.nutrition.meals.length) return;
    data.nutrition.meals = DEFAULT_MEAL_TEMPLATE.map(function (m, i) {
      return { id: uid("meal"), name: m.name, timeOfDay: m.timeOfDay, time: null, order: i, items: [] };
    });
    save();
  }

  function applyNutritionPreset(preset) {
    var data = load();
    var p = NUTRITION_PRESETS[preset];
    if (!p) return;
    data.nutrition.targets = { calories: p.calories, protein: p.protein };
    data.meta.nutritionSetupComplete = true;
    ensureMealsSeeded();
    save();
  }

  function updateNutritionTargets(calories, protein) {
    var data = load();
    data.nutrition.targets = { calories: calories, protein: protein };
    save();
  }

  function addMeal(name, timeOfDay) {
    var data = load();
    var order = data.nutrition.meals.filter(function (m) { return m.timeOfDay === timeOfDay; }).length;
    var meal = { id: uid("meal"), name: name, timeOfDay: timeOfDay, time: null, order: order, items: [] };
    data.nutrition.meals.push(meal);
    save();
    return meal;
  }

  function deleteMeal(mealId) {
    var data = load();
    data.nutrition.meals = data.nutrition.meals.filter(function (m) { return m.id !== mealId; });
    save();
  }

  function moveMeal(mealId, newTimeOfDay, newOrder) {
    var data = load();
    var meal = data.nutrition.meals.find(function (m) { return m.id === mealId; });
    if (!meal) return;
    meal.timeOfDay = newTimeOfDay;
    meal.order = newOrder;
    save();
  }

  function addFoodItemToMeal(mealId, item) {
    var data = load();
    var meal = data.nutrition.meals.find(function (m) { return m.id === mealId; });
    if (!meal) return;
    item.id = uid("item");
    meal.items.push(item);
    save();
    return item;
  }

  function removeFoodItemFromMeal(mealId, itemId) {
    var data = load();
    var meal = data.nutrition.meals.find(function (m) { return m.id === mealId; });
    if (!meal) return;
    meal.items = meal.items.filter(function (i) { return i.id !== itemId; });
    save();
  }

  function computeDailyTotals() {
    var data = load();
    var totals = { calories: 0, protein: 0 };
    data.nutrition.meals.forEach(function (m) {
      m.items.forEach(function (i) {
        totals.calories += i.calories || 0;
        totals.protein += i.protein || 0;
      });
    });
    totals.calories = Math.round(totals.calories);
    totals.protein = Math.round(totals.protein * 10) / 10;
    return totals;
  }

  global.KoachStore = {
    uid: uid,
    todayISO: todayISO,
    EXERCISE_LIBRARY: EXERCISE_LIBRARY,
    MUSCLE_GROUPS: MUSCLE_GROUPS,
    SPLIT_TEMPLATES: SPLIT_TEMPLATES,
    NUTRITION_PRESETS: NUTRITION_PRESETS,
    ACTIVITY_LEVELS: ACTIVITY_LEVELS,
    GOALS: GOALS,
    calculateSuggestedTargets: calculateSuggestedTargets,
    getData: getData,
    setUserId: setUserId,
    loadRemote: loadRemote,
    applySplitTemplate: applySplitTemplate,
    updateProgram: updateProgram,
    getExerciseById: getExerciseById,
    addCustomExercise: addCustomExercise,
    renameExercise: renameExercise,
    getExercisesUsedForMuscleGroup: getExercisesUsedForMuscleGroup,
    addSession: addSession,
    getSessions: getSessions,
    getLastSessionForWorkout: getLastSessionForWorkout,
    getLastPerformanceForExercise: getLastPerformanceForExercise,
    getNextWorkout: getNextWorkout,
    getRolling7Days: getRolling7Days,
    addWeightEntry: addWeightEntry,
    getWeightEntries: getWeightEntries,
    addSleepEntry: addSleepEntry,
    getSleepEntries: getSleepEntries,
    getSleepEntryForDate: getSleepEntryForDate,
    getAverageSleepLast7Days: getAverageSleepLast7Days,
    getWeeklyWorkoutCounts: getWeeklyWorkoutCounts,
    getExerciseProgress: getExerciseProgress,
    getExercisesWithHistory: getExercisesWithHistory,
    getProfile: getProfile,
    updateProfile: updateProfile,
    isProfileComplete: isProfileComplete,
    getFoods: getFoods,
    addOrReuseFood: addOrReuseFood,
    scaleFood: scaleFood,
    ensureMealsSeeded: ensureMealsSeeded,
    applyNutritionPreset: applyNutritionPreset,
    updateNutritionTargets: updateNutritionTargets,
    addMeal: addMeal,
    deleteMeal: deleteMeal,
    moveMeal: moveMeal,
    addFoodItemToMeal: addFoodItemToMeal,
    removeFoodItemFromMeal: removeFoodItemFromMeal,
    computeDailyTotals: computeDailyTotals,
    save: save
  };
})(window);
