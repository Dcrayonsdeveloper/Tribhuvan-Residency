"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";

const ASIA_TECH_BOOKING_URL =
  "https://asiatech.in/booking_engine/index3?token=Nzc0Mg==";

export default function BookingModal({ open, onClose, room }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    // Close on Escape (works when the page — not the iframe — has focus).
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !room) return null;

  const ui = (
    // h-screen (100vh) is the fallback; inline 100dvh matches the *visible*
    // mobile viewport so the header/footer never hide behind the browser bars.
    <div
      className="fixed left-0 top-0 w-full h-screen z-[1000] flex items-stretch sm:items-center justify-center p-0 sm:p-4 bg-black/70"
      style={{ height: "100dvh" }}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white w-full h-full sm:h-[92vh] sm:max-w-6xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — pinned to the top of the visible screen; always tappable */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-gray-200 shrink-0">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-secondary font-semibold">
              Reserve Your Stay
            </p>
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-gray-900 truncate">
              {room.name}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close booking window"
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 transition-colors"
          >
            <IoIosClose className="text-4xl" />
          </button>
        </div>

        <iframe
          src={ASIA_TECH_BOOKING_URL}
          title="Book The Tribhuvan Residency"
          className="w-full flex-1 border-0"
          allow="payment"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Footer — pinned to the bottom of the visible screen (with safe-area
            padding so the Close button clears the phone's home indicator) */}
        <div
          className="px-4 sm:px-6 py-3 border-t border-gray-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <p className="order-2 sm:order-1 text-[11px] sm:text-xs text-gray-500 text-center sm:text-left">
            Booking powered by our channel manager. Trouble seeing the form?{" "}
            <a
              href={ASIA_TECH_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-semibold underline"
            >
              Open in a new tab
            </a>
            .
          </p>
          <button
            type="button"
            onClick={onClose}
            className="order-1 sm:order-2 w-full sm:w-auto shrink-0 px-6 py-3 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 active:scale-[0.99] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(ui, document.body);
}
