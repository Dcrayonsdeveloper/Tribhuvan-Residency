import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { FiHome, FiCalendar, FiUsers, FiDollarSign, FiMail, FiTag, FiCheckCircle, FiClock, FiPlus, FiImage } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";

const EMPTY = {
  stats: {
    totalRooms: 0, availableRooms: 0, bookedRooms: 0, activeOffers: 0,
    pendingBookings: 0, totalGuests: 0, revenue: 0, newInquiries: 0, totalBookings: 0,
  },
  recentBookings: [],
  latestInquiries: [],
  todayCheckIns: [],
  todayCheckOuts: [],
};

const statusColors = {
  Confirmed: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  "Checked-in": "bg-green-100 text-green-700",
  "Checked-out": "bg-gray-100 text-gray-600",
  Cancelled: "bg-red-100 text-red-700",
};

const payColors = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Partial: "bg-orange-100 text-orange-700",
  Refunded: "bg-purple-100 text-purple-700",
};

const inqColors = {
  New: "bg-blue-100 text-blue-700",
  Replied: "bg-green-100 text-green-700",
  Closed: "bg-gray-100 text-gray-600",
};

export default function Dashboard() {
  const [data, setData] = useState(EMPTY);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setData({ ...EMPTY, ...d, stats: { ...EMPTY.stats, ...(d.stats || {}) } }))
      .catch(() => {});
  }, []);

  const { stats, recentBookings, latestInquiries, todayCheckIns, todayCheckOuts } = data;

  const cards = [
    { title: "Total Rooms", value: stats.totalRooms, icon: <FiHome />, color: "#8a5a2b" },
    { title: "Available Rooms", value: stats.availableRooms, icon: <FiCheckCircle />, color: "#16a34a", sub: `${stats.totalRooms - stats.availableRooms} occupied` },
    { title: "Pending Bookings", value: stats.pendingBookings, icon: <FiClock />, color: "#d97706" },
    { title: "Total Guests", value: stats.totalGuests, icon: <FiUsers />, color: "#2563eb" },
    { title: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: <FiDollarSign />, color: "#b8902f" },
    { title: "New Inquiries", value: stats.newInquiries, icon: <FiMail />, color: "#7c3aed" },
    { title: "Active Offers", value: stats.activeOffers, icon: <FiTag />, color: "#db2777" },
    { title: "Total Bookings", value: stats.totalBookings, icon: <FiCalendar />, color: "#0891b2" },
  ];

  return (
    <>
      <Head><title>Dashboard – Tribhuvan Residency Admin</title></Head>
      <AdminLayout title="Dashboard">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {cards.map((c) => (
            <StatCard key={c.title} {...c} />
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Add Room", href: "/admin/rooms", icon: <FiPlus /> },
              { label: "View Bookings", href: "/admin/bookings", icon: <FiCalendar /> },
              { label: "Add Gallery Image", href: "/admin/gallery", icon: <FiImage /> },
              { label: "Add Offer", href: "/admin/offers", icon: <FiTag /> },
            ].map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#b8902f" }}
              >
                {a.icon}
                {a.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Today check-ins */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FiCheckCircle className="text-green-500" /> Today's Check-ins ({todayCheckIns.length})
            </h2>
            {todayCheckIns.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No check-ins today</p>
            ) : (
              <ul className="space-y-2">
                {todayCheckIns.map((b) => (
                  <li key={b.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700 font-medium">{b.guestName}</span>
                    <span className="text-gray-500 text-xs">{b.room}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Today check-outs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FiClock className="text-orange-500" /> Today's Check-outs ({todayCheckOuts.length})
            </h2>
            {todayCheckOuts.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No check-outs today</p>
            ) : (
              <ul className="space-y-2">
                {todayCheckOuts.map((b) => (
                  <li key={b.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700 font-medium">{b.guestName}</span>
                    <span className="text-gray-500 text-xs">{b.room}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Latest inquiries */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-700">Latest Inquiries</h2>
              <Link href="/admin/inquiries" className="text-xs" style={{ color: "#b8902f" }}>View all</Link>
            </div>
            {latestInquiries.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No inquiries yet</p>
            ) : (
              <ul className="space-y-3">
                {latestInquiries.map((inq) => (
                  <li key={inq.id} className="border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-gray-700 truncate">{inq.name}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${inqColors[inq.status]}`}>{inq.status}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{inq.subject}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent bookings table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-xs font-medium" style={{ color: "#b8902f" }}>View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Booking ID", "Guest", "Room", "Check-in", "Check-out", "Amount", "Payment", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-12 text-gray-400">No bookings yet</td></tr>
                )}
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{b.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{b.guestName}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{b.room}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{b.checkIn}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{b.checkOut}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">₹{Number(b.totalAmount).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${payColors[b.paymentStatus]}`}>{b.paymentStatus}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[b.bookingStatus]}`}>{b.bookingStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
