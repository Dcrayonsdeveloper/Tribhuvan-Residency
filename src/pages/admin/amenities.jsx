import { useState } from "react";
import Head from "next/head";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";
import { mockAmenities } from "@/data/mockAdminData";

const ICONS = ["wifi", "snowflake", "car", "utensils", "bell", "zap", "shirt", "building", "clock", "briefcase", "coffee", "tv", "phone", "shield", "droplet"];

const empty = { name: "", icon: "star", description: "", status: true };

export default function AdminAmenities() {
  const [amenities, setAmenities] = useState(mockAmenities);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (m, t = "success") => setToast({ message: m, type: t });

  function openAdd() { setForm(empty); setEditId(null); setShowModal(true); }
  function openEdit(a) { setForm({ ...a }); setEditId(a.id); setShowModal(true); }

  function handleSave() {
    if (!form.name) { showToast("Amenity name is required.", "error"); return; }
    if (editId) {
      setAmenities((prev) => prev.map((a) => (a.id === editId ? { ...form, id: editId } : a)));
      showToast("Amenity updated!");
    } else {
      setAmenities((prev) => [...prev, { ...form, id: Date.now() }]);
      showToast("Amenity added!");
    }
    setShowModal(false);
  }

  function toggleStatus(id) {
    setAmenities((prev) => prev.map((a) => (a.id === id ? { ...a, status: !a.status } : a)));
  }

  function handleDelete() {
    setAmenities((prev) => prev.filter((a) => a.id !== deleteId));
    setDeleteId(null);
    showToast("Amenity deleted.", "warning");
  }

  return (
    <>
      <Head><title>Amenities – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Amenities / Services">
        <div className="flex justify-between items-center mb-5">
          <div className="text-sm text-gray-500">{amenities.filter(a => a.status).length} active · {amenities.filter(a => !a.status).length} disabled</div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: "#b8902f" }}>
            <FiPlus size={15} /> Add Amenity
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.map((a) => (
            <div key={a.id} className={`bg-white rounded-xl shadow-sm border p-5 flex items-start gap-4 transition-opacity ${a.status ? "border-gray-100" : "border-gray-100 opacity-60"}`}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 text-lg" style={{ backgroundColor: a.status ? "#b8902f" : "#9ca3af" }}>
                {getIconEmoji(a.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-gray-800 text-sm">{a.name}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${a.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {a.status ? "Active" : "Disabled"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{a.description}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => toggleStatus(a.id)} className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-medium transition-colors ${a.status ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-green-50 text-green-700 hover:bg-green-100"}`}>
                    {a.status ? <FiToggleLeft size={12} /> : <FiToggleRight size={12} />}
                    {a.status ? "Disable" : "Enable"}
                  </button>
                  <button onClick={() => openEdit(a)} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium">
                    <FiEdit2 size={12} /> Edit
                  </button>
                  <button onClick={() => setDeleteId(a.id)} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium">
                    <FiTrash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">{editId ? "Edit Amenity" : "Add Amenity"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <AField label="Amenity Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {ICONS.map((icon) => (
                    <button key={icon} onClick={() => setForm({ ...form, icon })} type="button"
                      className={`w-9 h-9 rounded-lg text-sm flex items-center justify-center border-2 transition-colors ${form.icon === icon ? "border-transparent text-white" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                      style={form.icon === icon ? { backgroundColor: "#b8902f" } : {}}
                      title={icon}
                    >
                      {getIconEmoji(icon)}
                    </button>
                  ))}
                </div>
              </div>
              <AField label="Short Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
              <div className="flex items-center gap-2">
                <input type="checkbox" id="status" checked={form.status} onChange={(e) => setForm({ ...form, status: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="status" className="text-sm text-gray-700">Active (visible on website)</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 text-sm text-white rounded-lg font-medium" style={{ backgroundColor: "#b8902f" }}>
                {editId ? "Update" : "Add Amenity"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><FiTrash2 className="text-red-600" size={20} /></div>
            <h3 className="font-semibold text-gray-800 mb-1">Delete Amenity?</h3>
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

function getIconEmoji(icon) {
  const map = { wifi: "📶", snowflake: "❄️", car: "🚗", utensils: "🍴", bell: "🔔", zap: "⚡", shirt: "👔", building: "🏢", clock: "🕐", briefcase: "💼", coffee: "☕", tv: "📺", phone: "📞", shield: "🛡️", droplet: "💧", star: "⭐" };
  return map[icon] || "✨";
}

function AField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
      />
    </div>
  );
}
