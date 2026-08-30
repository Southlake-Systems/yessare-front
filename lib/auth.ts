// lib/auth.ts — simple cookie-based JWT session for the admin panel.
// Note: the token cookie is readable by JS (not httpOnly). Acceptable for this
// internal panel; the Django API is the real authorization boundary.

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const TOKEN_COOKIE = "yessare_token";
const ROLE_COOKIE = "yessare_role";
const USER_COOKIE = "yessare_user";
const MAX_AGE = 60 * 60 * 12; // 12h, matches ACCESS_TOKEN_LIFETIME

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

export type AuthSession = {
  token: string;
  role: "admin" | "viewer";
  username: string;
};

export async function login(
  username: string,
  password: string
): Promise<AuthSession> {
  const res = await fetch(`${BASE_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const detail =
      res.status === 401
        ? "Invalid username or password"
        : `Login failed (${res.status})`;
    throw new Error(detail);
  }

  const data = await res.json();
  writeCookie(TOKEN_COOKIE, data.access);
  writeCookie(ROLE_COOKIE, data.role);
  writeCookie(USER_COOKIE, data.username);
  return { token: data.access, role: data.role, username: data.username };
}

export function logout() {
  deleteCookie(TOKEN_COOKIE);
  deleteCookie(ROLE_COOKIE);
  deleteCookie(USER_COOKIE);
}

export function getToken(): string | null {
  return readCookie(TOKEN_COOKIE);
}

export function getRole(): "admin" | "viewer" | null {
  const r = readCookie(ROLE_COOKIE);
  return r === "admin" || r === "viewer" ? r : null;
}

export function getUser(): string | null {
  return readCookie(USER_COOKIE);
}
