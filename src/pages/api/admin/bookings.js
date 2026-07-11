import { getAllBookings, patchBooking, removeBooking } from "@/lib/bookings";
import { toAdminBooking } from "@/lib/adminTransforms";
import { requireAdmin } from "@/lib/adminSession";

export default function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method === "GET") {
    const bookings = getAllBookings().map(toAdminBooking);
    return res.status(200).json({ bookings });
  }

  if (req.method === "PATCH") {
    const { id, bookingStatus, paymentStatus } = req.body || {};
    if (!id) return res.status(400).json({ error: "id is required" });
    const updated = patchBooking(String(id), { bookingStatus, paymentStatus });
    if (!updated) return res.status(404).json({ error: "Booking not found" });
    return res.status(200).json({ booking: toAdminBooking(updated) });
  }

  if (req.method === "DELETE") {
    const id = req.query.id || (req.body && req.body.id);
    if (!id) return res.status(400).json({ error: "id is required" });
    const ok = removeBooking(String(id));
    if (!ok) return res.status(404).json({ error: "Booking not found" });
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET, PATCH, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
