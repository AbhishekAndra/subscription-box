/* =========================================================
   Stackly — Login form: validation + role-based redirect
========================================================= */
(function () {
  "use strict";

  const form = document.getElementById("loginForm");
  if (!form) return;

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  // demo-only password rule: at least 8 characters, one letter, one number
  const strongPassword = (v) => v.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = $("#li-email");
    const password = $("#li-password");
    const msg = $("#loginMsg");
    let ok = true;

    [email, password].forEach((input) => {
      const field = input.closest(".form-field");
      const err = field.querySelector(".field-error");
      let fieldOk = true;
      let errorText = "";

      if (!input.value.trim()) {
        fieldOk = false;
        errorText = input.type === "email" ? "Email is required." : "Password is required.";
      } else if (input.type === "email" && !validEmail(input.value)) {
        fieldOk = false;
        errorText = "Enter a valid email address.";
      } else if (input.type === "password" && !strongPassword(input.value)) {
        fieldOk = false;
        errorText = "Password must be at least 8 characters and include a letter and a number.";
      }

      field.classList.toggle("invalid", !fieldOk);
      if (err) err.textContent = errorText;
      if (!fieldOk) ok = false;
    });

    if (!ok) {
      if (msg) { msg.textContent = ""; }
      return;
    }

    const selectedRole = form.querySelector('input[name="role"]:checked');
    const destination = selectedRole ? selectedRole.value : "customer-dashboard.html";

    if (msg) {
      msg.textContent = "Signed in — redirecting to your dashboard...";
      msg.classList.add("ok");
    }

    // demo-only: no real auth backend, just remember the chosen role for the dashboard greeting
    try {
      sessionStorage.setItem("stackly_role", selectedRole ? selectedRole.closest(".role-option").querySelector("label").textContent.trim() : "Customer");
      sessionStorage.setItem("stackly_email", email.value.trim());
    } catch (err) {}

    setTimeout(() => {
      window.location.href = destination;
    }, 500);
  });
})();
