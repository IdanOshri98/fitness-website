(function () {
  "use strict";

  var translations = {
    en: {
      brandSub: "Strength, tracked.",
      navDashboard: "Dashboard", navWorkouts: "Workouts", navNutrition: "Nutrition",
      navProgress: "Progress & Weight", navCommunity: "Community", navCta: "Try the demo",
      heroEyebrow: "Built for Israel's fitness scene",
      heroTitle: 'Train smarter. Eat better. <span class="accent">Get stronger.</span>',
      heroLead: "Koach brings your workouts, Israeli-food nutrition log, weight trends and a supportive community into one clear dashboard — in Hebrew, English, Spanish or Arabic.",
      heroCtaPrimary: "Explore the dashboard", heroCtaSecondary: "See nutrition tools",
      statUsers: "Active members", statFoods: "Israeli foods logged", statLangs: "Languages supported",
      dashHello: "Hello,",
      cardWorkouts: "Workouts", cardWorkoutsSub: "Total this week",
      cardSteps: "Steps", cardGoal: "Goal", cardWater: "Water", cardWaterSub: "Goal 2.5L",
      cardGoals: "Daily goals", goalSleep: "Sleep 7+ hours", goalWater: "Drink 2.5L water",
      goalWorkout: "Complete workout", goalSteps: "10,000 steps",
      tagOverview: "Overview", dashboardTitle: "One dashboard, every metric",
      dashboardLead: "Switch between the tools you use most — workouts, nutrition, progress and community — without leaving the page.",
      tabWeight: "Weight Tracking",
      workoutsTitle: "Plan and log every session",
      workoutsLead: "Build routines, track sets and reps, and let Koach adapt your plan as you get stronger.",
      wf1h: "Custom routines", wf1p: "Strength, HIIT, or mobility — build a weekly plan around your goals.",
      wf2h: "Set & rep tracking", wf2p: "Log every set with automatic rest timers and personal-record alerts.",
      wf3h: "Trainer & class sync", wf3p: "Connect sessions booked with your gym or personal trainer automatically.",
      wTodayTitle: "Today · Tue, 21 Oct", wUpper: "Upper Body & Cardio",
      wRow1: "Bench Press", wRow1sub: "4 sets × 8 reps · 60kg",
      wRow2: "Pull-ups", wRow2sub: "3 sets × 10 reps",
      wRow3: "Treadmill Cardio", wRow3sub: "20 min · Zone 3",
      wDone: "Done", wUpNext: "Up next",
      nutritionTitle: "Built for the Israeli plate",
      nutritionLead: "A local food database with kosher labels, home-style dishes and restaurant staples — so logging your meals actually matches what you eat.",
      nf1h: "Israeli food database", nf1p: "Shakshuka, sabich, hummus and more, pre-loaded with accurate macros.",
      nf2h: "Kosher & dietary tags", nf2p: "Filter by kosher, dairy, parve or meat, plus vegan and gluten-free.",
      nf3h: "Macro & calorie targets", nf3p: "Personalized daily targets that adjust to your training load.",
      nTodayTitle: "Today's log",
      food1: "Shakshuka", food2: "Sabich Pita", food3: "Hummus & Salad Bowl", food4: "Cottage Cheese 5%",
      tagDairy: "Dairy", tagParve: "Parve", tagVegan: "Vegan",
      weightTitle: "Watch your trend, not the noise",
      weightLead: "Log your weight daily and Koach smooths out the day-to-day fluctuation so you can see real progress.",
      wt1h: "Trend smoothing", wt1p: "A rolling average removes water-weight noise so trends stay honest.",
      wt2h: "Body measurements", wt2p: "Track waist, chest and more alongside your weight for the full picture.",
      wt3h: "Goal projection", wt3p: "See an estimated date to reach your target weight based on your pace.",
      wtChartTitle: "Last 7 weeks", wtDown: "-3.2 kg",
      wtCurrent: "Current", wtGoal: "Goal", wtEta: "Est. to goal",
      communityTitle: "You're not training alone",
      communityLead: "Share progress, join local challenges, and cheer on gym-goers across Israel.",
      communityDemoNotice: "Illustrative example — not real member activity",
      cUser1: "Dana K.", cLoc1: "Tel Aviv · 5K Challenge",
      cPost1: '"Hit a new deadlift PR this morning thanks to the progressive plan Koach built for me — 100kg!"',
      cUser2: "Roi B.", cLoc2: "Haifa · Strength Group",
      cPost2: '"Down 8kg since January by finally logging my Israeli meals accurately. This app gets the food right."',
      cUser3: "Michal S.", cLoc3: "Jerusalem · Yoga & Mobility",
      cPost3: '"Joined the 30-day mobility challenge with three friends from my gym — best decision this year."',
      statW: "Workouts logged this month", statF: "Israeli foods in database",
      statAvgLoss: "Avg. member trend / 8wk", onTrack: "On track",
      statCommunity: "Community members", thisWeek: "this week",
      ctaTitle: "Start tracking in your language",
      ctaLead: "Koach is free to try — switch between English, Hebrew, Spanish and Arabic anytime from the top bar.",
      ctaButton: "Get started free",
      footerRights: "© 2026 Koach. Made for Israel's fitness community.",

      /* ---- App: shared ---- */
      appHome: "Home", weekdayMon: "Mon", weekdayTue: "Tue", weekdayWed: "Wed", weekdayThu: "Thu",
      weekdayFri: "Fri", weekdaySat: "Sat", weekdaySun: "Sun", todayLabel: "Today",
      cancelBtn: "Cancel", saveBtn: "Save", deleteBtn: "Delete", editBtn: "Edit", addBtn: "Add",
      saveFailedMsg: "Couldn't save to the server — check your connection. Your changes are kept on this device.",
      loadingMsg: "Loading your data…", connectionErrorTitle: "Connection problem",
      connectionErrorMsg: "We couldn't reach the server. Check your internet connection and try again.", retryBtn: "Retry",
      muscle_chest: "Chest", muscle_back: "Back", muscle_shoulders: "Shoulders", muscle_legs: "Legs",
      muscle_biceps: "Biceps", muscle_triceps: "Triceps", muscle_core: "Core", muscle_other: "Other",

      /* ---- Workout page ---- */
      workoutPageTitle: "Workout",
      setupTitle: "Choose your starting split", setupSubtitle: "Pick a common structure — you can fully customize it after.",
      splitFullBody: "Full Body", splitFullBodyDesc: "One well-rounded workout, great for 2-3x/week.",
      splitAB: "A / B", splitABDesc: "Two alternating workouts for 4x/week.",
      splitABC: "A / B / C", splitABCDesc: "Three rotating workouts for 3-6x/week.",
      splitPPL: "Push / Pull / Legs", splitPPLDesc: "Classic 3-way split by movement pattern.",
      continueBtn: "Continue", changeSplitBtn: "Start over with a new split",
      missedDayHint: "Missed logging a day? Tap it to add a workout.",
      chooseDifferentWorkoutLink: "Choose a different workout",
      chooseWorkoutTitle: "Choose a workout", pickWorkoutSubtitle: "Which workout did you do that day?",
      logPastWorkoutTitle: "Log a workout — {date}", recommendedBadge: "Recommended",
      last7DaysTitle: "Last 7 days", restLabel: "Rest", noneLabel: "—",
      nextWorkoutLabel: "Next workout", startWorkoutBtn: "Start Workout", editProgramBtn: "Edit Program",
      noProgramYet: "Set up your program to get started.",
      activeWorkoutTitle: "Workout in progress", targetLabel: "Target", lastWorkoutLabel: "Last workout",
      noPreviousData: "No previous data yet", weightUsedLabel: "Weight (kg)", setLabelShort: "Set",
      repsHeaderLabel: "Reps", notesPlaceholder: "Add a short note (optional)",
      renameExerciseHint: "Click to rename", exerciseRenamedMsg: "Exercise renamed",
      finishWorkoutBtn: "Finish Workout", discardBtn: "Discard",
      editProgramTitle: "Edit Program", workoutNameLabel: "Workout name", muscleGroupsLabel: "Muscle groups",
      exercisesLabel: "Exercises", addExerciseBtn: "Add exercise", removeExerciseBtn: "Remove",
      setsLabel: "Sets", repRangeLabel: "Rep range", repMinLabel: "Min reps", repMaxLabel: "Max reps",
      saveProgramBtn: "Save Program", addWorkoutBtn: "Add workout", removeWorkoutBtn: "Remove workout",
      chooseFromLibrary: "Choose exercise", customExerciseOption: "+ Create custom exercise",
      customExerciseNamePlaceholder: "Exercise name", addCustomExerciseBtn: "Add custom exercise",
      historicalExerciseNote: "No longer in your program", workoutSavedMsg: "Workout saved!",
      repsShort: "reps", setsShort: "sets", perSet: "reps per set",
      confirmDeleteWorkout: "Remove this workout from your program?",

      /* ---- Nutrition page ---- */
      nutritionPageTitle: "Nutrition",
      nutritionSetupTitle: "Tell us about you", nutritionSetupSubtitle: "We need a few real details to suggest accurate targets — nothing is guessed.",
      heightLabel: "Height (cm)", ageLabel: "Age", sexLabel: "Sex", sex_male: "Male", sex_female: "Female",
      activityLabel: "Activity level", activity_sedentary: "Sedentary", activity_light: "Light", activity_moderate: "Moderate", activity_active: "Active", activity_very_active: "Very active",
      goalLabel: "Goal", fillAllFieldsMsg: "Please fill in every field to continue",
      suggestionTitle: "Your suggested targets", suggestionSubtitle: "Calculated from your info — feel free to adjust before saving.",
      suggestionNote: "Estimate only, based on standard formulas. You're always in control and can edit this anytime.",
      editProfileBtn: "Edit my info",
      authDemoNotice: "Demo mode — this screen is UI-only and does not check a real password. Enter anything to continue.",
      authTitle: "Welcome back", authSubtitle: "Log in to see your workouts, nutrition plan and progress.",
      authEmailLabel: "Email", authPasswordLabel: "Password", authContinueBtn: "Continue",
      authBackLink: "← Back to the homepage", logoutBtn: "Log out",
      authTabLogin: "Log In", authTabSignup: "Sign Up",
      authSignupTitle: "Create your account", authSignupSubtitle: "Your data is saved securely to your own account.",
      authCheckEmailMsg: "Check your email to confirm your account, then log in.",
      forgotPasswordLink: "Forgot password?", resetTitle: "Reset your password",
      resetSubtitle: "Enter your email and we'll send you a link to set a new password.",
      resetSendBtn: "Send reset link", resetCheckEmailMsg: "Check your email for a link to reset your password.",
      resetBackToLogin: "← Back to log in", newPasswordLabel: "New password", confirmPasswordLabel: "Confirm new password",
      resetPasswordSubmitBtn: "Set new password", resetSuccessMsg: "Password updated. Redirecting…",
      resetInvalidLinkMsg: "This reset link is invalid or expired. Please request a new one.",
      passwordMismatchMsg: "Passwords don't match.",
      todaysGoalsTitle: "Today's goals", goalWorkoutLabel: "Workout", goalCaloriesLabel: "Calories", goalProteinLabel: "Protein",
      goalSleepLabel: "Sleep", sleepAvgLabel: "Avg last 7 days:", hoursShort: "h", hoursPlaceholder: "Hours",
      setUpNutritionLink: "Set up nutrition →", setUpWorkoutLink: "Set up your program →", userSummaryTitle: "You", currentProgramLabel: "Program",
      consistencyLabel: "Consistency (4wk avg)", splitCustom: "Custom",
      templateCut: "Cut", templateCutDesc: "Lower calories for fat loss",
      templateMaintenance: "Maintenance", templateMaintenanceDesc: "Steady calories to hold weight",
      templateBulk: "Bulk", templateBulkDesc: "Higher calories to build muscle",
      caloriesUnit: "kcal", remainingLabel: "remaining", overLabel: "over target",
      editTargetsBtn: "Edit targets", targetsTitle: "Daily targets", dailyCaloriesLabel: "Daily calories",
      dailyProteinLabel: "Daily protein (g)", saveTargetsBtn: "Save targets",
      morningLabel: "Morning", middayLabel: "Midday", afternoonLabel: "Afternoon", eveningLabel: "Evening",
      addMealBtn: "Add meal", mealNamePlaceholder: "Meal name (e.g. Breakfast)", deleteMealBtn: "Delete meal",
      emptyMealMsg: "No foods yet", addFoodBtn: "Add food", removeItemBtn: "Remove",
      useExistingFoodLabel: "Use a saved food", createNewFoodOption: "+ Create new food",
      foodNameLabel: "Food name", amountLabel: "Amount", amountUnitLabel: "Unit",
      caloriesLabel: "Calories", proteinLabel: "Protein (g)", saveFoodBtn: "Add to meal",
      dragHint: "Drag meals to reorder or move between times of day",
      noMealsYet: "No meals yet — add your first one below.",

      /* ---- Progress page ---- */
      progressPageTitle: "Progress",
      bodyWeightTitle: "Body Weight", addWeightBtn: "Log weight", weightKgLabel: "Weight (kg)",
      logWeightBtn: "Save", noWeightData: "Log your weight to see a trend line here.",
      consistencyTitle: "Workout Consistency", workoutsPerWeekLabel: "workouts / week", noConsistencyData: "Complete a workout to see your consistency here.",
      exerciseProgressTitle: "Exercise Progress", selectExerciseLabel: "Exercise",
      noExerciseHistory: "Log a workout to start tracking exercise progress.", weightTrendLabel: "Working weight",
      latestLabel: "Latest", startLabel: "Start", changeLabel: "Change"
    },
    he: {
      brandSub: "כוח, במעקב.",
      navDashboard: "לוח בקרה", navWorkouts: "אימונים", navNutrition: "תזונה",
      navProgress: "התקדמות ומשקל", navCommunity: "קהילה", navCta: "נסו את הדמו",
      heroEyebrow: "נבנה עבור עולם הכושר בישראל",
      heroTitle: 'תתאמנו חכם. תאכלו טוב. <span class="accent">תתחזקו.</span>',
      heroLead: "Koach מרכזת את האימונים, יומן התזונה הישראלי, מגמות המשקל וקהילה תומכת בלוח בקרה אחד וברור — בעברית, אנגלית, ספרדית או ערבית.",
      heroCtaPrimary: "לצפייה בלוח הבקרה", heroCtaSecondary: "לכלי התזונה",
      statUsers: "משתמשים פעילים", statFoods: "מאכלים ישראליים במאגר", statLangs: "שפות נתמכות",
      dashHello: "שלום,",
      cardWorkouts: "אימונים", cardWorkoutsSub: "סה\"כ השבוע",
      cardSteps: "צעדים", cardGoal: "יעד", cardWater: "מים", cardWaterSub: "יעד 2.5 ל'",
      cardGoals: "יעדים יומיים", goalSleep: "לישון 7 שעות ומעלה", goalWater: "לשתות 2.5 ל' מים",
      goalWorkout: "להשלים אימון", goalSteps: "10,000 צעדים",
      tagOverview: "סקירה", dashboardTitle: "לוח בקרה אחד, כל המדדים",
      dashboardLead: "עברו בין הכלים בהם אתם משתמשים הכי הרבה — אימונים, תזונה, התקדמות וקהילה — בלי לעזוב את העמוד.",
      tabWeight: "מעקב משקל",
      workoutsTitle: "תכננו ותעדו כל אימון",
      workoutsLead: "בנו תוכניות אימון, עקבו אחר סטים וחזרות, ותנו ל-Koach להתאים את התוכנית ככל שתתחזקו.",
      wf1h: "תוכניות מותאמות אישית", wf1p: "כוח, HIIT או ניידות — בנו תוכנית שבועית סביב המטרות שלכם.",
      wf2h: "מעקב סטים וחזרות", wf2p: "תעדו כל סט עם טיימר מנוחה אוטומטי והתראות על שיא אישי.",
      wf3h: "סנכרון מאמן ושיעורים", wf3p: "חברו אימונים שהוזמנו בחדר הכושר או אצל המאמן האישי באופן אוטומטי.",
      wTodayTitle: "היום · ג', 21 באוקטובר", wUpper: "פלג גוף עליון וקרדיו",
      wRow1: "לחיצת חזה", wRow1sub: "4 סטים × 8 חזרות · 60 ק\"ג",
      wRow2: "מתח", wRow2sub: "3 סטים × 10 חזרות",
      wRow3: "קרדיו הליכון", wRow3sub: "20 דקות · אזור 3",
      wDone: "הושלם", wUpNext: "בהמשך",
      nutritionTitle: "בנוי עבור הצלחת הישראלית",
      nutritionLead: "מאגר מאכלים מקומי עם תיוג כשרות, מנות ביתיות ומנות ממסעדות — כדי שתיעוד הארוחות שלכם באמת ישקף את מה שאתם אוכלים.",
      nf1h: "מאגר מאכלים ישראלי", nf1p: "שקשוקה, סביח, חומוס ועוד, עם ערכים תזונתיים מדויקים.",
      nf2h: "תיוגי כשרות ותזונה", nf2p: "סננו לפי כשר, חלבי, פרווה או בשרי, וגם טבעוני וללא גלוטן.",
      nf3h: "יעדי מאקרו וקלוריות", nf3p: "יעדים יומיים מותאמים אישית שמתעדכנים לפי עומס האימונים שלכם.",
      nTodayTitle: "התיעוד של היום",
      food1: "שקשוקה", food2: "פיתה סביח", food3: "קערת חומוס וסלט", food4: "קוטג' 5%",
      tagDairy: "חלבי", tagParve: "פרווה", tagVegan: "טבעוני",
      weightTitle: "עקבו אחרי המגמה, לא אחרי הרעש",
      weightLead: "תעדו את המשקל שלכם מדי יום ו-Koach מחליקה את התנודות היומיות כדי שתוכלו לראות התקדמות אמיתית.",
      wt1h: "החלקת מגמה", wt1p: "ממוצע נע מסיר את רעשי משקל המים כדי שהמגמה תישאר אמינה.",
      wt2h: "מדדי גוף", wt2p: "עקבו אחרי היקף מותניים, חזה ועוד לצד המשקל לתמונה מלאה.",
      wt3h: "תחזית יעד", wt3p: "צפו בתאריך משוער להשגת משקל היעד לפי הקצב שלכם.",
      wtChartTitle: "7 השבועות האחרונים", wtDown: "-3.2 ק\"ג",
      wtCurrent: "נוכחי", wtGoal: "יעד", wtEta: "זמן משוער ליעד",
      communityTitle: "אתם לא מתאמנים לבד",
      communityLead: "שתפו התקדמות, הצטרפו לאתגרים מקומיים ועודדו מתאמנים בכל הארץ.",
      communityDemoNotice: "דוגמה להמחשה — לא פעילות אמיתית של חברים",
      cUser1: "דנה כ.", cLoc1: "תל אביב · אתגר 5 ק\"מ",
      cPost1: "\"שברתי שיא אישי בהרמת מתים הבוקר בזכות התוכנית ההדרגתית ש-Koach בנתה לי — 100 ק\"ג!\"",
      cUser2: "רועי ב.", cLoc2: "חיפה · קבוצת כוח",
      cPost2: "\"ירדתי 8 ק\"ג מאז ינואר בזכות תיעוד מדויק של הארוחות הישראליות שלי. האפליקציה מבינה את האוכל.\"",
      cUser3: "מיכל ש.", cLoc3: "ירושלים · יוגה וניידות",
      cPost3: "\"הצטרפתי לאתגר הניידות של 30 יום עם שלושה חברים מהחדר כושר — ההחלטה הכי טובה השנה.\"",
      statW: "אימונים שתועדו החודש", statF: "מאכלים ישראליים במאגר",
      statAvgLoss: "מגמה ממוצעת למשתמש / 8 שבועות", onTrack: "במסלול",
      statCommunity: "חברי קהילה", thisWeek: "השבוע",
      ctaTitle: "התחילו לעקוב בשפה שלכם",
      ctaLead: "Koach חינם לניסיון — עברו בין עברית, אנגלית, ספרדית וערבית בכל עת מהתפריט העליון.",
      ctaButton: "התחילו בחינם",
      footerRights: "© 2026 Koach. נבנה עבור קהילת הכושר בישראל.",

      appHome: "בית", weekdayMon: "ב'", weekdayTue: "ג'", weekdayWed: "ד'", weekdayThu: "ה'",
      weekdayFri: "ו'", weekdaySat: "ש'", weekdaySun: "א'", todayLabel: "היום",
      cancelBtn: "ביטול", saveBtn: "שמירה", deleteBtn: "מחיקה", editBtn: "עריכה", addBtn: "הוספה",
      saveFailedMsg: "לא הצלחנו לשמור לשרת — בדקו את החיבור לאינטרנט. השינויים שלכם נשמרים במכשיר הזה.",
      loadingMsg: "טוענים את הנתונים שלכם...", connectionErrorTitle: "בעיית חיבור",
      connectionErrorMsg: "לא הצלחנו להתחבר לשרת. בדקו את החיבור לאינטרנט ונסו שוב.", retryBtn: "ניסיון חוזר",
      muscle_chest: "חזה", muscle_back: "גב", muscle_shoulders: "כתפיים", muscle_legs: "רגליים",
      muscle_biceps: "יד קדמית", muscle_triceps: "יד אחורית", muscle_core: "core", muscle_other: "אחר",

      workoutPageTitle: "אימון",
      setupTitle: "בחרו את מבנה האימונים ההתחלתי", setupSubtitle: "בחרו מבנה נפוץ — תוכלו להתאים אותו אישית לאחר מכן.",
      splitFullBody: "גוף מלא", splitFullBodyDesc: "אימון אחד מאוזן, מצוין ל-2-3 פעמים בשבוע.",
      splitAB: "A / B", splitABDesc: "שני אימונים לסירוגין ל-4 פעמים בשבוע.",
      splitABC: "A / B / C", splitABCDesc: "שלושה אימונים מתחלפים ל-3-6 פעמים בשבוע.",
      splitPPL: "דחיפה / משיכה / רגליים", splitPPLDesc: "פיצול קלאסי לפי סוג התנועה.",
      continueBtn: "המשך", changeSplitBtn: "להתחיל מחדש עם מבנה אחר",
      missedDayHint: "פספסתם לסמן יום? לחצו עליו כדי להוסיף אימון.",
      chooseDifferentWorkoutLink: "בחרו אימון אחר",
      chooseWorkoutTitle: "בחרו אימון", pickWorkoutSubtitle: "איזה אימון עשיתם באותו יום?",
      logPastWorkoutTitle: "רישום אימון — {date}", recommendedBadge: "מומלץ",
      last7DaysTitle: "7 הימים האחרונים", restLabel: "מנוחה", noneLabel: "—",
      nextWorkoutLabel: "האימון הבא", startWorkoutBtn: "התחילו אימון", editProgramBtn: "ערכו תוכנית",
      noProgramYet: "הגדירו תוכנית כדי להתחיל.",
      activeWorkoutTitle: "אימון בתהליך", targetLabel: "יעד", lastWorkoutLabel: "אימון קודם",
      noPreviousData: "אין עדיין נתונים קודמים", weightUsedLabel: "משקל (ק\"ג)", setLabelShort: "סט",
      repsHeaderLabel: "חזרות", notesPlaceholder: "הוסיפו הערה קצרה (לא חובה)",
      renameExerciseHint: "לחצו לשינוי שם", exerciseRenamedMsg: "שם התרגיל עודכן",
      finishWorkoutBtn: "סיימו אימון", discardBtn: "בטלו",
      editProgramTitle: "עריכת תוכנית", workoutNameLabel: "שם האימון", muscleGroupsLabel: "קבוצות שרירים",
      exercisesLabel: "תרגילים", addExerciseBtn: "הוסיפו תרגיל", removeExerciseBtn: "הסירו",
      setsLabel: "סטים", repRangeLabel: "טווח חזרות", repMinLabel: "מינימום חזרות", repMaxLabel: "מקסימום חזרות",
      saveProgramBtn: "שמרו תוכנית", addWorkoutBtn: "הוסיפו אימון", removeWorkoutBtn: "הסירו אימון",
      chooseFromLibrary: "בחרו תרגיל", customExerciseOption: "+ יצירת תרגיל מותאם אישית",
      customExerciseNamePlaceholder: "שם התרגיל", addCustomExerciseBtn: "הוסיפו תרגיל מותאם",
      historicalExerciseNote: "כבר לא בתוכנית שלכם", workoutSavedMsg: "האימון נשמר!",
      repsShort: "חזרות", setsShort: "סטים", perSet: "חזרות לסט",
      confirmDeleteWorkout: "להסיר את האימון הזה מהתוכנית?",

      nutritionPageTitle: "תזונה",
      nutritionSetupTitle: "ספרו לנו עליכם", nutritionSetupSubtitle: "נדרשים כמה פרטים אמיתיים כדי להציע יעדים מדויקים — שום דבר לא מנוחש.",
      heightLabel: "גובה (ס\"מ)", ageLabel: "גיל", sexLabel: "מין", sex_male: "זכר", sex_female: "נקבה",
      activityLabel: "רמת פעילות", activity_sedentary: "יושבנית", activity_light: "קלה", activity_moderate: "בינונית", activity_active: "פעילה", activity_very_active: "פעילה מאוד",
      goalLabel: "מטרה", fillAllFieldsMsg: "נא למלא את כל השדות כדי להמשיך",
      suggestionTitle: "היעדים המוצעים לכם", suggestionSubtitle: "מחושב לפי הנתונים שלכם — אפשר להתאים לפני השמירה.",
      suggestionNote: "הערכה בלבד, לפי נוסחאות סטנדרטיות. השליטה תמיד בידיכם ותוכלו לערוך זאת בכל עת.",
      editProfileBtn: "עריכת הפרטים שלי",
      authDemoNotice: "מצב דמו — מסך זה הוא ממשק בלבד ואינו בודק סיסמה אמיתית. אפשר להזין כל דבר כדי להמשיך.",
      authTitle: "ברוכים השבים", authSubtitle: "התחברו כדי לראות את האימונים, תוכנית התזונה וההתקדמות שלכם.",
      authEmailLabel: "אימייל", authPasswordLabel: "סיסמה", authContinueBtn: "המשך",
      authBackLink: "→ חזרה לעמוד הבית", logoutBtn: "התנתקות",
      authTabLogin: "התחברות", authTabSignup: "הרשמה",
      authSignupTitle: "צרו חשבון", authSignupSubtitle: "הנתונים שלכם נשמרים בבטחה בחשבון האישי שלכם.",
      authCheckEmailMsg: "בדקו את תיבת המייל כדי לאשר את החשבון, ולאחר מכן התחברו.",
      forgotPasswordLink: "שכחתם סיסמה?", resetTitle: "איפוס סיסמה",
      resetSubtitle: "הזינו את כתובת המייל שלכם ונשלח לכם קישור להגדרת סיסמה חדשה.",
      resetSendBtn: "שליחת קישור לאיפוס", resetCheckEmailMsg: "בדקו את המייל שלכם לקבלת קישור לאיפוס הסיסמה.",
      resetBackToLogin: "→ חזרה להתחברות", newPasswordLabel: "סיסמה חדשה", confirmPasswordLabel: "אימות סיסמה חדשה",
      resetPasswordSubmitBtn: "קביעת סיסמה חדשה", resetSuccessMsg: "הסיסמה עודכנה. מעבירים אתכם...",
      resetInvalidLinkMsg: "קישור האיפוס לא תקין או שפג תוקפו. אנא בקשו קישור חדש.",
      passwordMismatchMsg: "הסיסמאות אינן תואמות.",
      todaysGoalsTitle: "יעדי היום", goalWorkoutLabel: "אימון", goalCaloriesLabel: "קלוריות", goalProteinLabel: "חלבון",
      goalSleepLabel: "שינה", sleepAvgLabel: "ממוצע 7 ימים אחרונים:", hoursShort: "ש'", hoursPlaceholder: "שעות",
      setUpNutritionLink: "הגדירו תזונה ←", setUpWorkoutLink: "הגדירו תוכנית אימונים ←", userSummaryTitle: "אתם", currentProgramLabel: "תוכנית",
      consistencyLabel: "עקביות (ממוצע 4 שבועות)", splitCustom: "מותאם אישית",
      templateCut: "חיטוב", templateCutDesc: "פחות קלוריות לירידה בשומן",
      templateMaintenance: "שימור", templateMaintenanceDesc: "קלוריות יציבות לשמירה על משקל",
      templateBulk: "מסה", templateBulkDesc: "יותר קלוריות לבניית שריר",
      caloriesUnit: "קק\"ל", remainingLabel: "נותרו", overLabel: "מעל היעד",
      editTargetsBtn: "עריכת יעדים", targetsTitle: "יעדים יומיים", dailyCaloriesLabel: "קלוריות יומיות",
      dailyProteinLabel: "חלבון יומי (גרם)", saveTargetsBtn: "שמרו יעדים",
      morningLabel: "בוקר", middayLabel: "צהריים", afternoonLabel: "אחר הצהריים", eveningLabel: "ערב",
      addMealBtn: "הוסיפו ארוחה", mealNamePlaceholder: "שם הארוחה (למשל ארוחת בוקר)", deleteMealBtn: "מחקו ארוחה",
      emptyMealMsg: "אין עדיין מאכלים", addFoodBtn: "הוסיפו מאכל", removeItemBtn: "הסירו",
      useExistingFoodLabel: "השתמשו במאכל שמור", createNewFoodOption: "+ יצירת מאכל חדש",
      foodNameLabel: "שם המאכל", amountLabel: "כמות", amountUnitLabel: "יחידה",
      caloriesLabel: "קלוריות", proteinLabel: "חלבון (גרם)", saveFoodBtn: "הוסיפו לארוחה",
      dragHint: "גררו ארוחות כדי לסדר מחדש או להעביר בין חלקי היום",
      noMealsYet: "אין עדיין ארוחות — הוסיפו את הראשונה למטה.",

      progressPageTitle: "התקדמות",
      bodyWeightTitle: "משקל גוף", addWeightBtn: "רישום משקל", weightKgLabel: "משקל (ק\"ג)",
      logWeightBtn: "שמירה", noWeightData: "רשמו את המשקל שלכם כדי לראות כאן גרף מגמה.",
      consistencyTitle: "עקביות אימונים", workoutsPerWeekLabel: "אימונים / שבוע", noConsistencyData: "השלימו אימון כדי לראות כאן את העקביות שלכם.",
      exerciseProgressTitle: "התקדמות בתרגיל", selectExerciseLabel: "תרגיל",
      noExerciseHistory: "תעדו אימון כדי להתחיל לעקוב אחר התקדמות בתרגיל.", weightTrendLabel: "משקל עבודה",
      latestLabel: "אחרון", startLabel: "התחלה", changeLabel: "שינוי"
    },
    es: {
      brandSub: "Fuerza, controlada.",
      navDashboard: "Panel", navWorkouts: "Entrenos", navNutrition: "Nutrición",
      navProgress: "Progreso y Peso", navCommunity: "Comunidad", navCta: "Probar demo",
      heroEyebrow: "Creado para el mundo fitness de Israel",
      heroTitle: 'Entrena mejor. Come mejor. <span class="accent">Hazte más fuerte.</span>',
      heroLead: "Koach reúne tus entrenamientos, tu registro de comida israelí, tus tendencias de peso y una comunidad de apoyo en un solo panel — en hebreo, inglés, español o árabe.",
      heroCtaPrimary: "Explorar el panel", heroCtaSecondary: "Ver herramientas de nutrición",
      statUsers: "Miembros activos", statFoods: "Comidas israelíes registradas", statLangs: "Idiomas disponibles",
      dashHello: "Hola,",
      cardWorkouts: "Entrenos", cardWorkoutsSub: "Total esta semana",
      cardSteps: "Pasos", cardGoal: "Meta", cardWater: "Agua", cardWaterSub: "Meta 2.5L",
      cardGoals: "Metas diarias", goalSleep: "Dormir 7+ horas", goalWater: "Beber 2.5L de agua",
      goalWorkout: "Completar entreno", goalSteps: "10.000 pasos",
      tagOverview: "Resumen", dashboardTitle: "Un panel, todas las métricas",
      dashboardLead: "Cambia entre las herramientas que más usas — entrenos, nutrición, progreso y comunidad — sin salir de la página.",
      tabWeight: "Control de Peso",
      workoutsTitle: "Planifica y registra cada sesión",
      workoutsLead: "Crea rutinas, registra series y repeticiones, y deja que Koach adapte tu plan a medida que progresas.",
      wf1h: "Rutinas personalizadas", wf1p: "Fuerza, HIIT o movilidad — crea un plan semanal según tus metas.",
      wf2h: "Registro de series y repeticiones", wf2p: "Registra cada serie con temporizador de descanso y alertas de récord personal.",
      wf3h: "Sincronización con entrenador", wf3p: "Conecta las sesiones reservadas en tu gimnasio o con tu entrenador personal.",
      wTodayTitle: "Hoy · Mar, 21 Oct", wUpper: "Tren superior y cardio",
      wRow1: "Press de banca", wRow1sub: "4 series × 8 reps · 60kg",
      wRow2: "Dominadas", wRow2sub: "3 series × 10 reps",
      wRow3: "Cardio en cinta", wRow3sub: "20 min · Zona 3",
      wDone: "Hecho", wUpNext: "Siguiente",
      nutritionTitle: "Pensado para el plato israelí",
      nutritionLead: "Una base de datos local con etiquetas kosher, platos caseros y clásicos de restaurante — para que tu registro refleje lo que realmente comes.",
      nf1h: "Base de datos israelí", nf1p: "Shakshuka, sabich, hummus y más, con macros precisos.",
      nf2h: "Etiquetas kosher y dietéticas", nf2p: "Filtra por kosher, lácteo, parve o carne, además de vegano y sin gluten.",
      nf3h: "Metas de macros y calorías", nf3p: "Objetivos diarios personalizados que se ajustan a tu carga de entrenamiento.",
      nTodayTitle: "Registro de hoy",
      food1: "Shakshuka", food2: "Pita Sabich", food3: "Bowl de hummus y ensalada", food4: "Queso cottage 5%",
      tagDairy: "Lácteo", tagParve: "Parve", tagVegan: "Vegano",
      weightTitle: "Mira la tendencia, no el ruido",
      weightLead: "Registra tu peso a diario y Koach suaviza la fluctuación diaria para que veas el progreso real.",
      wt1h: "Suavizado de tendencia", wt1p: "Un promedio móvil elimina el ruido del peso en agua para una tendencia honesta.",
      wt2h: "Medidas corporales", wt2p: "Registra cintura, pecho y más junto a tu peso para una imagen completa.",
      wt3h: "Proyección de meta", wt3p: "Ve una fecha estimada para alcanzar tu peso objetivo según tu ritmo.",
      wtChartTitle: "Últimas 7 semanas", wtDown: "-3.2 kg",
      wtCurrent: "Actual", wtGoal: "Meta", wtEta: "Est. a la meta",
      communityTitle: "No entrenas solo",
      communityLead: "Comparte tu progreso, únete a retos locales y anima a otros en todo Israel.",
      communityDemoNotice: "Ejemplo ilustrativo — no es actividad real de miembros",
      cUser1: "Dana K.", cLoc1: "Tel Aviv · Reto 5K",
      cPost1: '"¡Logré un nuevo récord en peso muerto gracias al plan progresivo que Koach creó para mí — 100kg!"',
      cUser2: "Roi B.", cLoc2: "Haifa · Grupo de fuerza",
      cPost2: '"Bajé 8kg desde enero registrando por fin mis comidas israelíes con precisión. Esta app entiende la comida."',
      cUser3: "Michal S.", cLoc3: "Jerusalén · Yoga y movilidad",
      cPost3: '"Me uní al reto de movilidad de 30 días con tres amigos del gimnasio — la mejor decisión del año."',
      statW: "Entrenos registrados este mes", statF: "Comidas israelíes en la base de datos",
      statAvgLoss: "Tendencia promedio / 8 sem", onTrack: "En buen camino",
      statCommunity: "Miembros de la comunidad", thisWeek: "esta semana",
      ctaTitle: "Empieza a registrar en tu idioma",
      ctaLead: "Koach es gratis para probar — cambia entre inglés, hebreo, español y árabe cuando quieras desde la barra superior.",
      ctaButton: "Empezar gratis",
      footerRights: "© 2026 Koach. Hecho para la comunidad fitness de Israel.",

      appHome: "Inicio", weekdayMon: "Lun", weekdayTue: "Mar", weekdayWed: "Mié", weekdayThu: "Jue",
      weekdayFri: "Vie", weekdaySat: "Sáb", weekdaySun: "Dom", todayLabel: "Hoy",
      cancelBtn: "Cancelar", saveBtn: "Guardar", deleteBtn: "Eliminar", editBtn: "Editar", addBtn: "Añadir",
      saveFailedMsg: "No se pudo guardar en el servidor — revisa tu conexión. Tus cambios se conservan en este dispositivo.",
      loadingMsg: "Cargando tus datos…", connectionErrorTitle: "Problema de conexión",
      connectionErrorMsg: "No pudimos conectar con el servidor. Revisa tu conexión a internet e inténtalo de nuevo.", retryBtn: "Reintentar",
      muscle_chest: "Pecho", muscle_back: "Espalda", muscle_shoulders: "Hombros", muscle_legs: "Piernas",
      muscle_biceps: "Bíceps", muscle_triceps: "Tríceps", muscle_core: "Core", muscle_other: "Otro",

      workoutPageTitle: "Entreno",
      setupTitle: "Elige tu rutina inicial", setupSubtitle: "Elige una estructura común — luego puedes personalizarla por completo.",
      splitFullBody: "Cuerpo completo", splitFullBodyDesc: "Un entreno equilibrado, ideal 2-3x/semana.",
      splitAB: "A / B", splitABDesc: "Dos entrenos alternos para 4x/semana.",
      splitABC: "A / B / C", splitABCDesc: "Tres entrenos rotativos para 3-6x/semana.",
      splitPPL: "Empuje / Tirón / Piernas", splitPPLDesc: "División clásica por patrón de movimiento.",
      continueBtn: "Continuar", changeSplitBtn: "Empezar de nuevo con otra rutina",
      missedDayHint: "¿Olvidaste registrar un día? Tócalo para añadir un entreno.",
      chooseDifferentWorkoutLink: "Elegir otro entreno",
      chooseWorkoutTitle: "Elige un entreno", pickWorkoutSubtitle: "¿Qué entreno hiciste ese día?",
      logPastWorkoutTitle: "Registrar entreno — {date}", recommendedBadge: "Recomendado",
      last7DaysTitle: "Últimos 7 días", restLabel: "Descanso", noneLabel: "—",
      nextWorkoutLabel: "Próximo entreno", startWorkoutBtn: "Iniciar entreno", editProgramBtn: "Editar programa",
      noProgramYet: "Configura tu programa para empezar.",
      activeWorkoutTitle: "Entreno en curso", targetLabel: "Objetivo", lastWorkoutLabel: "Entreno anterior",
      noPreviousData: "Aún no hay datos previos", weightUsedLabel: "Peso (kg)", setLabelShort: "Serie",
      repsHeaderLabel: "Reps", notesPlaceholder: "Añade una nota breve (opcional)",
      renameExerciseHint: "Haz clic para renombrar", exerciseRenamedMsg: "Ejercicio renombrado",
      finishWorkoutBtn: "Finalizar entreno", discardBtn: "Descartar",
      editProgramTitle: "Editar programa", workoutNameLabel: "Nombre del entreno", muscleGroupsLabel: "Grupos musculares",
      exercisesLabel: "Ejercicios", addExerciseBtn: "Añadir ejercicio", removeExerciseBtn: "Quitar",
      setsLabel: "Series", repRangeLabel: "Rango de repeticiones", repMinLabel: "Reps mín.", repMaxLabel: "Reps máx.",
      saveProgramBtn: "Guardar programa", addWorkoutBtn: "Añadir entreno", removeWorkoutBtn: "Quitar entreno",
      chooseFromLibrary: "Elegir ejercicio", customExerciseOption: "+ Crear ejercicio personalizado",
      customExerciseNamePlaceholder: "Nombre del ejercicio", addCustomExerciseBtn: "Añadir ejercicio personalizado",
      historicalExerciseNote: "Ya no está en tu programa", workoutSavedMsg: "¡Entreno guardado!",
      repsShort: "reps", setsShort: "series", perSet: "reps por serie",
      confirmDeleteWorkout: "¿Quitar este entreno de tu programa?",

      nutritionPageTitle: "Nutrición",
      nutritionSetupTitle: "Cuéntanos sobre ti", nutritionSetupSubtitle: "Necesitamos algunos datos reales para sugerir objetivos precisos — nada se inventa.",
      heightLabel: "Altura (cm)", ageLabel: "Edad", sexLabel: "Sexo", sex_male: "Hombre", sex_female: "Mujer",
      activityLabel: "Nivel de actividad", activity_sedentary: "Sedentario", activity_light: "Ligero", activity_moderate: "Moderado", activity_active: "Activo", activity_very_active: "Muy activo",
      goalLabel: "Objetivo", fillAllFieldsMsg: "Completa todos los campos para continuar",
      suggestionTitle: "Tus objetivos sugeridos", suggestionSubtitle: "Calculado con tus datos — puedes ajustarlo antes de guardar.",
      suggestionNote: "Solo una estimación basada en fórmulas estándar. Tú tienes el control y puedes editarlo cuando quieras.",
      editProfileBtn: "Editar mis datos",
      authDemoNotice: "Modo demo — esta pantalla es solo interfaz y no verifica una contraseña real. Escribe cualquier cosa para continuar.",
      authTitle: "Bienvenido de nuevo", authSubtitle: "Inicia sesión para ver tus entrenos, tu plan de nutrición y tu progreso.",
      authEmailLabel: "Correo electrónico", authPasswordLabel: "Contraseña", authContinueBtn: "Continuar",
      authBackLink: "← Volver al inicio", logoutBtn: "Cerrar sesión",
      authTabLogin: "Iniciar sesión", authTabSignup: "Registrarse",
      authSignupTitle: "Crea tu cuenta", authSignupSubtitle: "Tus datos se guardan de forma segura en tu propia cuenta.",
      authCheckEmailMsg: "Revisa tu correo para confirmar tu cuenta y luego inicia sesión.",
      forgotPasswordLink: "¿Olvidaste tu contraseña?", resetTitle: "Restablece tu contraseña",
      resetSubtitle: "Introduce tu correo y te enviaremos un enlace para crear una nueva contraseña.",
      resetSendBtn: "Enviar enlace", resetCheckEmailMsg: "Revisa tu correo para ver el enlace de restablecimiento.",
      resetBackToLogin: "← Volver a iniciar sesión", newPasswordLabel: "Nueva contraseña", confirmPasswordLabel: "Confirmar nueva contraseña",
      resetPasswordSubmitBtn: "Establecer nueva contraseña", resetSuccessMsg: "Contraseña actualizada. Redirigiendo…",
      resetInvalidLinkMsg: "Este enlace no es válido o ha caducado. Solicita uno nuevo.",
      passwordMismatchMsg: "Las contraseñas no coinciden.",
      todaysGoalsTitle: "Objetivos de hoy", goalWorkoutLabel: "Entreno", goalCaloriesLabel: "Calorías", goalProteinLabel: "Proteína",
      goalSleepLabel: "Sueño", sleepAvgLabel: "Prom. últimos 7 días:", hoursShort: "h", hoursPlaceholder: "Horas",
      setUpNutritionLink: "Configurar nutrición →", setUpWorkoutLink: "Configura tu programa →", userSummaryTitle: "Tú", currentProgramLabel: "Programa",
      consistencyLabel: "Constancia (prom. 4 sem)", splitCustom: "Personalizado",
      templateCut: "Definición", templateCutDesc: "Menos calorías para perder grasa",
      templateMaintenance: "Mantenimiento", templateMaintenanceDesc: "Calorías estables para mantener el peso",
      templateBulk: "Volumen", templateBulkDesc: "Más calorías para ganar músculo",
      caloriesUnit: "kcal", remainingLabel: "restantes", overLabel: "sobre el objetivo",
      editTargetsBtn: "Editar objetivos", targetsTitle: "Objetivos diarios", dailyCaloriesLabel: "Calorías diarias",
      dailyProteinLabel: "Proteína diaria (g)", saveTargetsBtn: "Guardar objetivos",
      morningLabel: "Mañana", middayLabel: "Mediodía", afternoonLabel: "Tarde", eveningLabel: "Noche",
      addMealBtn: "Añadir comida", mealNamePlaceholder: "Nombre de la comida (ej. Desayuno)", deleteMealBtn: "Eliminar comida",
      emptyMealMsg: "Aún no hay alimentos", addFoodBtn: "Añadir alimento", removeItemBtn: "Quitar",
      useExistingFoodLabel: "Usar un alimento guardado", createNewFoodOption: "+ Crear nuevo alimento",
      foodNameLabel: "Nombre del alimento", amountLabel: "Cantidad", amountUnitLabel: "Unidad",
      caloriesLabel: "Calorías", proteinLabel: "Proteína (g)", saveFoodBtn: "Añadir a la comida",
      dragHint: "Arrastra las comidas para reordenarlas o moverlas entre momentos del día",
      noMealsYet: "Aún no hay comidas — añade la primera abajo.",

      progressPageTitle: "Progreso",
      bodyWeightTitle: "Peso corporal", addWeightBtn: "Registrar peso", weightKgLabel: "Peso (kg)",
      logWeightBtn: "Guardar", noWeightData: "Registra tu peso para ver aquí una tendencia.",
      consistencyTitle: "Constancia de entreno", workoutsPerWeekLabel: "entrenos / semana", noConsistencyData: "Completa un entreno para ver aquí tu constancia.",
      exerciseProgressTitle: "Progreso por ejercicio", selectExerciseLabel: "Ejercicio",
      noExerciseHistory: "Registra un entreno para empezar a ver el progreso.", weightTrendLabel: "Peso de trabajo",
      latestLabel: "Último", startLabel: "Inicio", changeLabel: "Cambio"
    },
    ar: {
      brandSub: "القوة، بمتابعة.",
      navDashboard: "لوحة التحكم", navWorkouts: "التمارين", navNutrition: "التغذية",
      navProgress: "التقدم والوزن", navCommunity: "المجتمع", navCta: "جرّب العرض",
      heroEyebrow: "مصمم لعالم اللياقة في إسرائيل",
      heroTitle: 'تمرّن بذكاء. كُل أفضل. <span class="accent">كن أقوى.</span>',
      heroLead: "يجمع Koach تمارينك وسجل التغذية الإسرائيلي واتجاهات وزنك ومجتمعًا داعمًا في لوحة تحكم واحدة واضحة — بالعبرية أو الإنجليزية أو الإسبانية أو العربية.",
      heroCtaPrimary: "استكشف لوحة التحكم", heroCtaSecondary: "عرض أدوات التغذية",
      statUsers: "أعضاء نشطون", statFoods: "أطعمة إسرائيلية مسجلة", statLangs: "لغات مدعومة",
      dashHello: "مرحباً،",
      cardWorkouts: "التمارين", cardWorkoutsSub: "الإجمالي هذا الأسبوع",
      cardSteps: "الخطوات", cardGoal: "الهدف", cardWater: "الماء", cardWaterSub: "الهدف 2.5 لتر",
      cardGoals: "الأهداف اليومية", goalSleep: "النوم 7 ساعات أو أكثر", goalWater: "شرب 2.5 لتر ماء",
      goalWorkout: "إكمال التمرين", goalSteps: "10,000 خطوة",
      tagOverview: "نظرة عامة", dashboardTitle: "لوحة تحكم واحدة، كل المقاييس",
      dashboardLead: "تنقّل بين الأدوات الأكثر استخدامًا — التمارين والتغذية والتقدم والمجتمع — دون مغادرة الصفحة.",
      tabWeight: "متابعة الوزن",
      workoutsTitle: "خطّط وسجّل كل جلسة",
      workoutsLead: "ابنِ برامج تدريبية، وتتبّع المجموعات والتكرارات، ودع Koach يطوّر خطتك مع تقدمك.",
      wf1h: "برامج مخصصة", wf1p: "قوة أو تمارين عالية الكثافة أو مرونة — ابنِ خطة أسبوعية تناسب أهدافك.",
      wf2h: "تتبّع المجموعات والتكرارات", wf2p: "سجّل كل مجموعة مع مؤقت راحة تلقائي وتنبيهات الأرقام القياسية الشخصية.",
      wf3h: "مزامنة المدرب والحصص", wf3p: "اربط الجلسات المحجوزة في ناديك أو مع مدربك الشخصي تلقائيًا.",
      wTodayTitle: "اليوم · الثلاثاء 21 أكتوبر", wUpper: "الجزء العلوي وتمارين القلب",
      wRow1: "ضغط البنش", wRow1sub: "4 مجموعات × 8 تكرارات · 60 كجم",
      wRow2: "العقلة", wRow2sub: "3 مجموعات × 10 تكرارات",
      wRow3: "جهاز الجري", wRow3sub: "20 دقيقة · المنطقة 3",
      wDone: "تم", wUpNext: "التالي",
      nutritionTitle: "مصمم للمائدة الإسرائيلية",
      nutritionLead: "قاعدة بيانات غذائية محلية مع تصنيفات كوشر وأطباق منزلية وأطباق مطاعم شائعة — ليعكس تسجيلك فعلاً ما تأكله.",
      nf1h: "قاعدة بيانات الطعام الإسرائيلي", nf1p: "شكشوكة، سبيح، حمص وأكثر، مع قيم غذائية دقيقة.",
      nf2h: "تصنيفات كوشر وغذائية", nf2p: "صفِّ حسب كوشر، ألبان، بارف أو لحوم، إضافة إلى نباتي وخالٍ من الغلوتين.",
      nf3h: "أهداف الماكرو والسعرات", nf3p: "أهداف يومية مخصصة تتكيف مع حجم تدريبك.",
      nTodayTitle: "سجل اليوم",
      food1: "شكشوكة", food2: "بيتا سبيح", food3: "طبق حمص وسلطة", food4: "جبنة قريش 5%",
      tagDairy: "ألبان", tagParve: "بارف", tagVegan: "نباتي",
      weightTitle: "راقب الاتجاه، لا الضوضاء",
      weightLead: "سجّل وزنك يوميًا، ويقوم Koach بتنعيم التقلبات اليومية لترى تقدمًا حقيقيًا.",
      wt1h: "تنعيم الاتجاه", wt1p: "يزيل المتوسط المتحرك ضوضاء وزن الماء ليبقى الاتجاه صادقًا.",
      wt2h: "قياسات الجسم", wt2p: "تتبّع محيط الخصر والصدر وغيرها إلى جانب وزنك للحصول على صورة كاملة.",
      wt3h: "توقع الهدف", wt3p: "شاهد تاريخًا تقديريًا للوصول إلى وزنك المستهدف بناءً على وتيرتك.",
      wtChartTitle: "آخر 7 أسابيع", wtDown: "-3.2 كجم",
      wtCurrent: "الحالي", wtGoal: "الهدف", wtEta: "الوقت المقدر للهدف",
      communityTitle: "أنت لا تتدرب وحدك",
      communityLead: "شارك تقدمك، انضم إلى تحديات محلية، وشجّع الرياضيين في جميع أنحاء إسرائيل.",
      communityDemoNotice: "مثال توضيحي — ليس نشاطًا حقيقيًا للأعضاء",
      cUser1: "دانا ك.", cLoc1: "تل أبيب · تحدي 5 كم",
      cPost1: "\"حققت رقمًا قياسيًا جديدًا في رفعة الرافعة الميتة هذا الصباح بفضل الخطة التدريجية التي بناها لي Koach — 100 كجم!\"",
      cUser2: "روعي ب.", cLoc2: "حيفا · مجموعة القوة",
      cPost2: "\"خسرت 8 كجم منذ يناير بتسجيل وجباتي الإسرائيلية بدقة أخيرًا. هذا التطبيق يفهم الطعام جيدًا.\"",
      cUser3: "ميخال ش.", cLoc3: "القدس · يوغا ومرونة",
      cPost3: "\"انضممت إلى تحدي المرونة لمدة 30 يومًا مع ثلاثة أصدقاء من النادي — أفضل قرار هذا العام.\"",
      statW: "تمارين مسجّلة هذا الشهر", statF: "أطعمة إسرائيلية في قاعدة البيانات",
      statAvgLoss: "متوسط اتجاه العضو / 8 أسابيع", onTrack: "على المسار الصحيح",
      statCommunity: "أعضاء المجتمع", thisWeek: "هذا الأسبوع",
      ctaTitle: "ابدأ التتبع بلغتك",
      ctaLead: "Koach مجاني للتجربة — بدّل بين الإنجليزية والعبرية والإسبانية والعربية في أي وقت من الشريط العلوي.",
      ctaButton: "ابدأ مجانًا",
      footerRights: "© 2026 Koach. صُنع لمجتمع اللياقة في إسرائيل.",

      appHome: "الرئيسية", weekdayMon: "إثن", weekdayTue: "ثلا", weekdayWed: "أرب", weekdayThu: "خمي",
      weekdayFri: "جمع", weekdaySat: "سبت", weekdaySun: "أحد", todayLabel: "اليوم",
      cancelBtn: "إلغاء", saveBtn: "حفظ", deleteBtn: "حذف", editBtn: "تعديل", addBtn: "إضافة",
      saveFailedMsg: "تعذّر الحفظ في الخادم — تحقق من اتصالك. تم الاحتفاظ بتغييراتك على هذا الجهاز.",
      loadingMsg: "جارٍ تحميل بياناتك...", connectionErrorTitle: "مشكلة في الاتصال",
      connectionErrorMsg: "تعذّر الوصول إلى الخادم. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.", retryBtn: "إعادة المحاولة",
      muscle_chest: "الصدر", muscle_back: "الظهر", muscle_shoulders: "الأكتاف", muscle_legs: "الأرجل",
      muscle_biceps: "البايسبس", muscle_triceps: "الترايسبس", muscle_core: "الجذع", muscle_other: "أخرى",

      workoutPageTitle: "التمرين",
      setupTitle: "اختر برنامج التقسيم الأولي", setupSubtitle: "اختر بنية شائعة — يمكنك تخصيصها بالكامل لاحقًا.",
      splitFullBody: "الجسم كامل", splitFullBodyDesc: "تمرين متوازن واحد، مثالي لـ 2-3 مرات أسبوعيًا.",
      splitAB: "A / B", splitABDesc: "تمرينان متناوبان لـ 4 مرات أسبوعيًا.",
      splitABC: "A / B / C", splitABCDesc: "ثلاثة تمارين متناوبة لـ 3-6 مرات أسبوعيًا.",
      splitPPL: "دفع / سحب / أرجل", splitPPLDesc: "تقسيم كلاسيكي حسب نمط الحركة.",
      continueBtn: "متابعة", changeSplitBtn: "البدء من جديد ببرنامج مختلف",
      missedDayHint: "فاتك تسجيل يوم؟ اضغط عليه لإضافة تمرين.",
      chooseDifferentWorkoutLink: "اختر تمرينًا آخر",
      chooseWorkoutTitle: "اختر تمرينًا", pickWorkoutSubtitle: "أي تمرين قمت به في ذلك اليوم؟",
      logPastWorkoutTitle: "تسجيل تمرين — {date}", recommendedBadge: "موصى به",
      last7DaysTitle: "آخر 7 أيام", restLabel: "راحة", noneLabel: "—",
      nextWorkoutLabel: "التمرين التالي", startWorkoutBtn: "ابدأ التمرين", editProgramBtn: "تعديل البرنامج",
      noProgramYet: "أعدّ برنامجك للبدء.",
      activeWorkoutTitle: "التمرين قيد التنفيذ", targetLabel: "الهدف", lastWorkoutLabel: "التمرين السابق",
      noPreviousData: "لا توجد بيانات سابقة بعد", weightUsedLabel: "الوزن (كجم)", setLabelShort: "مجموعة",
      repsHeaderLabel: "تكرارات", notesPlaceholder: "أضف ملاحظة قصيرة (اختياري)",
      renameExerciseHint: "انقر لإعادة التسمية", exerciseRenamedMsg: "تم تغيير اسم التمرين",
      finishWorkoutBtn: "إنهاء التمرين", discardBtn: "تجاهل",
      editProgramTitle: "تعديل البرنامج", workoutNameLabel: "اسم التمرين", muscleGroupsLabel: "مجموعات العضلات",
      exercisesLabel: "التمارين", addExerciseBtn: "أضف تمرينًا", removeExerciseBtn: "إزالة",
      setsLabel: "المجموعات", repRangeLabel: "نطاق التكرارات", repMinLabel: "الحد الأدنى للتكرارات", repMaxLabel: "الحد الأقصى للتكرارات",
      saveProgramBtn: "حفظ البرنامج", addWorkoutBtn: "أضف تمرينًا جديدًا", removeWorkoutBtn: "إزالة التمرين",
      chooseFromLibrary: "اختر تمرينًا", customExerciseOption: "+ إنشاء تمرين مخصص",
      customExerciseNamePlaceholder: "اسم التمرين", addCustomExerciseBtn: "أضف تمرينًا مخصصًا",
      historicalExerciseNote: "لم يعد ضمن برنامجك", workoutSavedMsg: "تم حفظ التمرين!",
      repsShort: "تكرارات", setsShort: "مجموعات", perSet: "تكرارات لكل مجموعة",
      confirmDeleteWorkout: "إزالة هذا التمرين من برنامجك؟",

      nutritionPageTitle: "التغذية",
      nutritionSetupTitle: "أخبرنا عنك", nutritionSetupSubtitle: "نحتاج بعض البيانات الحقيقية لاقتراح أهداف دقيقة — لا شيء مُخمَّن.",
      heightLabel: "الطول (سم)", ageLabel: "العمر", sexLabel: "الجنس", sex_male: "ذكر", sex_female: "أنثى",
      activityLabel: "مستوى النشاط", activity_sedentary: "خامل", activity_light: "خفيف", activity_moderate: "متوسط", activity_active: "نشط", activity_very_active: "نشط جدًا",
      goalLabel: "الهدف", fillAllFieldsMsg: "يرجى ملء جميع الحقول للمتابعة",
      suggestionTitle: "أهدافك المقترحة", suggestionSubtitle: "محسوبة من بياناتك — يمكنك التعديل قبل الحفظ.",
      suggestionNote: "مجرد تقدير يعتمد على معادلات قياسية. أنت من يتحكم دائمًا ويمكنك تعديله في أي وقت.",
      editProfileBtn: "تعديل بياناتي",
      authDemoNotice: "وضع تجريبي — هذه الشاشة واجهة فقط ولا تتحقق من كلمة مرور حقيقية. أدخل أي شيء للمتابعة.",
      authTitle: "مرحبًا بعودتك", authSubtitle: "سجّل الدخول لرؤية تمارينك وخطة تغذيتك وتقدمك.",
      authEmailLabel: "البريد الإلكتروني", authPasswordLabel: "كلمة المرور", authContinueBtn: "متابعة",
      authBackLink: "→ العودة إلى الصفحة الرئيسية", logoutBtn: "تسجيل الخروج",
      authTabLogin: "تسجيل الدخول", authTabSignup: "إنشاء حساب",
      authSignupTitle: "أنشئ حسابك", authSignupSubtitle: "تُحفظ بياناتك بأمان في حسابك الخاص.",
      authCheckEmailMsg: "تحقق من بريدك الإلكتروني لتأكيد حسابك، ثم سجّل الدخول.",
      forgotPasswordLink: "نسيت كلمة المرور؟", resetTitle: "إعادة تعيين كلمة المرور",
      resetSubtitle: "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لتعيين كلمة مرور جديدة.",
      resetSendBtn: "إرسال رابط إعادة التعيين", resetCheckEmailMsg: "تحقق من بريدك الإلكتروني للحصول على رابط إعادة تعيين كلمة المرور.",
      resetBackToLogin: "→ العودة لتسجيل الدخول", newPasswordLabel: "كلمة المرور الجديدة", confirmPasswordLabel: "تأكيد كلمة المرور الجديدة",
      resetPasswordSubmitBtn: "تعيين كلمة المرور الجديدة", resetSuccessMsg: "تم تحديث كلمة المرور. جارٍ التحويل...",
      resetInvalidLinkMsg: "رابط إعادة التعيين غير صالح أو منتهي الصلاحية. يرجى طلب رابط جديد.",
      passwordMismatchMsg: "كلمتا المرور غير متطابقتين.",
      todaysGoalsTitle: "أهداف اليوم", goalWorkoutLabel: "التمرين", goalCaloriesLabel: "السعرات", goalProteinLabel: "البروتين",
      goalSleepLabel: "النوم", sleepAvgLabel: "متوسط آخر 7 أيام:", hoursShort: "س", hoursPlaceholder: "ساعات",
      setUpNutritionLink: "إعداد التغذية ←", setUpWorkoutLink: "إعداد برنامج التمرين ←", userSummaryTitle: "أنت", currentProgramLabel: "البرنامج",
      consistencyLabel: "الانتظام (متوسط 4 أسابيع)", splitCustom: "مخصص",
      templateCut: "تنشيف", templateCutDesc: "سعرات أقل لفقدان الدهون",
      templateMaintenance: "محافظة", templateMaintenanceDesc: "سعرات ثابتة للحفاظ على الوزن",
      templateBulk: "تضخيم", templateBulkDesc: "سعرات أكثر لبناء العضلات",
      caloriesUnit: "سعرة", remainingLabel: "متبقٍ", overLabel: "فوق الهدف",
      editTargetsBtn: "تعديل الأهداف", targetsTitle: "الأهداف اليومية", dailyCaloriesLabel: "السعرات اليومية",
      dailyProteinLabel: "البروتين اليومي (جم)", saveTargetsBtn: "حفظ الأهداف",
      morningLabel: "الصباح", middayLabel: "الظهيرة", afternoonLabel: "بعد الظهر", eveningLabel: "المساء",
      addMealBtn: "أضف وجبة", mealNamePlaceholder: "اسم الوجبة (مثال: الفطور)", deleteMealBtn: "حذف الوجبة",
      emptyMealMsg: "لا توجد أطعمة بعد", addFoodBtn: "أضف طعامًا", removeItemBtn: "إزالة",
      useExistingFoodLabel: "استخدم طعامًا محفوظًا", createNewFoodOption: "+ إنشاء طعام جديد",
      foodNameLabel: "اسم الطعام", amountLabel: "الكمية", amountUnitLabel: "الوحدة",
      caloriesLabel: "السعرات", proteinLabel: "البروتين (جم)", saveFoodBtn: "أضف إلى الوجبة",
      dragHint: "اسحب الوجبات لإعادة ترتيبها أو نقلها بين أوقات اليوم",
      noMealsYet: "لا توجد وجبات بعد — أضف الأولى أدناه.",

      progressPageTitle: "التقدم",
      bodyWeightTitle: "وزن الجسم", addWeightBtn: "تسجيل الوزن", weightKgLabel: "الوزن (كجم)",
      logWeightBtn: "حفظ", noWeightData: "سجّل وزنك لترى خط الاتجاه هنا.",
      consistencyTitle: "انتظام التمرين", workoutsPerWeekLabel: "تمارين / أسبوع", noConsistencyData: "أكمل تمرينًا لترى انتظامك هنا.",
      exerciseProgressTitle: "تقدم التمرين", selectExerciseLabel: "التمرين",
      noExerciseHistory: "سجّل تمرينًا لبدء تتبع التقدم.", weightTrendLabel: "وزن العمل",
      latestLabel: "الأحدث", startLabel: "البداية", changeLabel: "التغيير"
    }
  };

  var rtlLangs = { he: true, ar: true };
  var langNames = { en: "EN", he: "עב", es: "ES", ar: "AR" };
  var STORAGE_KEY = "koach-lang";
  var currentLang = "en";
  var langChangeListeners = [];

  function applyLang(lang) {
    var dict = translations[lang] || translations.en;
    currentLang = translations[lang] ? lang : "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = rtlLangs[lang] ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    var langLabelEl = document.getElementById("langLabel");
    if (langLabelEl) langLabelEl.textContent = langNames[lang] || "EN";
    document.querySelectorAll(".lang-option").forEach(function (opt) {
      opt.setAttribute("aria-checked", opt.getAttribute("data-lang") === lang ? "true" : "false");
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    langChangeListeners.forEach(function (fn) {
      try { fn(currentLang); } catch (e) {}
    });
  }

  function t(key) {
    var dict = translations[currentLang] || translations.en;
    return dict[key] !== undefined ? dict[key] : (translations.en[key] !== undefined ? translations.en[key] : key);
  }

  window.KoachI18n = {
    t: t,
    getLang: function () { return currentLang; },
    isRTL: function () { return !!rtlLangs[currentLang]; },
    onChange: function (fn) { langChangeListeners.push(fn); },
    applyLang: applyLang
  };

  /* Shared toast, usable from any script (including store.js and auth-gate.js,
     which have no page-specific showToast of their own) — every app page
     includes a <div id="toast" class="toast">. */
  var toastTimer = null;
  window.KoachToast = function (msg, variant) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.toggle("toast-error", variant === "error");
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, variant === "error" ? 4000 : 2200);
  };

  function initLangSwitch() {
    var btn = document.getElementById("langBtn");
    var menu = document.getElementById("langMenu");
    if (!btn || !menu) {
      /* Minimal pages (e.g. the login screen) may not include the language
         switcher — still apply the saved language to any data-i18n text. */
      var saved0;
      try { saved0 = localStorage.getItem(STORAGE_KEY); } catch (e) {}
      applyLang(saved0 && translations[saved0] ? saved0 : "en");
      return;
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", function () {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });

    menu.addEventListener("click", function (e) { e.stopPropagation(); });

    document.querySelectorAll(".lang-option").forEach(function (opt) {
      opt.addEventListener("click", function () {
        applyLang(opt.getAttribute("data-lang"));
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });

    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    applyLang(saved && translations[saved] ? saved : "en");
  }

  function initTabs() {
    var buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");
        buttons.forEach(function (b) {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        document.querySelectorAll(".tab-panel").forEach(function (panel) {
          panel.classList.toggle("active", panel.id === "panel-" + target);
        });
      });
    });
  }

  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("mobile-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("mobile-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLangSwitch();
    initTabs();
    initMobileNav();
  });
})();
