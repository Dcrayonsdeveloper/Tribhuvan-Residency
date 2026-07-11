import { getAllBookings } from "@/lib/bookings";
import { getAllInquiries } from "@/lib/inquiries";
import {
  toAdminBooking,
  deriveGuests,
  computeRevenue,
} from "@/lib/adminTransforms";
import { mockRooms, mockOffers } from "@/data/mockAdminData";
import { requireAdmin } from "@/lib/adminSession";

export default function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawBookings = getAllBookings();
  const bookings = rawBookings.map(toAdminBooking);
  const inquiries = getAllInquiries();
  const today = new Date().toISOString().slice(0, 10);

  const stats = {
    // Rooms & offers are CMS content, still sourced from site data.
    totalRooms: mockRooms.length,
    availableRooms: mockRooms.filter((r) => r.status === "Available").length,
    bookedRooms: mockRooms.filter((r) => r.status === "Booked").length,
    activeOffers: mockOffers.filter((o) => o.status).length,
    // The rest come from real website activity.
    pendingBookings: bookings.filter((b) => b.bookingStatus === "Pending").length,
    totalGuests: deriveGuests(rawBookings).length,
    revenue: computeRevenue(rawBookings),
    newInquiries: inquiries.filter((i) => i.status === "New").length,
    totalBookings: bookings.length,
  };

  return res.status(200).json({
    stats,
    recentBookings: bookings.slice(0, 6),
    latestInquiries: inquiries.slice(0, 5),
    todayCheckIns: bookings.filter((b) => b.checkIn === today),
    todayCheckOuts: bookings.filter((b) => b.checkOut === today),
  });
}
