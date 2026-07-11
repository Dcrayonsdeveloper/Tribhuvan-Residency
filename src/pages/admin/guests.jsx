import { useState, useEffect } from "react";
import Head from "next/head";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiEye, FiStar } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";

const ID_TYPES = ["Aadhar Card", "Passport", "Driving License", "PAN Card", "Voter ID"];

const empty = {
  name: "", phone: "", email: "", address: "", idType: "Aadhar Card",
  idNumber: "", stays: 0, lastBooking: "", vip: false, notes: "",
};

export default function AdminGuests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [viewGuest, setViewGuest] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (m, t = "success") => setToast({ message: m, type: t });

  useEffect(() => {
    fetch("/api/admin/guests")
      .then((r) => r.json())
      .then((d) => setGuests(d.guests || []))
      .catch(() => setToast({ message: "Could not load guests.", type: "error" }))
      .finally(() => setLoading(false));
  }, []);

  const filtered = guests.filter((g) => {
    const q = search.toLowerCase();
    return !q || g.name.toLowerCase().includes(q) || g.phone.includes(q) || g.email.toLowerCase().includes(q);
  });

  function openAdd() {
    setForm(empty);
    setEditId(null);
    setShowModal(true);
  }

  function openEdit(g) {
    setForm({ ...g });
    setEditId(g.id);
    setShowModal(true);
  }

  function handleSave() {
    if (!form.name || !form.phone) {
      showToast("Name and phone are required.", "error");
      return;
    }
    if (editId) {
      setGuests((prev) => prev.map((g) => (g.id === editId ? { ...form, id: editId } : g)));
      showToast("Guest updated successfully!");
    } else {
      setGuests((prev) => [...prev, { ...form, id: Date.now() }]);
      showToast("Guest added successfully!");
    }
    setShowModal(false);
  }

  function handleDelete() {
    setGuests((prev) => prev.filter((g) => g.id !== deleteId));
    setDeleteId(null);
    showToast("Guest deleted.", "warning");
  }

  function getGuestBookings(guest) {
    return guest?.bookings || [];
  }

  return (
    <>
      <Head><title>Guests – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Guests / Customers">
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search guests..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
            />
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: "#b8902f" }}>
            <FiPlus size={15} /> Add Guest
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["#", "Guest", "Phone / Email", "ID Proof", "Stays", "VIP", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">{loading ? "Loading guests…" : "No guests found."}</td></tr>
                )}
                {filtered.map((g, idx) => (
                  <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0" style={{ backgroundColor: "#8a5a2b" }}>
                          {g.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{g.name}</p>
                          <p className="text-xs text-gray-400">{g.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-700">{g.phone}</p>
                      <p className="text-xs text-gray-400">{g.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600 text-xs">{g.idType}</p>
                      <p className="text-gray-400 text-xs">{g.idNumber}</p>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700 font-medium">{g.stays}</td>
                    <td className="px-4 py-3">
                      {g.vip && (
                        <span className="flex items-center gap-1 text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full w-fit">
                          <FiStar size={10} /> VIP
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setViewGuest(g)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><FiEye size={14} /></button>
                        <button onClick={() => openEdit(g)} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"><FiEdit2 size={14} /></button>
                        <button onClick={() => setDeleteId(g.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><FiTrash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">{editId ? "Edit Guest" : "Add New Guest"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <GField label="Full Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <GField label="Phone *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <GField label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
                <GField label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">ID Proof Type</label>
                  <select value={form.idType} onChange={(e) => setForm({ ...form, idType: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    {ID_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <GField label="ID Proof Number" value={form.idNumber} onChange={(v) => setForm({ ...form, idNumber: v })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
                <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none" placeholder="Special requests or notes..." />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="vip" checked={form.vip} onChange={(e) => setForm({ ...form, vip: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="vip" className="text-sm text-gray-700">Mark as VIP Guest</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 text-sm text-white rounded-lg font-medium" style={{ backgroundColor: "#b8902f" }}>
                {editId ? "Update Guest" : "Add Guest"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Guest modal */}
      {viewGuest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Guest Profile</h3>
              <button onClick={() => setViewGuest(null)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0" style={{ backgroundColor: "#8a5a2b" }}>
                  {viewGuest.name.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">{viewGuest.name}</p>
                  {viewGuest.vip && <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">⭐ VIP Guest</span>}
                  <p className="text-sm text-gray-500 mt-0.5">{viewGuest.address}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm mb-5">
                {[["Phone", viewGuest.phone], ["Email", viewGuest.email], ["ID Type", viewGuest.idType], ["ID Number", viewGuest.idNumber], ["Total Stays", viewGuest.stays], ["Last Booking", viewGuest.lastBooking || "N/A"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v}</span></div>
                ))}
              </div>
              {viewGuest.notes && (
                <div className="bg-amber-50 rounded-lg p-3 text-sm text-amber-800 mb-4">
                  <strong>Notes:</strong> {viewGuest.notes}
                </div>
              )}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Booking History</h4>
                {getGuestBookings(viewGuest).length === 0 ? (
                  <p className="text-sm text-gray-400">No bookings found.</p>
                ) : (
                  <div className="space-y-2">
                    {getGuestBookings(viewGuest).map((b) => (
                      <div key={b.id} className="flex justify-between items-center text-xs bg-gray-50 rounded-lg px-3 py-2">
                        <span className="font-mono text-gray-600">{b.id}</span>
                        <span className="text-gray-700">{b.room}</span>
                        <span className="text-gray-500">{b.checkIn} → {b.checkOut}</span>
                        <span className="font-medium">₹{b.totalAmount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="px-6 pb-6 flex justify-end gap-3">
              <button onClick={() => { setViewGuest(null); openEdit(viewGuest); }} className="px-4 py-2 text-sm text-white rounded-lg" style={{ backgroundColor: "#b8902f" }}>Edit Guest</button>
              <button onClick={() => setViewGuest(null)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><FiTrash2 className="text-red-600" size={20} /></div>
            <h3 className="font-semibold text-gray-800 mb-1">Delete Guest?</h3>
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

function GField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
      />
    </div>
  );
}
