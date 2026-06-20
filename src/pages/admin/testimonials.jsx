import { useState } from "react";
import Head from "next/head";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiStar } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";
import { mockTestimonials } from "@/data/mockAdminData";

const empty = { name: "", location: "", rating: 5, review: "", photo: "", status: "Pending" };

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (m, t = "success") => setToast({ message: m, type: t });

  const filtered = testimonials.filter((t) => filter === "All" || t.status === filter);

  function openAdd() { setForm(empty); setEditId(null); setShowModal(true); }
  function openEdit(t) { setForm({ ...t }); setEditId(t.id); setShowModal(true); }

  function handleSave() {
    if (!form.name || !form.review) { showToast("Name and review are required.", "error"); return; }
    if (editId) {
      setTestimonials((prev) => prev.map((t) => (t.id === editId ? { ...form, id: editId } : t)));
      showToast("Testimonial updated!");
    } else {
      setTestimonials((prev) => [...prev, { ...form, id: Date.now() }]);
      showToast("Testimonial added!");
    }
    setShowModal(false);
  }

  function updateStatus(id, status) {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    showToast(`Review ${status.toLowerCase()}.`);
  }

  function handleDelete() {
    setTestimonials((prev) => prev.filter((t) => t.id !== deleteId));
    setDeleteId(null);
    showToast("Testimonial deleted.", "warning");
  }

  const statusColors = { Approved: "bg-green-100 text-green-700", Pending: "bg-yellow-100 text-yellow-700", Rejected: "bg-red-100 text-red-700" };

  return (
    <>
      <Head><title>Testimonials – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Testimonials / Reviews">
        <div className="flex flex-wrap gap-2 mb-4">
          {["All", "Approved", "Pending", "Rejected"].map((s) => {
            const count = s === "All" ? testimonials.length : testimonials.filter(t => t.status === s).length;
            return (
              <button key={s} onClick={() => setFilter(s)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${filter === s ? "text-white border-transparent" : "text-gray-600 border-gray-200 bg-white"}`}
                style={filter === s ? { backgroundColor: "#b8902f" } : {}}
              >{s} ({count})</button>
            );
          })}
          <button onClick={openAdd} className="ml-auto flex items-center gap-2 px-4 py-1.5 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: "#b8902f" }}>
            <FiPlus size={14} /> Add Review
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400">No testimonials found.</div>
          )}
          {filtered.map((t) => (
            <div key={t.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0" style={{ backgroundColor: "#8a5a2b" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[t.status]}`}>{t.status}</span>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FiStar key={s} size={13} className={s <= t.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                ))}
              </div>
              <p className="text-sm text-gray-600 italic">"{t.review}"</p>
              <div className="flex gap-2 pt-2 border-t border-gray-50">
                {t.status !== "Approved" && (
                  <button onClick={() => updateStatus(t.id, "Approved")} className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 font-medium">
                    <FiCheck size={11} /> Approve
                  </button>
                )}
                {t.status !== "Rejected" && (
                  <button onClick={() => updateStatus(t.id, "Rejected")} className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium">
                    <FiX size={11} /> Reject
                  </button>
                )}
                <button onClick={() => openEdit(t)} className="ml-auto p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><FiEdit2 size={13} /></button>
                <button onClick={() => setDeleteId(t.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><FiTrash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">{editId ? "Edit Testimonial" : "Add Testimonial"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <TF label="Guest Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <TF label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="e.g. Mumbai, India" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} type="button" onClick={() => setForm({ ...form, rating: s })}
                      className={`text-2xl transition-colors ${s <= form.rating ? "text-yellow-400" : "text-gray-300"}`}>
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <TF label="Review *" value={form.review} onChange={(v) => setForm({ ...form, review: v })} textarea />
              <TF label="Photo URL (optional)" value={form.photo} onChange={(v) => setForm({ ...form, photo: v })} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 text-sm text-white rounded-lg font-medium" style={{ backgroundColor: "#b8902f" }}>
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><FiTrash2 className="text-red-600" size={20} /></div>
            <h3 className="font-semibold text-gray-800 mb-1">Delete Testimonial?</h3>
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

function TF({ label, value, onChange, textarea, placeholder = "" }) {
  const cls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none";
  const f = (e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40");
  const b = (e) => (e.target.style.boxShadow = "");
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={`${cls} resize-none`} placeholder={placeholder} onFocus={f} onBlur={b} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} placeholder={placeholder} onFocus={f} onBlur={b} />
      )}
    </div>
  );
}
