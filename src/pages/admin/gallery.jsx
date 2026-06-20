import { useState } from "react";
import Head from "next/head";
import { FiPlus, FiTrash2, FiEdit2, FiX, FiSearch, FiImage } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";
import { mockGallery } from "@/data/mockAdminData";

const CATEGORIES = ["All", "Rooms", "Exterior", "Interior", "Lobby", "Restaurant", "Events", "General"];

const empty = { title: "", alt: "", category: "General", url: "" };

export default function AdminGallery() {
  const [images, setImages] = useState(mockGallery);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (m, t = "success") => setToast({ message: m, type: t });

  const filtered = images.filter((img) => {
    const matchCat = category === "All" || img.category === category;
    const q = search.toLowerCase();
    const matchSearch = !q || img.title.toLowerCase().includes(q) || img.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  function openAdd() {
    setForm(empty);
    setEditId(null);
    setShowModal(true);
  }

  function openEdit(img) {
    setForm({ ...img });
    setEditId(img.id);
    setShowModal(true);
  }

  function handleSave() {
    if (!form.title || !form.url) {
      showToast("Title and Image URL are required.", "error");
      return;
    }
    if (editId) {
      setImages((prev) => prev.map((img) => (img.id === editId ? { ...form, id: editId } : img)));
      showToast("Image updated successfully!");
    } else {
      setImages((prev) => [...prev, { ...form, id: Date.now() }]);
      showToast("Image added successfully!");
    }
    setShowModal(false);
  }

  function handleDelete() {
    setImages((prev) => prev.filter((img) => img.id !== deleteId));
    setDeleteId(null);
    showToast("Image deleted.", "warning");
  }

  return (
    <>
      <Head><title>Gallery – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Gallery Management">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${category === c ? "text-white border-transparent" : "text-gray-600 border-gray-200 bg-white hover:bg-gray-50"}`}
              style={category === c ? { backgroundColor: "#b8902f" } : {}}
            >
              {c} {c !== "All" ? `(${images.filter(i => i.category === c).length})` : `(${images.length})`}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search images..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
            />
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium ml-auto" style={{ backgroundColor: "#b8902f" }}>
            <FiPlus size={15} /> Add Image
          </button>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FiImage size={48} className="mx-auto mb-3 opacity-30" />
            <p>No images found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((img) => (
              <div key={img.id} className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 relative overflow-hidden cursor-pointer" onClick={() => setPreview(img)}>
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-xs font-medium">View</span>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-800 truncate">{img.title}</p>
                  <span className="text-[10px] text-gray-400">{img.category}</span>
                </div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(img)} className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center text-blue-600 hover:bg-blue-50">
                    <FiEdit2 size={10} />
                  </button>
                  <button onClick={() => setDeleteId(img.id)} className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center text-red-600 hover:bg-red-50">
                    <FiTrash2 size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminLayout>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">{editId ? "Edit Image" : "Add New Image"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <GF label="Image Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
              <GF label="Image URL *" value={form.url} onChange={(v) => setForm({ ...form, url: v })} placeholder="https://... or /images/..." />
              <GF label="Alt Text" value={form.alt} onChange={(v) => setForm({ ...form, alt: v })} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  {CATEGORIES.filter(c => c !== "All").map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              {form.url && (
                <div className="border border-gray-100 rounded-lg overflow-hidden h-40">
                  <img src={form.url} alt="preview" className="w-full h-full object-cover" onError={(e) => (e.target.style.display = "none")} />
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 text-sm text-white rounded-lg font-medium" style={{ backgroundColor: "#b8902f" }}>
                {editId ? "Update" : "Add Image"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <p className="text-white font-medium">{preview.title}</p>
              <button onClick={() => setPreview(null)} className="text-white/70 hover:text-white"><FiX size={24} /></button>
            </div>
            <img src={preview.url} alt={preview.alt} className="w-full max-h-[70vh] object-contain rounded-xl" />
            <p className="text-gray-400 text-sm mt-2 text-center">{preview.category} · {preview.alt}</p>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><FiTrash2 className="text-red-600" size={20} /></div>
            <h3 className="font-semibold text-gray-800 mb-1">Delete Image?</h3>
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

function GF({ label, value, onChange, placeholder = "" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
      />
    </div>
  );
}
