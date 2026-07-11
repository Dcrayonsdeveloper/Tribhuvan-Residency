import { useState, useEffect } from "react";
import Head from "next/head";
import { FiSearch, FiEye, FiTrash2, FiX, FiCheck } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";

const statusColors = {
  New: "bg-blue-100 text-blue-700",
  Replied: "bg-green-100 text-green-700",
  Closed: "bg-gray-100 text-gray-600",
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [viewInq, setViewInq] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (m, t = "success") => setToast({ message: m, type: t });

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then((r) => r.json())
      .then((d) => setInquiries(d.inquiries || []))
      .catch(() => setToast({ message: "Could not load inquiries.", type: "error" }))
      .finally(() => setLoading(false));
  }, []);

  const filtered = inquiries.filter((inq) => {
    const matchFilter = filter === "All" || inq.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || inq.name.toLowerCase().includes(q) || inq.subject.toLowerCase().includes(q) || inq.email.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  async function updateStatus(id, status) {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      setViewInq((v) => (v ? { ...v, status } : v));
      showToast(`Inquiry marked as ${status}.`);
    } catch {
      showToast("Could not update inquiry.", "error");
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`/api/admin/inquiries?id=${encodeURIComponent(deleteId)}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setInquiries((prev) => prev.filter((i) => i.id !== deleteId));
      showToast("Inquiry deleted.", "warning");
    } catch {
      showToast("Could not delete inquiry.", "error");
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <>
      <Head><title>Inquiries – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Contact / Inquiry Management">
        {/* Status filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          {["All", "New", "Replied", "Closed"].map((s) => {
            const count = s === "All" ? inquiries.length : inquiries.filter(i => i.status === s).length;
            return (
              <button key={s} onClick={() => setFilter(s)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${filter === s ? "text-white border-transparent" : "text-gray-600 border-gray-200 bg-white"}`}
                style={filter === s ? { backgroundColor: "#b8902f" } : {}}
              >
                {s} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative mb-5 max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search inquiries..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
            onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["ID", "Name", "Contact", "Subject", "Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">{loading ? "Loading inquiries…" : "No inquiries found."}</td></tr>
                )}
                {filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{inq.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{inq.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600">{inq.phone}</p>
                      <p className="text-xs text-gray-400">{inq.email}</p>
                    </td>
                    <td className="px-4 py-3 max-w-[200px]">
                      <p className="text-gray-700 truncate">{inq.subject}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{inq.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[inq.status]}`}>{inq.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setViewInq(inq)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><FiEye size={14} /></button>
                        <button onClick={() => setDeleteId(inq.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><FiTrash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>

      {/* View Modal */}
      {viewInq && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">{viewInq.id} – Inquiry Details</h3>
              <button onClick={() => setViewInq(null)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {[["Name", viewInq.name], ["Phone", viewInq.phone], ["Email", viewInq.email], ["Date", viewInq.date]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v}</span></div>
              ))}
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[viewInq.status]}`}>{viewInq.status}</span></div>
              <div className="pt-2">
                <p className="text-gray-500 text-xs font-medium mb-1">Subject</p>
                <p className="font-semibold text-gray-800">{viewInq.subject}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs font-medium mb-1">Message</p>
                <p className="text-gray-700">{viewInq.message}</p>
              </div>
            </div>
            <div className="px-6 pb-6 flex flex-wrap gap-2">
              {viewInq.status !== "Replied" && (
                <button onClick={() => updateStatus(viewInq.id, "Replied")} className="flex items-center gap-1 text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <FiCheck size={14} /> Mark Replied
                </button>
              )}
              {viewInq.status !== "Closed" && (
                <button onClick={() => updateStatus(viewInq.id, "Closed")} className="text-sm px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                  Mark Closed
                </button>
              )}
              <button onClick={() => setViewInq(null)} className="text-sm px-4 py-2 bg-gray-100 text-gray-600 rounded-lg ml-auto">Close</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><FiTrash2 className="text-red-600" size={20} /></div>
            <h3 className="font-semibold text-gray-800 mb-1">Delete Inquiry?</h3>
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
