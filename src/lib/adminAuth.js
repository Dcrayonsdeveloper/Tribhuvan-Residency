// Client-side admin auth helpers. The REAL gate is the HttpOnly server session
// cookie set by /api/admin/login; localStorage here only holds the display
// user so the header can show a name. Never trust it for access control.

export async function login(email, password) {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      return {
        success: false,
        error: data.error || "Invalid email or password. Please try again.",
      };
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      localStorage.setItem("adminLoginTime", new Date().toISOString());
    }
    return { success: true, user: data.user };
  } catch {
    return { success: false, error: "Could not reach the server. Please try again." };
  }
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminLoginTime");
    // keepalive so the request completes even as we navigate away.
    try {
      fetch("/api/admin/logout", { method: "POST", keepalive: true });
    } catch {
      /* ignore */
    }
  }
}

// Confirm the session with the server (authoritative).
export async function checkAuth() {
  try {
    const res = await fetch("/api/admin/me");
    return res.ok;
  } catch {
    return false;
  }
}

export function getAdminUser() {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem("adminUser");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function getLoginTime() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminLoginTime");
}

// Fast client-side hint only (not a security check).
export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("adminUser") != null;
}
