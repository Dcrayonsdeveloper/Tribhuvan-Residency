import fs from "fs";
import path from "path";

const INQUIRIES_DIR = path.join(process.cwd(), "inquiries");
const INQUIRIES_FILE = path.join(INQUIRIES_DIR, "inquiries.json");

function ensureStore() {
  if (!fs.existsSync(INQUIRIES_DIR)) {
    fs.mkdirSync(INQUIRIES_DIR, { recursive: true });
  }
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, "[]", "utf8");
  }
}

function readAll() {
  ensureStore();
  const raw = fs.readFileSync(INQUIRIES_FILE, "utf8");
  try {
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

function writeAll(list) {
  ensureStore();
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), "utf8");
  return list;
}

// Save a new inquiry submitted from the public website contact form.
export function saveInquiry({ name, email, phone, subject, message }) {
  const list = readAll();
  const now = new Date();
  const inquiry = {
    id: "INQ-" + now.getTime().toString(36).toUpperCase(),
    name: name || "",
    email: email || "",
    phone: phone || "",
    subject: subject || "Website Contact Form",
    message: message || "",
    date: now.toISOString().slice(0, 10),
    createdAt: now.toISOString(),
    status: "New",
  };
  list.push(inquiry);
  writeAll(list);
  return inquiry;
}

// Admin: list every inquiry, newest first.
export function getAllInquiries() {
  return readAll().sort((a, b) =>
    String(b.createdAt).localeCompare(String(a.createdAt))
  );
}

const ALLOWED_STATUS = ["New", "Replied", "Closed"];

// Admin: change an inquiry's status.
export function patchInquiry(id, status) {
  if (!ALLOWED_STATUS.includes(status)) return null;
  const list = readAll();
  const idx = list.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], status };
  writeAll(list);
  return list[idx];
}

// Admin: delete an inquiry permanently.
export function removeInquiry(id) {
  const list = readAll();
  const next = list.filter((i) => i.id !== id);
  if (next.length === list.length) return false;
  writeAll(next);
  return true;
}
