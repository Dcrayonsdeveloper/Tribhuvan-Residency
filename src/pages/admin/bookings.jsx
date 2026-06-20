import { useState } from "react";
import Head from "next/head";
import { FiSearch, FiEye, FiTrash2, FiX, FiCheck, FiCalendar, FiFilter } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";
import { mockBookings } from "@/data/mockAdminData";

const BOOKING_STATUSES = ["Pending", "Confirmed", "Checked-in", "Checked-out", "Cancelled"];
const PAYMENT_STATUSES = ["Pending", "Paid", "Partial", "Refunded"];

const bookingColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
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

export default function AdminBookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPayment, setFilterPayment] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [viewBooking, setViewBooking] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (m, t = "success") => setToast({ message: m, type: t });

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch = !q || b.guestName.toLowerCase().includes(q) || b.phone.includes(q) || b.id.toLowerCase().includes(q);
    const matchStatus = !filterStatus || b.bookingStatus === filterStatus;
    const matchPay = !filterPayment || b.paymentStatus === filterPayment;
    const matchDate = !filterDate || b.checkIn === filterDate;
    return matchSearch && matchStatus && matchPay && matchDate;
  });

  function updateStatus(id, newStatus) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, bookingStatus: newStatus } : b)));
    showToast(`Booking ${newStatus.toLowerCase()} successfully!`);
    setViewBooking((v) => v ? { ...v, bookingStatus: newStatus } : v);
  }

  function updatePayment(id, newPay) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, paymentStatus: newPay } : b)));
    showToast(`Payment status updated to ${newPay}.`);
    setViewBooking((v) => v ? { ...v, paymentStatus: newPay } : v);
  }

  function handleDelete() {
    setBookings((prev) => prev.filter((b) => b.id !== deleteId));
    setDeleteId(null);
    showToast("Booking deleted.", "warning");
  }

  return (
    <>
      <Head><title>Bookings – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Bookings Management">
        {/* Status badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {BOOKING_STATUSES.map((s) => {
            const count = bookings.filter((b) => b.bookingStatus === s).length;
            return (
              <button key={s} onClick={() => setFilterStatus(filterStatus === s ? "" : s)}
                className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${filterStatus === s ? "border-transparent text-white" : "border-gray-200 text-gray-600 bg-white"}`}
                style={filterStatus === s ? { backgroundColor: "#b8902f" } : {}}
              >
                {s}: {count}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by guest name, phone, or booking ID..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")}
              onBlur={(e) => (e.target.style.boxShadow = "")}
            />
          </div>
          <select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none text-gray-600">
            <option value="">All Payments</option>
            {PAYMENT_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none text-gray-600" />
          {(search || filterStatus || filterPayment || filterDate) && (
            <button onClick={() => { setSearch(""); setFilterStatus(""); setFilterPayment(""); setFilterDate(""); }}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 px-3 py-2 border border-gray-200 rounded-lg">
              <FiX size={14} /> Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["ID", "Guest", "Room", "Check-in", "Check-out", "Guests", "Amount", "Payment", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 && (
                  <tr><td colSpan={10} className="text-center py-12 text-gray-400">No bookings found.</td></tr>
                )}
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">{b.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-medium text-gray-800">{b.guestName}</p>
                      <p className="text-xs text-gray-400">{b.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{b.room}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{b.checkIn}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{b.checkOut}</td>
                    <td className="px-4 py-3 text-gray-600 text-center">{b.guests}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">₹{b.totalAmount.toLocaleString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <select value={b.paymentStatus} onChange={(e) => updatePayment(b.id, e.target.value)}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium border-0 cursor-pointer ${payColors[b.paymentStatus]}`}>
                        {PAYMENT_STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <select value={b.bookingStatus} onChange={(e) => updateStatus(b.id, e.target.value)}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium border-0 cursor-pointer ${bookingColors[b.bookingStatus]}`}>
                        {BOOKING_STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setViewBooking(b)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><FiEye size={14} /></button>
                        <button onClick={() => setDeleteId(b.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><FiTrash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
            Showing {filtered.length} of {bookings.length} bookings
          </div>
        </div>
      </AdminLayout>

      {/* View detail modal */}
      {viewBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Booking Details – {viewBooking.id}</h3>
              <button onClick={() => setViewBooking(null)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {[
                ["Guest Name", viewBooking.guestName],
                ["Phone", viewBooking.phone],
                ["Email", viewBooking.email],
                ["Room", viewBooking.room],
                ["Check-in", viewBooking.checkIn],
                ["Check-out", viewBooking.checkOut],
                ["Nights", viewBooking.nights],
                ["Guests", viewBooking.guests],
                ["Total Amount", `₹${viewBooking.totalAmount.toLocaleString()}`],
                ["Booked On", viewBooking.createdAt],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium text-gray-800">{v}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="text-gray-500">Payment</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${payColors[viewBooking.paymentStatus]}`}>{viewBooking.paymentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${bookingColors[viewBooking.bookingStatus]}`}>{viewBooking.bookingStatus}</span>
              </div>
            </div>
            <div className="px-6 pb-6 flex flex-wrap gap-2">
              {viewBooking.bookingStatus === "Pending" && (
                <button onClick={() => updateStatus(viewBooking.id, "Confirmed")} className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <FiCheck className="inline mr-1" size={14} /> Confirm
                </button>
              )}
              {viewBooking.bookingStatus === "Confirmed" && (
                <button onClick={() => updateStatus(viewBooking.id, "Checked-in")} className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Check In
                </button>
              )}
              {viewBooking.bookingStatus === "Checked-in" && (
                <button onClick={() => updateStatus(viewBooking.id, "Checked-out")} className="text-sm px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                  Check Out
                </button>
              )}
              {!["Cancelled", "Checked-out"].includes(viewBooking.bookingStatus) && (
                <button onClick={() => updateStatus(viewBooking.id, "Cancelled")} className="text-sm px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Cancel
                </button>
              )}
              <button onClick={() => setViewBooking(null)} className="text-sm px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 ml-auto">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><FiTrash2 className="text-red-600" size={20} /></div>
            <h3 className="font-semibold text-gray-800 mb-1">Delete Booking?</h3>
            <p className="text-sm text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
