import { getRazorpayInstance } from "@/lib/razorpay";
import { rooms } from "@/data/site";
import { countOverlaps } from "@/lib/bookings";
import { nightsBetween } from "@/lib/dates";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { roomSlug, checkIn, checkOut, quantity, guest } = req.body || {};

  if (!roomSlug) {
    return res.status(400).json({ error: "roomSlug is required" });
  }
  if (!checkIn || !checkOut) {
    return res
      .status(400)
      .json({ error: "checkIn and checkOut are required" });
  }

  const room = rooms.find((r) => r.slug === roomSlug);
  if (!room) return res.status(404).json({ error: "Room not found" });

  const nights = nightsBetween(String(checkIn), String(checkOut));
  if (nights <= 0) {
    return res
      .status(400)
      .json({ error: "Check-out must be at least one day after check-in" });
  }

  const qty = Math.max(1, parseInt(quantity, 10) || 1);
  const inventory = Number(room.inventory) > 0 ? Number(room.inventory) : 1;
  const booked = countOverlaps(roomSlug, String(checkIn), String(checkOut));
  const remaining = Math.max(0, inventory - booked);

  if (qty > remaining) {
    return res.status(409).json({
      error:
        remaining === 0
          ? "This room is sold out for the selected dates. Please pick different dates."
          : `Only ${remaining} ${room.name.toLowerCase()}${
              remaining === 1 ? "" : "s"
            } left for the selected dates. Reduce the quantity or pick different dates.`,
      remaining,
    });
  }

  if (!guest || !guest.name || !guest.email || !guest.phone) {
    return res
      .status(400)
      .json({ error: "Guest name, email and phone are required" });
  }

  const totalRupees = nights * Number(room.price) * qty;
  const amountPaise = Math.round(totalRupees * 100);

  try {
    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `rcpt_${room.slug}_${Date.now()}`.slice(0, 40),
      notes: {
        roomSlug: room.slug,
        roomName: room.name,
        checkIn: String(checkIn),
        checkOut: String(checkOut),
        nights: String(nights),
        quantity: String(qty),
        guestName: guest.name,
        guestEmail: guest.email,
        guestPhone: guest.phone,
      },
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      nights,
      quantity: qty,
      totalRupees,
      pricePerNight: Number(room.price),
      room: {
        slug: room.slug,
        name: room.name,
        priceLabel: room.priceLabel,
      },
    });
  } catch (err) {
    console.error("Razorpay create-order failed:", err);
    return res
      .status(500)
      .json({ error: err?.error?.description || "Failed to create order" });
  }
}
