import { useState } from "react";
import Head from "next/head";
import { FiSearch, FiEye, FiTrash2, FiEdit2, FiX, FiDollarSign } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";
import { mockPayments } from "@/data/mockAdminData";

const METHODS = ["Cash", "UPI", "Card", "Bank Transfer"];
const PAY_STATUSES = ["Completed", "Pending", "Refunded", "Failed"];

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Refunded: "bg-purple-100 text-purple-700",
  Failed: "bg-red-100 text-red-700",
};

const empty = { bookingId: "", guestName: "", amount: "", date: "", method: "UPI", reference: "", status: "Completed", notes: "" };

export default function AdminPayments() {
  const [payments, setPayments] = useState(mockPayments);
  const [search, setSearch] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [viewPay, setViewPay] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (m, t = "success") => setToast({ message: m, type: t });

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.guestName.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.bookingId.toLowerCase().includes(q);
    const matchMethod = !filterMethod || p.method === filterMethod;
    const matchStatus = !filterStatus || p.status === filterStatus;
    return matchSearch && matchMethod && matchStatus;
  });

  const total = filtered.reduce((s, p) => s + Number(p.amount), 0);

  function openEdit(p) { setForm({ ...p }); setEditId(p.id); setShowModal(true); }

  function handleSave() {
    if (!form.bookingId || !form.amount) { showToast("Booking ID and amount are required.", "error"); return; }
    if (editId) {
      setPayments((prev) => prev.map((p) => (p.id === editId ? { ...form, id: editId } : p)));
      showToast("Payment updated!");
    } else {
      const id = "PAY-" + String(payments.length + 1).padStart(3, "0");
      setPayments((prev) => [...prev, { ...form, id }]);
      showToast("Payment added!");
    }
    setShowModal(false);
  }

  function handleDelete() {
    setPayments((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    showToast("Payment record deleted.", "warning");
  }

  return (
    <>
      <Head><title>Payments – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Payments">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          {[
            { label: "Total Revenue", value: `₹${payments.reduce((s, p) => s + Number(p.amount), 0).toLocaleString()}`, color: "#b8902f" },
            { label: "Completed", value: payments.filter(p => p.status === "Completed").length, color: "#16a34a" },
            { label: "Pending", value: payments.filter(p => p.status === "Pending").length, color: "#d97706" },
            { label: "Refunded", value: payments.filter(p => p.status === "Refunded").length, color: "#7c3aed" },
          ].map((c) => (
            <div key={c.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: c.color }}>
                <FiDollarSign size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{c.label}</p>
                <p className="text-lg font-bold text-gray-800">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by guest, payment ID, or booking ID..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
            />
          </div>
          <select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
            <option value="">All Methods</option>
            {METHODS.map((m) => <option key={m}>{m}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
            <option value="">All Status</option>
            {PAY_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Payment ID", "Booking", "Guest", "Amount", "Date", "Method", "Reference", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-12 text-gray-400">No payments found.</td></tr>
                )}
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{p.id}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{p.bookingId}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{p.guestName}</td>
                    <td className="px-4 py-3 font-bold text-gray-800">₹{Number(p.amount).toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.date}</td>
                    <td className="px-4 py-3 text-gray-600">{p.method}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.reference}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status]}`}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setViewPay(p)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><FiEye size={14} /></button>
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"><FiEdit2 size={14} /></button>
                        <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><FiTrash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              {filtered.length > 0 && (
                <tfoot className="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-xs font-semibold text-gray-600">Total ({filtered.length} records)</td>
                    <td className="px-4 py-3 font-bold text-gray-800">₹{total.toLocaleString()}</td>
                    <td colSpan={5} />
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </AdminLayout>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Edit Payment</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <PF label="Booking ID *" value={form.bookingId} onChange={(v) => setForm({ ...form, bookingId: v })} />
              <PF label="Guest Name" value={form.guestName} onChange={(v) => setForm({ ...form, guestName: v })} />
              <PF label="Amount (₹) *" value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} type="number" />
              <PF label="Payment Date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} type="date" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                  <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    {METHODS.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    {PAY_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <PF label="Transaction Reference" value={form.reference} onChange={(v) => setForm({ ...form, reference: v })} />
              <PF label="Notes" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 text-sm text-white rounded-lg font-medium" style={{ backgroundColor: "#b8902f" }}>Update Payment</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewPay && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">{viewPay.id}</h3>
              <button onClick={() => setViewPay(null)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {[["Booking ID", viewPay.bookingId], ["Guest", viewPay.guestName], ["Amount", `₹${Number(viewPay.amount).toLocaleString()}`], ["Date", viewPay.date], ["Method", viewPay.method], ["Reference", viewPay.reference]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v}</span></div>
              ))}
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[viewPay.status]}`}>{viewPay.status}</span></div>
              {viewPay.notes && <div className="bg-gray-50 rounded-lg p-3 text-gray-600">{viewPay.notes}</div>}
            </div>
            <div className="px-6 pb-6 flex justify-end"><button onClick={() => setViewPay(null)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg">Close</button></div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><FiTrash2 className="text-red-600" size={20} /></div>
            <h3 className="font-semibold text-gray-800 mb-1">Delete Payment Record?</h3>
            <p className="text-sm text-gray-500 mb-5">This cannot be undone.</p>
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

function PF({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
      />
    </div>
  );
}
