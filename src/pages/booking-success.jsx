import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Header from "@/components/header/Header1";
import Footer from "@/components/footer/Footer1";

export default function BookingSuccess() {
  const router = useRouter();
  const { paymentId } = router.query;
  const [state, setState] = useState({ loading: true, error: "", booking: null });

  useEffect(() => {
    if (!router.isReady) return;
    if (!paymentId) {
      setState({ loading: false, error: "Missing payment reference.", booking: null });
      return;
    }

    const load = async () => {
      try {
        const res = await fetch(
          `/api/razorpay/booking?paymentId=${encodeURIComponent(String(paymentId))}`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Could not load booking");
        }
        setState({ loading: false, error: "", booking: data.booking });
      } catch (err) {
        setState({ loading: false, error: err.message, booking: null });
      }
    };

    load();
  }, [router.isReady, paymentId]);

  return (
    <div className="bg-cream/40 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-10 text-center">
          {state.loading && (
            <p className="text-gray-600">Loading your booking details…</p>
          )}

          {!state.loading && state.error && (
            <div>
              <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-3" />
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Booking Not Found
              </h1>
              <p className="text-gray-600 mb-6">{state.error}</p>
              <Link href="/rooms">
                <button className="btn-primary">
                  <span>Browse Rooms</span>
                </button>
              </Link>
            </div>
          )}

          {!state.loading && !state.error && state.booking && (
            <div className="text-left sm:text-center">
              <FaCheckCircle className="text-5xl text-secondary mx-auto mb-3" />
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
                Booking Confirmed
              </h1>
              <p className="text-gray-600 mb-6 text-center">
                Thank you for booking with The Tribhuvan Residency. A confirmation
                will be shared with you shortly.
              </p>

              <div className="bg-cream rounded-lg p-5 sm:p-6 space-y-3">
                <Row label="Payment Status">
                  <span className="inline-block bg-secondary/15 text-secondary font-semibold text-xs uppercase tracking-wide px-2 py-1 rounded">
                    {state.booking.status || "Paid"}
                  </span>
                </Row>
                <Row label="Payment ID" value={state.booking.paymentId} mono />
                <Row label="Order ID" value={state.booking.orderId} mono />
                {state.booking.roomName && (
                  <Row label="Room" value={state.booking.roomName} />
                )}
                {state.booking.priceLabel && (
                  <Row
                    label="Amount Paid"
                    value={`${state.booking.priceLabel} / night`}
                  />
                )}
                {state.booking.createdAt && (
                  <Row
                    label="Booked On"
                    value={new Date(state.booking.createdAt).toLocaleString(
                      "en-IN"
                    )}
                  />
                )}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <button className="btn-primary w-full sm:w-auto">
                    <span>Back to Home</span>
                  </button>
                </Link>
                <Link href="/rooms">
                  <button className="btn-gold w-full sm:w-auto">
                    <span>View More Rooms</span>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Row({ label, value, children, mono }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-sm">
      <span className="text-gray-500">{label}</span>
      {children ? (
        <span>{children}</span>
      ) : (
        <span
          className={`text-gray-900 font-medium break-all ${mono ? "font-mono text-xs sm:text-sm" : ""}`}
        >
          {value}
        </span>
      )}
    </div>
  );
}
