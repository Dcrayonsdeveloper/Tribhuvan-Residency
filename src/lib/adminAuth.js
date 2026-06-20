const ADMIN_CREDENTIALS = {
  email: "admin@tribhuvanresidency.com",
  password: "Admin@123",
};

const ADMIN_USER = {
  id: 1,
  name: "Tribhuvan Admin",
  email: "admin@tribhuvanresidency.com",
  role: "Super Admin",
};

export function login(email, password) {
  if (
    email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    if (typeof window !== "undefined") {
      localStorage.setItem("adminAuth", "true");
      localStorage.setItem("adminUser", JSON.stringify(ADMIN_USER));
      localStorage.setItem("adminLoginTime", new Date().toISOString());
    }
    return { success: true, user: ADMIN_USER };
  }
  return { success: false, error: "Invalid email or password. Please try again." };
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminLoginTime");
  }
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("adminAuth") === "true";
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
