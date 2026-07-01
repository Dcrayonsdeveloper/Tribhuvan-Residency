export function toISODate(d) {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseISODate(s) {
  if (!s) return null;
  const [y, m, d] = String(s).split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function nightsBetween(checkInISO, checkOutISO) {
  const a = parseISODate(checkInISO);
  const b = parseISODate(checkOutISO);
  if (!a || !b) return 0;
  const ms = b.getTime() - a.getTime();
  const nights = Math.round(ms / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 0;
}

export function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  const a1 = parseISODate(aStart);
  const a2 = parseISODate(aEnd);
  const b1 = parseISODate(bStart);
  const b2 = parseISODate(bEnd);
  if (!a1 || !a2 || !b1 || !b2) return false;
  return a1 < b2 && b1 < a2;
}

export function formatDisplay(iso) {
  const d = parseISODate(iso);
  if (!d) return iso || "";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
