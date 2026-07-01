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

export function saveBooking(booking) {
  ensureStore();
  const list = readAll();
  list.push(booking);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(list, null, 2), "utf8");
  return booking;
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
