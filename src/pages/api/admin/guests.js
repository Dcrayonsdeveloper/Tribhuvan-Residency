import { getAllBookings } from "@/lib/bookings";
import { deriveGuests } from "@/lib/adminTransforms";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const guests = deriveGuests(getAllBookings());
  return res.status(200).json({ guests });
}
