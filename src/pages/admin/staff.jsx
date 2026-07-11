import { useState } from "react";
import Head from "next/head";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiShield, FiKey } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";
import { mockStaff } from "@/data/mockAdminData";

const ROLES = ["Super Admin", "Manager", "Reception", "Content Editor"];

const empty = { name: "", email: "", phone: "", role: "Reception", status: true };

const roleColors = {
  "Super Admin": "bg-purple-100 text-purple-700",
  Manager: "bg-blue-100 text-blue-700",
  Reception: "bg-green-100 text-green-700",
  "Content Editor": "bg-orange-100 text-orange-700",
};

export default function AdminStaff() {
  const [staff, setStaff] = useState(mockStaff);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState(null);
  const [changePwd, setChangePwd] = useState(null);
  const [newPwd, setNewPwd] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (m, t = "success") => setToast({ message: m, type: t });

  function openAdd() { setForm(empty); setEditId(null); setShowModal(true); }
  function openEdit(s) { setForm({ ...s }); setEditId(s.id); setShowModal(true); }

  function handleSave() {
    if (!form.name || !form.email) { showToast("Name and email are required.", "error"); return; }
    if (editId) {
      setStaff((prev) => prev.map((s) => (s.id === editId ? { ...form, id: editId } : s)));
      showToast("Staff member updated!");
    } else {
      setStaff((prev) => [...prev, { ...form, id: Date.now(), createdAt: new Date().toISOString().split("T")[0] }]);
      showToast("Staff member added!");
    }
    setShowModal(false);
  }

  function toggleActive(id) {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, status: !s.status } : s)));
  }

  function handleDelete() {
    setStaff((prev) => prev.filter((s) => s.id !== deleteId));
    setDeleteId(null);
    showToast("Staff member deleted.", "warning");
  }

  function handleChangePassword() {
    if (!newPwd || newPwd.length < 6) { showToast("Password must be at least 6 characters.", "error"); return; }
    showToast("Password updated successfully!");
    setChangePwd(null);
    setNewPwd("");
  }

  return (
    <>
      <Head><title>Staff – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Staff / Admin Users">
        <div className="flex justify-between items-center mb-5">
          <div className="text-sm text-gray-500">{staff.filter(s => s.status).length} active · {staff.filter(s => !s.status).length} inactive</div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: "#b8902f" }}>
            <FiPlus size={15} /> Add Staff
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["#", "Staff Member", "Contact", "Role", "Status", "Joined", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {staff.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">No staff members found.</td></tr>
                )}
                {staff.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0" style={{ backgroundColor: "#8a5a2b" }}>
                          {s.name.charAt(0)}
                        </div>
                        <p className="font-medium text-gray-800">{s.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600">{s.email}</p>
                      <p className="text-xs text-gray-400">{s.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 w-fit ${roleColors[s.role]}`}>
                        {s.role === "Super Admin" && <FiShield size={10} />}
                        {s.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleActive(s.id)}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {s.status ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{s.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><FiEdit2 size={14} /></button>
                        <button onClick={() => { setChangePwd(s); setNewPwd(""); }} className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100" title="Change Password"><FiKey size={14} /></button>
                        {s.role !== "Super Admin" && (
                          <button onClick={() => setDeleteId(s.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><FiTrash2 size={14} /></button>
                        )}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">{editId ? "Edit Staff Member" : "Add Staff Member"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <SF label="Full Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <SF label="Email Address *" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
              <SF label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  {ROLES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              {!editId && <SF label="Initial Password" value={form.password || ""} onChange={(v) => setForm({ ...form, password: v })} type="password" placeholder="Min 6 characters" />}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="sActive" checked={form.status} onChange={(e) => setForm({ ...form, status: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="sActive" className="text-sm text-gray-700">Active account</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 text-sm text-white rounded-lg font-medium" style={{ backgroundColor: "#b8902f" }}>
                {editId ? "Update" : "Add Staff"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {changePwd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Change Password</h3>
              <button onClick={() => setChangePwd(null)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500">Changing password for <strong>{changePwd.name}</strong></p>
              <SF label="New Password" value={newPwd} onChange={setNewPwd} type="password" placeholder="Min 6 characters" />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setChangePwd(null)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg">Cancel</button>
              <button onClick={handleChangePassword} className="px-5 py-2 text-sm text-white rounded-lg font-medium" style={{ backgroundColor: "#b8902f" }}>Update Password</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><FiTrash2 className="text-red-600" size={20} /></div>
            <h3 className="font-semibold text-gray-800 mb-1">Remove Staff Member?</h3>
            <p className="text-sm text-gray-500 mb-5">This cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">Remove</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SF({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
      />
    </div>
  );
}
