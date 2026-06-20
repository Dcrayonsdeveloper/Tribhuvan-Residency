import { useState } from "react";
import Head from "next/head";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiTag } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";
import { mockOffers } from "@/data/mockAdminData";

const empty = {
  title: "", subtitle: "", description: "", discountType: "Percentage",
  discountValue: "", promoCode: "", startDate: "", endDate: "", bannerImage: "", status: true,
};

export default function AdminOffers() {
  const [offers, setOffers] = useState(mockOffers);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (m, t = "success") => setToast({ message: m, type: t });

  function openAdd() { setForm(empty); setEditId(null); setShowModal(true); }
  function openEdit(o) { setForm({ ...o }); setEditId(o.id); setShowModal(true); }

  function handleSave() {
    if (!form.title || !form.discountValue) { showToast("Title and discount value are required.", "error"); return; }
    if (editId) {
      setOffers((prev) => prev.map((o) => (o.id === editId ? { ...form, id: editId, discountValue: Number(form.discountValue) } : o)));
      showToast("Offer updated!");
    } else {
      setOffers((prev) => [...prev, { ...form, id: Date.now(), discountValue: Number(form.discountValue) }]);
      showToast("Offer added!");
    }
    setShowModal(false);
  }

  function toggleStatus(id) {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, status: !o.status } : o)));
  }

  function handleDelete() {
    setOffers((prev) => prev.filter((o) => o.id !== deleteId));
    setDeleteId(null);
    showToast("Offer deleted.", "warning");
  }

  return (
    <>
      <Head><title>Offers – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Offers / Promotions">
        <div className="flex justify-between items-center mb-5">
          <div className="text-sm text-gray-500">{offers.filter(o => o.status).length} active · {offers.filter(o => !o.status).length} inactive</div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: "#b8902f" }}>
            <FiPlus size={15} /> Add Offer
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((o) => (
            <div key={o.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${!o.status ? "opacity-60" : ""}`}>
              <div className="h-2" style={{ backgroundColor: o.status ? "#b8902f" : "#9ca3af" }} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{o.title}</p>
                    <p className="text-xs text-gray-500">{o.subtitle}</p>
                  </div>
                  <span className={`text-lg font-bold flex-shrink-0 ${o.status ? "text-[#b8902f]" : "text-gray-400"}`}>
                    {o.discountType === "Percentage" ? `${o.discountValue}%` : `₹${o.discountValue}`}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{o.description}</p>
                <div className="flex flex-wrap gap-2 text-xs mb-3">
                  {o.promoCode && (
                    <span className="bg-amber-50 text-amber-700 font-mono font-bold px-2 py-0.5 rounded border border-amber-200">
                      {o.promoCode}
                    </span>
                  )}
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{o.startDate} – {o.endDate}</span>
                </div>
                <div className="flex gap-2 pt-3 border-t border-gray-50">
                  <button onClick={() => toggleStatus(o.id)}
                    className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${o.status ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-green-50 text-green-700 hover:bg-green-100"}`}>
                    {o.status ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => openEdit(o)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><FiEdit2 size={13} /></button>
                  <button onClick={() => setDeleteId(o.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><FiTrash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">{editId ? "Edit Offer" : "Add Offer"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <OF label="Offer Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
              <OF label="Subtitle" value={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} />
              <OF label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    <option>Percentage</option>
                    <option>Fixed</option>
                  </select>
                </div>
                <OF label={`Discount Value ${form.discountType === "Percentage" ? "(%)" : "(₹)"} *`} value={form.discountValue} onChange={(v) => setForm({ ...form, discountValue: v })} type="number" />
              </div>
              <OF label="Promo Code" value={form.promoCode} onChange={(v) => setForm({ ...form, promoCode: v.toUpperCase() })} placeholder="e.g. SUMMER25" />
              <div className="grid grid-cols-2 gap-4">
                <OF label="Start Date" value={form.startDate} onChange={(v) => setForm({ ...form, startDate: v })} type="date" />
                <OF label="End Date" value={form.endDate} onChange={(v) => setForm({ ...form, endDate: v })} type="date" />
              </div>
              <OF label="Banner Image URL" value={form.bannerImage} onChange={(v) => setForm({ ...form, bannerImage: v })} />
              <div className="flex items-center gap-2">
                <input type="checkbox" id="offerStatus" checked={form.status} onChange={(e) => setForm({ ...form, status: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="offerStatus" className="text-sm text-gray-700">Active (visible on website)</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 text-sm text-white rounded-lg font-medium" style={{ backgroundColor: "#b8902f" }}>
                {editId ? "Update Offer" : "Add Offer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><FiTrash2 className="text-red-600" size={20} /></div>
            <h3 className="font-semibold text-gray-800 mb-1">Delete Offer?</h3>
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

function OF({ label, value, onChange, type = "text", textarea, placeholder = "" }) {
  const cls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none";
  const f = (e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40");
  const b = (e) => (e.target.style.boxShadow = "");
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={`${cls} resize-none`} placeholder={placeholder} onFocus={f} onBlur={b} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls} placeholder={placeholder} onFocus={f} onBlur={b} />
      )}
    </div>
  );
}
