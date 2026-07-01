import { site } from "@/data/site";

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("SSR"));
    if (window.Razorpay) return resolve(window.Razorpay);
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Razorpay));
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Razorpay"))
      );
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(script);
  });
}

export async function startRoomCheckout({
  room,
  checkIn,
  checkOut,
  quantity,
  guest,
  onSuccess,
  onError,
}) {
  try {
    if (!room?.slug) throw new Error("Room is required");
    if (!checkIn || !checkOut)
      throw new Error("Please pick check-in and check-out dates");
    if (!guest?.name || !guest?.email || !guest?.phone)
      throw new Error("Please fill in your name, email and phone");

    const orderRes = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomSlug: room.slug,
        checkIn,
        checkOut,
        quantity: quantity || 1,
        guest,
      }),
    });

    if (!orderRes.ok) {
      const { error } = await orderRes.json().catch(() => ({}));
      throw new Error(error || "Could not create order");
    }

    const order = await orderRes.json();
    const Razorpay = await loadRazorpayScript();

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!keyId) throw new Error("Razorpay key is not configured");

    const rzp = new Razorpay({
      key: keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: site.name,
      description: `${order.quantity} × ${order.room.name} · ${order.nights} night${
        order.nights > 1 ? "s" : ""
      }`,
      image: "/logo.png",
      prefill: {
        name: guest.name,
        email: guest.email,
        contact: guest.phone,
      },
      theme: { color: "#8a5a2b" },
      handler: async (response) => {
        try {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              roomSlug: room.slug,
              checkIn,
              checkOut,
              quantity: order.quantity,
              guest,
            }),
          });
          const data = await verifyRes.json();
          if (!verifyRes.ok || !data.verified) {
            throw new Error(data.error || "Payment verification failed");
          }
          if (onSuccess) onSuccess(data.booking);
          else {
            window.location.href = `/booking-success?paymentId=${encodeURIComponent(
              response.razorpay_payment_id
            )}`;
          }
        } catch (err) {
          if (onError) onError(err);
          else alert(err.message || "Payment verification failed");
        }
      },
      modal: {
        ondismiss: () => {
          if (onError) onError(new Error("Payment cancelled"));
        },
      },
    });

    rzp.on("payment.failed", (event) => {
      const msg =
        event?.error?.description || "Payment failed. Please try again.";
      if (onError) onError(new Error(msg));
      else alert(msg);
    });

    rzp.open();
  } catch (err) {
    if (onError) onError(err);
    else alert(err.message || "Could not start payment");
  }
}
