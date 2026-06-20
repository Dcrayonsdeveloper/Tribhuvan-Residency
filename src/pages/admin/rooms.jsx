import { useState } from "react";
import Head from "next/head";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiStar, FiX, FiCheck } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";
import { mockRooms } from "@/data/mockAdminData";

const ROOM_TYPES = ["Standard", "Deluxe", "Suite", "Royal Suite", "Family", "Single"];
const BED_TYPES = ["Single Bed", "Double Bed", "King Bed", "Queen Bed", "Twin Beds", "King Bed + Sofa Bed", "2 Double Beds", "King Bed + Twin Beds"];
const STATUS_OPTIONS = ["Available", "Booked", "Maintenance"];
const AMENITY_OPTIONS = ["AC", "Free WiFi", "LED TV", "Hot Water", "Mini Fridge", "Mini Bar", "Full Bar", "Bathtub", "Jacuzzi", "Room Service", "Butler Service", "Daily Housekeeping", "Balcony", "Private Terrace"];

const empty = {
  name: "", roomNumber: "", type: "Standard", price: "", discountPrice: "",
  maxGuests: 2, bedType: "Double Bed", size: "", floor: "",
  shortDescription: "", description: "", amenities: [], images: [], status: "Available", featured: false,
};

const statusColors = {
  Available: "bg-green-100 text-green-700",
  Booked: "bg-blue-100 text-blue-700",
  Maintenance: "bg-orange-100 text-orange-700",
};

export default function AdminRooms() {
  const [rooms, setRooms] = useState(mockRooms);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => setToast({ message, type });

  const filtered = rooms.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.roomNumber.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
    const matchType = !filterType || r.type === filterType;
    const matchStatus = !filterStatus || r.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  function openAdd() {
    setForm(empty);
    setEditId(null);
    setShowModal(true);
  }

  function openEdit(room) {
    setForm({ ...room });
    setEditId(room.id);
    setShowModal(true);
  }

  function handleSave() {
    if (!form.name || !form.roomNumber || !form.price) {
      showToast("Name, room number, and price are required.", "error");
      return;
    }
    if (editId) {
      setRooms((prev) => prev.map((r) => (r.id === editId ? { ...form, id: editId } : r)));
      showToast("Room updated successfully!");
    } else {
      const newRoom = { ...form, id: Date.now(), price: Number(form.price), discountPrice: form.discountPrice ? Number(form.discountPrice) : null };
      setRooms((prev) => [...prev, newRoom]);
      showToast("Room added successfully!");
    }
    setShowModal(false);
  }

  function handleDelete() {
    setRooms((prev) => prev.filter((r) => r.id !== deleteId));
    setDeleteId(null);
    showToast("Room deleted.", "warning");
  }

  function toggleFeatured(id) {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, featured: !r.featured } : r)));
  }

  function toggleStatus(id) {
    setRooms((prev) => prev.map((r) => {
      if (r.id !== id) return r;
      const next = r.status === "Available" ? "Maintenance" : "Available";
      return { ...r, status: next };
    }));
  }

  function toggleAmenity(a) {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));
  }

  return (
    <>
      <Head><title>Rooms – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Rooms Management">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rooms..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")}
              onBlur={(e) => (e.target.style.boxShadow = "")}
            />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none text-gray-600">
            <option value="">All Types</option>
            {ROOM_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none text-gray-600">
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium whitespace-nowrap" style={{ backgroundColor: "#b8902f" }}>
            <FiPlus size={15} /> Add Room
          </button>
        </div>

        {/* Summary badges */}
        <div className="flex gap-3 mb-4">
          {STATUS_OPTIONS.map((s) => {
            const count = rooms.filter((r) => r.status === s).length;
            return (
              <span key={s} className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[s]}`}>
                {s}: {count}
              </span>
            );
          })}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["#", "Room", "Type", "Price", "Capacity", "Status", "Featured", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-12 text-gray-400">No rooms found.</td></tr>
                )}
                {filtered.map((r, idx) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{r.name}</p>
                      <p className="text-xs text-gray-400">Room #{r.roomNumber} · {r.floor}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{r.type}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">₹{Number(r.price).toLocaleString()}</p>
                      {r.discountPrice && <p className="text-xs text-green-600">Offer: ₹{Number(r.discountPrice).toLocaleString()}</p>}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{r.maxGuests} guests</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleStatus(r.id)} className={`text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer ${statusColors[r.status]}`}>
                        {r.status}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleFeatured(r.id)} className={`text-lg ${r.featured ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-400 transition-colors`}>
                        <FiStar />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"><FiEdit2 size={14} /></button>
                        <button onClick={() => setDeleteId(r.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><FiTrash2 size={14} /></button>
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">{editId ? "Edit Room" : "Add New Room"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Room Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="Room Number *" value={form.roomNumber} onChange={(v) => setForm({ ...form, roomNumber: v })} />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Room Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    {ROOM_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Bed Type</label>
                  <select value={form.bedType} onChange={(e) => setForm({ ...form, bedType: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    {BED_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <Field label="Price / Night (₹) *" value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" />
                <Field label="Discount Price (₹)" value={form.discountPrice || ""} onChange={(v) => setForm({ ...form, discountPrice: v })} type="number" />
                <Field label="Max Guests" value={form.maxGuests} onChange={(v) => setForm({ ...form, maxGuests: Number(v) })} type="number" />
                <Field label="Room Size" value={form.size} onChange={(v) => setForm({ ...form, size: v })} placeholder="e.g. 350 sq ft" />
                <Field label="Floor" value={form.floor} onChange={(v) => setForm({ ...form, floor: v })} placeholder="e.g. 2nd Floor" />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Short Description</label>
                <input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITY_OPTIONS.map((a) => (
                    <button key={a} type="button" onClick={() => toggleAmenity(a)}
                      className={`text-xs px-3 py-1 rounded-full border font-medium transition-colors ${form.amenities.includes(a) ? "text-white border-transparent" : "text-gray-600 border-gray-200 hover:border-gray-400"}`}
                      style={form.amenities.includes(a) ? { backgroundColor: "#b8902f", borderColor: "#b8902f" } : {}}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="featured" className="text-sm text-gray-700">Mark as Featured Room</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 text-sm text-white rounded-lg font-medium" style={{ backgroundColor: "#b8902f" }}>
                {editId ? "Update Room" : "Add Room"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><FiTrash2 className="text-red-600" size={20} /></div>
            <h3 className="font-semibold text-gray-800 mb-1">Delete Room?</h3>
            <p className="text-sm text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")}
        onBlur={(e) => (e.target.style.boxShadow = "")}
      />
    </div>
  );
}
