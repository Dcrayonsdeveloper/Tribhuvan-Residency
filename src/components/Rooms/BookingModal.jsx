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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !room) return null;

  const ui = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 bg-black/70"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[95vh] sm:h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 shrink-0">
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
            aria-label="Close"
            onClick={onClose}
            className="text-4xl text-gray-500 hover:text-gray-800 shrink-0 ml-3"
          >
            <IoIosClose />
          </button>
        </div>

        <iframe
          src={ASIA_TECH_BOOKING_URL}
          title="Book The Tribhuvan Residency"
          className="w-full flex-1 border-0"
          allow="payment"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="px-4 sm:px-6 py-2 border-t border-gray-200 text-center shrink-0">
          <p className="text-[11px] sm:text-xs text-gray-500">
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
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(ui, document.body);
}
