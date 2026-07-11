// Pure mappers: turn stored booking records (bookings.json) into the shapes
// the admin panel screens expect. Kept side-effect free so API routes can reuse.

// One stored booking -> one admin "Bookings" row.
export function toAdminBooking(b) {
  return {
    id: b.paymentId,
    guestId: b.guest?.email || b.paymentId,
    guestName: b.guest?.name || "Guest",
    phone: b.guest?.phone || "",
    email: b.guest?.email || "",
    room: b.roomName || b.roomSlug || "—",
    checkIn: b.checkIn || "",
    checkOut: b.checkOut || "",
    // Website bookings capture rooms booked (quantity), not head-count.
    guests: b.quantity || 1,
    nights: b.nights || 0,
    totalAmount: Number(b.totalAmount) || 0,
    paymentStatus: b.paymentStatus || (b.status === "paid" ? "Paid" : "Pending"),
    bookingStatus: b.bookingStatus || "Confirmed",
    createdAt: String(b.createdAt || "").slice(0, 10),
  };
}

// One stored booking -> one admin "Payments" row (every stored booking is paid).
export function toAdminPayment(b) {
  return {
    id: b.paymentId,
    bookingId: b.paymentId,
    guestName: b.guest?.name || "Guest",
    amount: Number(b.totalAmount) || 0,
    date: String(b.createdAt || "").slice(0, 10),
    method: "Razorpay",
    reference: b.paymentId,
    status: b.paymentStatus === "Refunded" ? "Refunded" : "Completed",
    notes: `${b.quantity || 1} × ${b.roomName || "room"}`,
  };
}

// All bookings -> unique guests (keyed by email, then phone), with stay history.
export function deriveGuests(bookings) {
  const map = new Map();
  for (const b of bookings) {
    const email = b.guest?.email || "";
    const phone = b.guest?.phone || "";
    const key = email || phone || b.paymentId;
    const dateStr = String(b.createdAt || "").slice(0, 10);
    if (!map.has(key)) {
      map.set(key, {
        id: key,
        name: b.guest?.name || "Guest",
        phone,
        email,
        address: "",
        idType: "",
        idNumber: "",
        stays: 0,
        lastBooking: "",
        vip: false,
        notes: "",
        bookings: [],
      });
    }
    const g = map.get(key);
    g.stays += 1;
    if (dateStr > g.lastBooking) g.lastBooking = dateStr;
    g.bookings.push({
      id: b.paymentId,
      room: b.roomName || b.roomSlug || "—",
      checkIn: b.checkIn || "",
      checkOut: b.checkOut || "",
      totalAmount: Number(b.totalAmount) || 0,
    });
  }
  const guests = Array.from(map.values());
  for (const g of guests) g.vip = g.stays >= 3;
  return guests;
}

// Total revenue from bookings, excluding anything marked refunded.
export function computeRevenue(bookings) {
  return bookings
    .filter((b) => b.paymentStatus !== "Refunded")
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
}
