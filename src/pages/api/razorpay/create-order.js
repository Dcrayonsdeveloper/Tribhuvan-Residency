import { getRazorpayInstance } from "@/lib/razorpay";
import { rooms } from "@/data/site";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { roomSlug } = req.body || {};
  if (!roomSlug) {
    return res.status(400).json({ error: "roomSlug is required" });
  }

  const room = rooms.find((r) => r.slug === roomSlug);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  const amountPaise = Math.round(Number(room.price) * 100);
  if (!Number.isFinite(amountPaise) || amountPaise <= 0) {
    return res.status(400).json({ error: "Invalid room price" });
  }

  try {
    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `rcpt_${room.slug}_${Date.now()}`.slice(0, 40),
      notes: { roomSlug: room.slug, roomName: room.name },
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
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
