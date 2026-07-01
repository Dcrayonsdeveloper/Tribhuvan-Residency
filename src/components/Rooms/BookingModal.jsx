"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";
import { FaCalendarAlt, FaUser, FaBed, FaCheckCircle } from "react-icons/fa";
import { toISODate, nightsBetween, formatDisplay } from "@/lib/dates";
import { startRoomCheckout } from "@/lib/razorpayClient";

function todayISO() {
  return toISODate(new Date());
}

function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toISODate(d);
}

export default function BookingModal({
  open,
  onClose,
  room,
  initialCheckIn,
  initialCheckOut,
  initialAdults,
  initialChildren,
}) {
  const [mounted, setMounted] = useState(false);
  const [checkIn, setCheckIn] = useState(initialCheckIn || todayISO());
  const [checkOut, setCheckOut] = useState(initialCheckOut || tomorrowISO());
  const [adults, setAdults] = useState(Number(initialAdults) || 1);
  const [children, setChildren] = useState(Number(initialChildren) || 0);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [availability, setAvailability] = useState(null);
  const [availLoading, setAvailLoading] = useState(false);
  const [availError, setAvailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fetchIdRef = useRef(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setCheckIn(initialCheckIn || todayISO());
    setCheckOut(initialCheckOut || tomorrowISO());
    setAdults(Number(initialAdults) || 1);
    setChildren(Number(initialChildren) || 0);
    setQuantity(1);
    setError("");
  }, [open, initialCheckIn, initialCheckOut, initialAdults, initialChildren]);

  const nights = useMemo(
    () => nightsBetween(checkIn, checkOut),
    [checkIn, checkOut]
  );

  useEffect(() => {
    if (!open || !room?.slug) return;
    if (!checkIn || !checkOut || nights <= 0) {
      setAvailability(null);
      return;
    }
    const myId = ++fetchIdRef.current;
    setAvailLoading(true);
    setAvailError("");
    fetch(
      `/api/razorpay/availability?roomSlug=${encodeURIComponent(
        room.slug
      )}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(
        checkOut
      )}`
    )
      .then(async (r) => {
        const data = await r.json();
        if (myId !== fetchIdRef.current) return;
        if (!r.ok) {
          setAvailability(null);
          setAvailError(data.error || "Could not check availability");
        } else {
          setAvailability(data);
          setQuantity((q) => Math.min(Math.max(1, q), data.remaining || 1));
        }
      })
      .catch(() => {
        if (myId !== fetchIdRef.current) return;
        setAvailError("Could not check availability");
      })
      .finally(() => {
        if (myId === fetchIdRef.current) setAvailLoading(false);
      });
  }, [open, room?.slug, checkIn, checkOut, nights]);

  if (!open || !room) return null;

  const remaining = availability?.remaining ?? room.inventory ?? 1;
  const totalPerUnit = availability?.totalPerUnit ?? nights * Number(room.price);
  const grandTotal = totalPerUnit * quantity;

  const validate = () => {
    if (!checkIn || !checkOut) return "Please pick check-in and check-out dates";
    if (nights <= 0) return "Check-out must be after check-in";
    if (quantity < 1) return "Choose at least 1 room";
    if (availability && quantity > availability.remaining)
      return `Only ${availability.remaining} left for these dates`;
    if (!name.trim()) return "Enter guest name";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email";
    if (!/^\+?\d[\d\s-]{6,}$/.test(phone)) return "Enter a valid phone number";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError("");
    setSubmitting(true);
    startRoomCheckout({
      room,
      checkIn,
      checkOut,
      quantity,
      guest: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        adults,
        children,
      },
      onError: (err) => {
        setSubmitting(false);
        if (err?.message && err.message !== "Payment cancelled") {
          setError(err.message);
        }
      },
    });
  };

  const priceFmt = (n) =>
    Number.isFinite(n)
      ? `₹${n.toLocaleString("en-IN")}`
      : "—";

  const ui = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-5 sm:px-6 pt-5 sm:pt-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-secondary font-semibold">
              Reserve Your Stay
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {room.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {room.priceLabel}{" "}
              <span className="text-gray-400">/ night</span>
              {room.bed && (
                <>
                  {" · "}
                  {room.bed}
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-4xl text-gray-500 hover:text-gray-800 -mt-2"
          >
            <IoIosClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-5 space-y-5">
          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Check-in</span>
              <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded px-3 py-2 focus-within:border-secondary">
                <FaCalendarAlt className="text-secondary shrink-0" />
                <input
                  type="date"
                  value={checkIn}
                  min={todayISO()}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCheckIn(v);
                    if (v && checkOut && v >= checkOut) {
                      const d = new Date(v);
                      d.setDate(d.getDate() + 1);
                      setCheckOut(toISODate(d));
                    }
                  }}
                  className="w-full outline-none bg-transparent text-sm sm:text-base"
                  required
                />
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Check-out</span>
              <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded px-3 py-2 focus-within:border-secondary">
                <FaCalendarAlt className="text-secondary shrink-0" />
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || todayISO()}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full outline-none bg-transparent text-sm sm:text-base"
                  required
                />
              </div>
            </label>
          </div>

          {/* Guests + Rooms */}
          <div className="grid grid-cols-3 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Adults</span>
              <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                <FaUser className="text-secondary shrink-0" />
                <select
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                  className="w-full bg-transparent outline-none text-sm sm:text-base"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Children</span>
              <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                <FaUser className="text-secondary shrink-0" />
                <select
                  value={children}
                  onChange={(e) => setChildren(parseInt(e.target.value, 10))}
                  className="w-full bg-transparent outline-none text-sm sm:text-base"
                >
                  {Array.from({ length: 10 }, (_, i) => i).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Rooms</span>
              <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                <FaBed className="text-secondary shrink-0" />
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  className="w-full bg-transparent outline-none text-sm sm:text-base"
                  disabled={remaining <= 0}
                >
                  {Array.from(
                    { length: Math.max(1, remaining) },
                    (_, i) => i + 1
                  ).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>

          {/* Availability status */}
          <div className="rounded-lg bg-cream border border-secondary/20 p-3 sm:p-4 text-sm">
            {availLoading && <span className="text-gray-600">Checking availability…</span>}
            {!availLoading && availError && (
              <span className="text-red-600">{availError}</span>
            )}
            {!availLoading && !availError && availability && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={
                    availability.remaining > 0
                      ? "text-secondary font-semibold flex items-center gap-2"
                      : "text-red-600 font-semibold"
                  }
                >
                  {availability.remaining > 0 ? (
                    <>
                      <FaCheckCircle /> {availability.remaining} of {availability.inventory} available
                    </>
                  ) : (
                    <>Sold out for these dates</>
                  )}
                </span>
                <span className="text-gray-600">
                  {nights} night{nights !== 1 ? "s" : ""} ·{" "}
                  {formatDisplay(checkIn)} → {formatDisplay(checkOut)}
                </span>
              </div>
            )}
          </div>

          {/* Guest info */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Full Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="As per your ID"
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-secondary text-sm sm:text-base"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Phone</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+91 98xxxxxxxx"
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-secondary text-sm sm:text-base"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-secondary text-sm sm:text-base"
              />
            </label>
          </div>

          {/* Price breakdown */}
          <div className="rounded-lg bg-white border border-gray-200 p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>
                {priceFmt(room.price)} × {nights} night{nights !== 1 ? "s" : ""}
                {" × "}
                {quantity} room{quantity !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-900 font-medium">
                {priceFmt(grandTotal)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total Payable</span>
              <span className="text-xl font-bold text-secondary">
                {priceFmt(grandTotal)}
              </span>
            </div>
          </div>

          {error && (
            <p
              className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={
              submitting ||
              nights <= 0 ||
              (availability && availability.remaining <= 0)
            }
            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              {submitting
                ? "Opening Razorpay…"
                : `Pay ${priceFmt(grandTotal)} & Confirm`}
            </span>
          </button>

          <p className="text-xs text-gray-500 text-center">
            Payments are processed securely by Razorpay. You'll receive a
            confirmation email after payment.
          </p>
        </form>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(ui, document.body);
}
