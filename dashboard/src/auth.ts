// Credentials are managed via .env
// We trim and lowercase here for consistency
export const TEST_EMAIL = (import.meta.env.VITE_JUDGE_EMAIL || "judge@primer.kr").trim().toLowerCase();
export const TEST_PASSWORD = (import.meta.env.VITE_JUDGE_PASSWORD || "airvent2026").trim();

const KEY = "airvent_auth_v1";

export function isAuthed(): boolean {
  return localStorage.getItem(KEY) === "1";
}

export function login(email: string, password: string): boolean {
  const inputEmail = email.trim().toLowerCase();
  const inputPassword = password.trim();

  const ok = inputEmail === TEST_EMAIL && inputPassword === TEST_PASSWORD;

  if (ok) {
    localStorage.setItem(KEY, "1");
  }
  return ok;
}

export function logout(): void {
  localStorage.removeItem(KEY);
}
