import { getAllBookings } from "@/lib/bookings";
import { toAdminPayment } from "@/lib/adminTransforms";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const payments = getAllBookings().map(toAdminPayment);
  return res.status(200).json({ payments });
}
