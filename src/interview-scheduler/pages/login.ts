import { loginAdmin } from "../auth";

function onReady(callback: () => void) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }
  callback();
}

function loginErrorMessage(error: unknown) {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";

  switch (code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid admin email or password. Check the Firebase Auth user credentials.";
    case "auth/operation-not-allowed":
      return "Firebase Email/Password authentication is not enabled for this project.";
    case "auth/invalid-api-key":
      return "Firebase API key is invalid. Check PUBLIC_FIREBASE_API_KEY in .env.";
    case "auth/auth-domain-config-required":
    case "auth/unauthorized-domain":
      return "This local domain is not authorized in Firebase Authentication settings.";
    case "auth/network-request-failed":
      return "Firebase network request failed. Check your internet connection and Firebase project status.";
    default:
      return error instanceof Error ? `Firebase login failed: ${error.message}` : "Invalid admin login or Firebase authentication is not configured.";
  }
}

onReady(() => {
  const root = document.querySelector<HTMLElement>("[data-admin-login]");
  const errorBox = document.querySelector<HTMLElement>("[data-login-error]");
  const button = document.querySelector<HTMLButtonElement>("[data-login-button]");
  const emailInput = root?.querySelector<HTMLInputElement>("input[name='email']");
  const passwordInput = root?.querySelector<HTMLInputElement>("input[name='password']");
  (window as Window & { __anthraLoginReady?: boolean }).__anthraLoginReady = true;
  if (button) button.textContent = "Login to Dashboard";

  const submitLogin = async () => {
    if (!root || !button || !errorBox || !emailInput || !passwordInput) return;
    if (!emailInput.reportValidity() || !passwordInput.reportValidity()) return;
    errorBox.textContent = "Connecting to Firebase...";
    button.disabled = true;
    button.textContent = "Signing in...";
    try {
      await loginAdmin(emailInput.value, passwordInput.value);
      const next = new URLSearchParams(window.location.search).get("next") || "/admin/interviews";
      window.location.href = next;
    } catch (error) {
      errorBox.textContent = loginErrorMessage(error);
    } finally {
      button.disabled = false;
      button.textContent = "Login to Dashboard";
    }
  };

  root?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    void submitLogin();
  });

  button?.addEventListener("click", () => {
    void submitLogin();
  });
});
