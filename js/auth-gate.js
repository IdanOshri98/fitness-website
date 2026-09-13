/* ============================================================
   REAL session gate backed by Supabase Auth.
   Redirects to login.html if there is no active session, and loads the
   signed-in user's data from the server (js/store.js loadRemote) before
   resolving `KoachAuth.ready` — page scripts await that promise instead
   of DOMContentLoaded, so they never render before real data has loaded.

   Also owns the loading screen shown while that check/fetch is in flight,
   and a connection-error screen (with Retry) if the server never responds —
   without this, a slow/failed network left the page blank with no
   explanation, which is exactly the gap this file closes.
   ============================================================ */
(function () {
  "use strict";

  var TIMEOUT_MS = 10000;

  function currentPage() {
    return location.pathname.split("/").pop() || "index.html";
  }

  function tr(key, fallback) {
    return window.KoachI18n ? window.KoachI18n.t(key) : fallback;
  }

  /* ---------------- Loading / error overlay ---------------- */
  var overlay = document.createElement("div");
  overlay.id = "authGateOverlay";
  overlay.className = "auth-gate-overlay";
  overlay.innerHTML =
    '<div class="auth-gate-spinner"></div>' +
    '<p class="auth-gate-text" data-i18n="loadingMsg">Loading your data…</p>';
  document.documentElement.appendChild(overlay);

  function hideOverlay() {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }

  function showConnectionError() {
    overlay.innerHTML =
      '<div class="auth-gate-error-icon">⚠</div>' +
      "<h2>" + tr("connectionErrorTitle", "Connection problem") + "</h2>" +
      "<p>" + tr("connectionErrorMsg", "We couldn't reach the server. Check your internet connection and try again.") + "</p>" +
      '<button class="btn btn-primary" id="authGateRetry">' + tr("retryBtn", "Retry") + "</button>";
    var btn = document.getElementById("authGateRetry");
    if (btn) btn.addEventListener("click", function () { location.reload(); });
  }

  function currentPage_isLogin() {
    return currentPage() === "login.html";
  }

  /* ---------------- Readiness ---------------- */
  var readyResolve;
  var ready = new Promise(function (resolve) { readyResolve = resolve; });
  var settled = false;

  function goToLogin() {
    settled = true;
    if (!currentPage_isLogin()) location.href = "login.html";
    else hideOverlay();
  }

  function succeed(user) {
    settled = true;
    hideOverlay();
    readyResolve(user);
  }

  function timeoutPromise(ms) {
    return new Promise(function (resolve) {
      setTimeout(function () { resolve({ timedOut: true }); }, ms);
    });
  }

  function handleSession(session) {
    if (!session) {
      goToLogin();
      return;
    }
    Promise.race([
      window.KoachStore.loadRemote(session.user.id).then(function () { return { timedOut: false }; }),
      timeoutPromise(TIMEOUT_MS)
    ]).then(function (res) {
      if (settled) return;
      if (res && res.timedOut) { showConnectionError(); return; }
      succeed(session.user);
    }).catch(function (err) {
      console.error("Koach: failed to load data from the server", err);
      if (!settled) showConnectionError();
    });
  }

  if (!window.sb) {
    console.error("Koach: Supabase client missing — check script load order or network.");
    showConnectionError();
  } else {
    Promise.race([
      window.sb.auth.getSession().then(function (res) { return { session: res.data.session }; }),
      timeoutPromise(TIMEOUT_MS)
    ]).then(function (res) {
      if (settled) return;
      if (res && res.timedOut) { showConnectionError(); return; }
      handleSession(res.session);
    }).catch(function (err) {
      console.error("Koach: failed to check session", err);
      if (!settled) showConnectionError();
    });

    window.sb.auth.onAuthStateChange(function (event) {
      if (event === "SIGNED_OUT") goToLogin();
    });
  }

  function signOut() {
    if (window.sb) window.sb.auth.signOut();
    location.href = "login.html";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("logoutBtn");
    if (btn) btn.addEventListener("click", signOut);
  });

  window.KoachAuth = { ready: ready, signOut: signOut };
})();
