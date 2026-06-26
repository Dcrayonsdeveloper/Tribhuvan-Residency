import fs from "fs";
import path from "path";

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

export function saveBooking(booking) {
  ensureStore();
  const raw = fs.readFileSync(BOOKINGS_FILE, "utf8");
  const list = JSON.parse(raw || "[]");
  list.push(booking);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(list, null, 2), "utf8");
  return booking;
}

export function getBooking(paymentId) {
  ensureStore();
  const raw = fs.readFileSync(BOOKINGS_FILE, "utf8");
  const list = JSON.parse(raw || "[]");
  return list.find((b) => b.paymentId === paymentId) || null;
}
