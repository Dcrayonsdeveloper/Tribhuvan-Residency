import {
  getAllInquiries,
  patchInquiry,
  removeInquiry,
} from "@/lib/inquiries";
import { requireAdmin } from "@/lib/adminSession";

export default function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method === "GET") {
    return res.status(200).json({ inquiries: getAllInquiries() });
  }

  if (req.method === "PATCH") {
    const { id, status } = req.body || {};
    if (!id || !status) {
      return res.status(400).json({ error: "id and status are required" });
    }
    const updated = patchInquiry(String(id), status);
    if (!updated) {
      return res
        .status(404)
        .json({ error: "Inquiry not found or invalid status" });
    }
    return res.status(200).json({ inquiry: updated });
  }

  if (req.method === "DELETE") {
    const id = req.query.id || (req.body && req.body.id);
    if (!id) return res.status(400).json({ error: "id is required" });
    const ok = removeInquiry(String(id));
    if (!ok) return res.status(404).json({ error: "Inquiry not found" });
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET, PATCH, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
