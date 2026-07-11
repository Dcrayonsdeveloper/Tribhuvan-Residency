import crypto from "crypto";

// Server-side admin session: a signed, HttpOnly cookie. No external deps.
// Credentials and the signing secret come from env (with dev fallbacks).
const SECRET =
  process.env.ADMIN_AUTH_SECRET ||
  "tribhuvan-residency-admin-dev-secret-change-me";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@tribhuvanresidency.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";
const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 12; // 12 hours, in seconds

export const ADMIN_USER = {
  email: ADMIN_EMAIL,
  name: "Tribhuvan Admin",
  role: "Super Admin",
};

export function verifyCredentials(email, password) {
  if (typeof email !== "string" || typeof password !== "string") return false;
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  );
}

function sign(data) {
  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function createSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({ sub: ADMIN_EMAIL, exp: Date.now() + MAX_AGE * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  const expected = sign(payload);
  const a = Buffer.from(sig || "");
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.exp || Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

export function sessionCookie(token) {
  const secure = process.env.NODE_ENV === "production" ? " Secure;" : "";
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${MAX_AGE};${secure}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0;`;
}

export function getSession(req) {
  const raw = req.headers.cookie || "";
  const cookie = raw
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(COOKIE_NAME + "="));
  if (!cookie) return null;
  const token = decodeURIComponent(cookie.slice(COOKIE_NAME.length + 1));
  return verifySessionToken(token);
}

// Guard for /api/admin/* routes: returns true if authorised, else sends 401.
export function requireAdmin(req, res) {
  if (getSession(req)) return true;
  res.status(401).json({ error: "Unauthorized" });
  return false;
}
