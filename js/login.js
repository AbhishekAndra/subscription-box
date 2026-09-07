/* =========================================================
   Stackly — Login form: validation + role-based redirect
========================================================= */
(function () {
  "use strict";

  const form = document.getElementById("loginForm");
  if (!form) return;

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);

  /* ---------------- Sign In / Create Account tabs ---------------- */
  const tabLogin = $("#tab-login");
  const tabSignup = $("#tab-signup");
  const loginPane = $("#loginPane");
  const signupPane = $("#signupPane");

  function showTab(which) {
    const isLogin = which === "login";
    tabLogin.classList.toggle("active", isLogin);
    tabSignup.classList.toggle("active", !isLogin);
    tabLogin.setAttribute("aria-selected", String(isLogin));
    tabSignup.setAttribute("aria-selected", String(!isLogin));
    loginPane.hidden = !isLogin;
    signupPane.hidden = isLogin;
  }
  if (tabLogin && tabSignup) {
    tabLogin.addEventListener("click", () => showTab("login"));
    tabSignup.addEventListener("click", () => showTab("signup"));
    document.querySelectorAll("[data-goto-signup]").forEach((a) =>
      a.addEventListener("click", (e) => { e.preventDefault(); showTab("signup"); })
    );
    document.querySelectorAll("[data-goto-login]").forEach((a) =>
      a.addEventListener("click", (e) => { e.preventDefault(); showTab("login"); })
    );
  }

  document.querySelectorAll("[data-toggle-password]").forEach((btn) => {
    const input = btn.closest(".input-icon-group").querySelector("input");
    const eyeOpen = btn.querySelector(".eye-open");
    const eyeClosed = btn.querySelector(".eye-closed");
    btn.addEventListener("click", () => {
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.setAttribute("aria-pressed", String(show));
      btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
      eyeOpen.hidden = show;
      eyeClosed.hidden = !show;
    });
  });

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

  /* ---------------- Create Account form ---------------- */
  const signupForm = $("#signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = $("#su-name");
      const email = $("#su-email");
      const password = $("#su-password");
      const password2 = $("#su-password2");
      const terms = $("#su-terms");
      const msg = $("#signupMsg");
      let ok = true;

      const setError = (input, errorText) => {
        const field = input.closest(".form-field");
        const err = field.querySelector(".field-error");
        field.classList.toggle("invalid", !!errorText);
        if (err) err.textContent = errorText || "";
        if (errorText) ok = false;
      };

      if (!name.value.trim()) setError(name, "Full name is required.");
      else setError(name, "");

      if (!email.value.trim()) setError(email, "Email is required.");
      else if (!validEmail(email.value)) setError(email, "Enter a valid email address.");
      else setError(email, "");

      if (!password.value.trim()) setError(password, "Password is required.");
      else if (!strongPassword(password.value)) setError(password, "Password must be at least 8 characters and include a letter and a number.");
      else setError(password, "");

      if (!password2.value.trim()) setError(password2, "Please confirm your password.");
      else if (password2.value !== password.value) setError(password2, "Passwords don't match.");
      else setError(password2, "");

      if (msg) { msg.textContent = ""; msg.classList.remove("ok"); }

      if (!terms.checked) {
        if (msg) msg.textContent = "Please accept the Terms to continue.";
        ok = false;
      }

      if (!ok) return;

      if (msg) {
        msg.textContent = "Account created — redirecting to your dashboard...";
        msg.classList.add("ok");
      }

      // demo-only: no real auth backend, just remember the new account for the dashboard greeting
      try {
        sessionStorage.setItem("stackly_role", "Customer");
        sessionStorage.setItem("stackly_email", email.value.trim());
        sessionStorage.setItem("stackly_name", name.value.trim());
      } catch (err) {}

      setTimeout(() => {
        window.location.href = "customer-dashboard.html";
      }, 600);
    });
  }
})();
