/* =========================================================
   Stackly — Shared dashboard behavior (greeting + logout)
========================================================= */
(function () {
  "use strict";
  const $ = (sel) => document.querySelector(sel);

  let email = "";
  try { email = sessionStorage.getItem("stackly_email") || ""; } catch (e) {}

  const greetEl = $("[data-user-email]");
  if (greetEl) greetEl.textContent = email || "guest@stackly.example";

  const namePart = (email.split("@")[0] || "guest").replace(/[._]/g, " ").trim();
  const displayName = namePart ? namePart.charAt(0).toUpperCase() + namePart.slice(1) : "Guest";
  const nameEl = $("[data-user-name]");
  if (nameEl) nameEl.textContent = displayName;
  const initialEl = $("[data-user-initial]");
  if (initialEl) initialEl.textContent = displayName.charAt(0).toUpperCase();

  const logoutBtn = $("[data-logout]");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      try {
        sessionStorage.removeItem("stackly_role");
        sessionStorage.removeItem("stackly_email");
      } catch (err) {}
      window.location.href = "login.html";
    });
  }
})();
