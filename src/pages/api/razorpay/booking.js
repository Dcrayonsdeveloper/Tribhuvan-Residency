import { getBooking } from "@/lib/bookings";

export default function handler(req, res) {
  const { paymentId } = req.query;
  if (!paymentId) {
    return res.status(400).json({ error: "paymentId is required" });
  }
  const booking = getBooking(String(paymentId));
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  return res.status(200).json({ booking });
}
