import { getSession } from "@/lib/adminSession";

export default function handler(req, res) {
  const session = getSession(req);
  if (!session) return res.status(401).json({ authenticated: false });
  return res
    .status(200)
    .json({ authenticated: true, user: { email: session.sub } });
}
