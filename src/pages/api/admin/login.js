import {
  verifyCredentials,
  createSessionToken,
  sessionCookie,
  ADMIN_USER,
} from "@/lib/adminSession";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please enter both email and password." });
  }
  if (!verifyCredentials(email, password)) {
    return res
      .status(401)
      .json({ error: "Invalid email or password. Please try again." });
  }
  res.setHeader("Set-Cookie", sessionCookie(createSessionToken()));
  return res.status(200).json({ ok: true, user: ADMIN_USER });
}
