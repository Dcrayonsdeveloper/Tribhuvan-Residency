import fs from "fs";
import path from "path";
import { rangesOverlap } from "./dates";

const BOOKINGS_DIR = path.join(process.cwd(), "bookings");
const BOOKINGS_FILE = path.join(BOOKINGS_DIR, "bookings.json");

function ensureStore() {
  if (!fs.existsSync(BOOKINGS_DIR)) {
    fs.mkdirSync(BOOKINGS_DIR, { recursive: true });
  }
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, "[]", "utf8");
  }
}

function readAll() {
  ensureStore();
  const raw = fs.readFileSync(BOOKINGS_FILE, "utf8");
  try {
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

function writeAll(list) {
  ensureStore();
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(list, null, 2), "utf8");
  return list;
}

export function saveBooking(booking) {
  const list = readAll();
  list.push(booking);
  writeAll(list);
  return booking;
}

// Admin: list every booking, newest first.
export function getAllBookings() {
  return readAll().sort((a, b) =>
    String(b.createdAt).localeCompare(String(a.createdAt))
  );
}

// Admin: update the mutable status fields on one booking.
const ADMIN_PATCH_FIELDS = ["bookingStatus", "paymentStatus"];
export function patchBooking(paymentId, fields = {}) {
  const list = readAll();
  const idx = list.findIndex((b) => b.paymentId === paymentId);
  if (idx === -1) return null;
  const patch = {};
  for (const key of ADMIN_PATCH_FIELDS) {
    if (fields[key] !== undefined) patch[key] = fields[key];
  }
  list[idx] = { ...list[idx], ...patch };
  writeAll(list);
  return list[idx];
}

// Admin: delete a booking permanently.
export function removeBooking(paymentId) {
  const list = readAll();
  const next = list.filter((b) => b.paymentId !== paymentId);
  if (next.length === list.length) return false;
  writeAll(next);
  return true;
}

export function getBooking(paymentId) {
  return readAll().find((b) => b.paymentId === paymentId) || null;
}

export function getPaidBookingsForRoom(roomSlug) {
  return readAll().filter(
    (b) => b.roomSlug === roomSlug && b.status === "paid"
  );
}

// Count overlapping paid bookings for a room in a given range.
export function countOverlaps(roomSlug, checkIn, checkOut) {
  return getPaidBookingsForRoom(roomSlug).filter((b) =>
    rangesOverlap(b.checkIn, b.checkOut, checkIn, checkOut)
  ).length;
}

// True if there is at least `inventory` unbooked unit(s) for this range.
export function isRoomAvailable(roomSlug, checkIn, checkOut, inventory) {
  const inv = Number(inventory) > 0 ? Number(inventory) : 1;
  return countOverlaps(roomSlug, checkIn, checkOut) < inv;
}
