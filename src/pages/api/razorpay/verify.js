import { verifyPaymentSignature } from "@/lib/razorpay";
import { saveBooking } from "@/lib/bookings";
import { rooms } from "@/data/site";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    roomSlug,
    guest,
  } = req.body || {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing payment fields" });
  }

  const ok = verifyPaymentSignature({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (!ok) {
    return res.status(400).json({ error: "Invalid payment signature" });
  }

  const room = rooms.find((r) => r.slug === roomSlug) || null;

  const booking = {
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    roomSlug: roomSlug || null,
    roomName: room?.name || null,
    priceLabel: room?.priceLabel || null,
    amount: room?.price || null,
    currency: "INR",
    guest: guest || null,
    status: "paid",
    createdAt: new Date().toISOString(),
  };

  try {
    saveBooking(booking);
  } catch (err) {
    console.error("Saving booking failed:", err);
  }

  return res.status(200).json({ verified: true, booking });
}
