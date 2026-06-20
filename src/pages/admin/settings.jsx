import { useState } from "react";
import Head from "next/head";
import { FiSave, FiHome, FiSearch, FiShare2, FiCalendar, FiShield } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";
import { mockSettings } from "@/data/mockAdminData";

const TABS = [
  { id: "hotel", label: "Hotel Info", icon: <FiHome /> },
  { id: "seo", label: "SEO Settings", icon: <FiSearch /> },
  { id: "social", label: "Social Links", icon: <FiShare2 /> },
  { id: "booking", label: "Booking Settings", icon: <FiCalendar /> },
  { id: "security", label: "Admin Security", icon: <FiShield /> },
];

export default function AdminSettings() {
  const [tab, setTab] = useState("hotel");
  const [settings, setSettings] = useState(mockSettings);
  const [toast, setToast] = useState(null);
  const [pwd, setPwd] = useState({ current: "", newPwd: "", confirm: "" });

  const showToast = (m, t = "success") => setToast({ message: m, type: t });

  function update(section, key, value) {
    setSettings((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  }

  function save() {
    showToast("Settings saved successfully!");
  }

  function changePwd() {
    if (!pwd.current || !pwd.newPwd) { showToast("All password fields are required.", "error"); return; }
    if (pwd.newPwd !== pwd.confirm) { showToast("New passwords do not match.", "error"); return; }
    if (pwd.newPwd.length < 6) { showToast("Password must be at least 6 characters.", "error"); return; }
    showToast("Password updated successfully!");
    setPwd({ current: "", newPwd: "", confirm: "" });
  }

  return (
    <>
      <Head><title>Settings – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Settings">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs nav */}
          <aside className="lg:w-52 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-left transition-colors border-b border-gray-50 last:border-0 ${tab === t.id ? "text-white" : "text-gray-600 hover:bg-gray-50"}`}
                  style={tab === t.id ? { backgroundColor: "#b8902f" } : {}}
                >
                  <span className="text-base">{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {tab === "hotel" && (
                <SettingSection title="Hotel Information">
                  <SF2 label="Hotel Name" value={settings.hotel.name} onChange={(v) => update("hotel", "name", v)} />
                  <SF2 label="Logo URL" value={settings.hotel.logo} onChange={(v) => update("hotel", "logo", v)} />
                  <SF2 label="Favicon URL" value={settings.hotel.favicon} onChange={(v) => update("hotel", "favicon", v)} />
                  <SF2 label="Description" value={settings.hotel.description} onChange={(v) => update("hotel", "description", v)} textarea />
                  <SF2 label="Address" value={settings.hotel.address} onChange={(v) => update("hotel", "address", v)} />
                  <SF2 label="Phone" value={settings.hotel.phone} onChange={(v) => update("hotel", "phone", v)} />
                  <SF2 label="Email" value={settings.hotel.email} onChange={(v) => update("hotel", "email", v)} />
                  <div className="grid grid-cols-2 gap-4">
                    <SF2 label="Check-in Time" value={settings.hotel.checkInTime} onChange={(v) => update("hotel", "checkInTime", v)} type="time" />
                    <SF2 label="Check-out Time" value={settings.hotel.checkOutTime} onChange={(v) => update("hotel", "checkOutTime", v)} type="time" />
                  </div>
                </SettingSection>
              )}

              {tab === "seo" && (
                <SettingSection title="SEO Settings">
                  <SF2 label="Meta Title" value={settings.seo.metaTitle} onChange={(v) => update("seo", "metaTitle", v)} />
                  <SF2 label="Meta Description" value={settings.seo.metaDescription} onChange={(v) => update("seo", "metaDescription", v)} textarea />
                  <SF2 label="Keywords (comma separated)" value={settings.seo.keywords} onChange={(v) => update("seo", "keywords", v)} />
                  <SF2 label="Open Graph Image URL" value={settings.seo.ogImage} onChange={(v) => update("seo", "ogImage", v)} />
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
                    Meta title should be 50–60 characters. Description should be 150–160 characters.
                  </div>
                </SettingSection>
              )}

              {tab === "social" && (
                <SettingSection title="Social Links">
                  <SF2 label="Facebook URL" value={settings.social.facebook} onChange={(v) => update("social", "facebook", v)} placeholder="https://facebook.com/..." />
                  <SF2 label="Instagram URL" value={settings.social.instagram} onChange={(v) => update("social", "instagram", v)} placeholder="https://instagram.com/..." />
                  <SF2 label="WhatsApp Number" value={settings.social.whatsapp} onChange={(v) => update("social", "whatsapp", v)} placeholder="+977 9800000000" />
                  <SF2 label="YouTube URL" value={settings.social.youtube} onChange={(v) => update("social", "youtube", v)} placeholder="https://youtube.com/..." />
                  <SF2 label="Google Business URL" value={settings.social.googleBusiness} onChange={(v) => update("social", "googleBusiness", v)} />
                </SettingSection>
              )}

              {tab === "booking" && (
                <SettingSection title="Booking Settings">
                  <div className="grid grid-cols-2 gap-4">
                    <SF2 label="Room Tax (%)" value={settings.booking.roomTax} onChange={(v) => update("booking", "roomTax", Number(v))} type="number" />
                    <SF2 label="Service Charge (%)" value={settings.booking.serviceCharge} onChange={(v) => update("booking", "serviceCharge", Number(v))} type="number" />
                    <SF2 label="Advance Booking Amount (%)" value={settings.booking.advanceAmount} onChange={(v) => update("booking", "advanceAmount", Number(v))} type="number" />
                  </div>
                  <SF2 label="Cancellation Policy" value={settings.booking.cancellationPolicy} onChange={(v) => update("booking", "cancellationPolicy", v)} textarea />
                </SettingSection>
              )}

              {tab === "security" && (
                <div>
                  <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Admin Security</h2>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5 text-sm text-amber-800">
                    <strong>Current Admin:</strong> admin@tribhuvanresidency.com
                  </div>
                  <div className="space-y-4 max-w-sm">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input type="password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                        onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input type="password" value={pwd.newPwd} onChange={(e) => setPwd({ ...pwd, newPwd: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                        onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input type="password" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                        onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
                      />
                    </div>
                    <button onClick={changePwd} className="px-5 py-2.5 text-sm text-white rounded-lg font-medium" style={{ backgroundColor: "#b8902f" }}>
                      Update Password
                    </button>
                  </div>
                </div>
              )}

              {tab !== "security" && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button onClick={save} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: "#b8902f" }}>
                    <FiSave size={15} /> Save Settings
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

function SettingSection({ title, children }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SF2({ label, value, onChange, type = "text", textarea, placeholder = "" }) {
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
