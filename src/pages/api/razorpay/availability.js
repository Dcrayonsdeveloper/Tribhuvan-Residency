import { rooms } from "@/data/site";
import { countOverlaps } from "@/lib/bookings";
import { nightsBetween } from "@/lib/dates";

export default function handler(req, res) {
  const { roomSlug, checkIn, checkOut } = req.query;

  if (!roomSlug || !checkIn || !checkOut) {
    return res
      .status(400)
      .json({ error: "roomSlug, checkIn and checkOut are required" });
  }

  const room = rooms.find((r) => r.slug === roomSlug);
  if (!room) return res.status(404).json({ error: "Room not found" });

  const nights = nightsBetween(String(checkIn), String(checkOut));
  if (nights <= 0) {
    return res
      .status(400)
      .json({ error: "Check-out must be after check-in" });
  }

  const inventory = Number(room.inventory) > 0 ? Number(room.inventory) : 1;
  const booked = countOverlaps(roomSlug, String(checkIn), String(checkOut));
  const remaining = Math.max(0, inventory - booked);

  return res.status(200).json({
    available: remaining > 0,
    nights,
    inventory,
    booked,
    remaining,
    pricePerNight: Number(room.price),
    priceLabel: room.priceLabel,
    totalPerUnit: nights * Number(room.price),
  });
}
