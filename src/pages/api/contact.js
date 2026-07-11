import { saveInquiry } from "@/lib/inquiries";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, message, subject } = req.body || {};
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email and message are required." });
  }

  try {
    const inquiry = saveInquiry({ name, email, phone, message, subject });
    return res.status(201).json({ ok: true, inquiry });
  } catch (err) {
    console.error("Saving inquiry failed:", err);
    return res.status(500).json({ error: "Could not save your message." });
  }
}
