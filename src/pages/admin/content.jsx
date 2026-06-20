import { useState } from "react";
import Head from "next/head";
import { FiSave, FiHome, FiInfo, FiCheckCircle, FiPhone, FiInstagram } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import Toast from "@/components/admin/Toast";
import { mockContent } from "@/data/mockAdminData";

const TABS = [
  { id: "hero", label: "Homepage Hero", icon: <FiHome /> },
  { id: "about", label: "About Section", icon: <FiInfo /> },
  { id: "whyUs", label: "Why Choose Us", icon: <FiCheckCircle /> },
  { id: "contact", label: "Contact Info", icon: <FiPhone /> },
  { id: "footer", label: "Footer", icon: <FiInstagram /> },
];

export default function AdminContent() {
  const [tab, setTab] = useState("hero");
  const [content, setContent] = useState(mockContent);
  const [toast, setToast] = useState(null);

  const showToast = (m, t = "success") => setToast({ message: m, type: t });

  function update(section, key, value) {
    setContent((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  }

  function save() {
    showToast("Content saved successfully!");
  }

  return (
    <>
      <Head><title>Content – Tribhuvan Residency Admin</title></Head>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AdminLayout title="Website Content Management">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tab nav */}
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

          {/* Content area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {tab === "hero" && (
                <Section title="Homepage Hero">
                  <CF label="Heading" value={content.hero.heading} onChange={(v) => update("hero", "heading", v)} />
                  <CF label="Subheading" value={content.hero.subheading} onChange={(v) => update("hero", "subheading", v)} textarea />
                  <CF label="CTA Button Text" value={content.hero.ctaText} onChange={(v) => update("hero", "ctaText", v)} />
                  <CF label="CTA Link" value={content.hero.ctaLink} onChange={(v) => update("hero", "ctaLink", v)} placeholder="/rooms" />
                  <CF label="Hero Image URL" value={content.hero.heroImage} onChange={(v) => update("hero", "heroImage", v)} />
                </Section>
              )}

              {tab === "about" && (
                <Section title="About Section">
                  <CF label="Title" value={content.about.title} onChange={(v) => update("about", "title", v)} />
                  <CF label="Description" value={content.about.description} onChange={(v) => update("about", "description", v)} textarea />
                  <CF label="Image URL" value={content.about.image} onChange={(v) => update("about", "image", v)} />
                </Section>
              )}

              {tab === "whyUs" && (
                <Section title="Why Choose Us">
                  <CF label="Section Title" value={content.whyChooseUs.title} onChange={(v) => update("whyChooseUs", "title", v)} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                    <textarea
                      rows={6}
                      value={content.whyChooseUs.features.join("\n")}
                      onChange={(e) => update("whyChooseUs", "features", e.target.value.split("\n").filter(Boolean))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none"
                      onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40")} onBlur={(e) => (e.target.style.boxShadow = "")}
                    />
                    <p className="text-xs text-gray-400 mt-1">Enter each feature on a new line.</p>
                  </div>
                </Section>
              )}

              {tab === "contact" && (
                <Section title="Contact Information">
                  <CF label="Hotel Address" value={content.contactInfo.address} onChange={(v) => update("contactInfo", "address", v)} />
                  <CF label="Phone Number" value={content.contactInfo.phone} onChange={(v) => update("contactInfo", "phone", v)} />
                  <CF label="WhatsApp Number" value={content.contactInfo.whatsapp} onChange={(v) => update("contactInfo", "whatsapp", v)} />
                  <CF label="Email Address" value={content.contactInfo.email} onChange={(v) => update("contactInfo", "email", v)} />
                  <CF label="Google Maps Embed URL" value={content.contactInfo.mapEmbed} onChange={(v) => update("contactInfo", "mapEmbed", v)} textarea />
                </Section>
              )}

              {tab === "footer" && (
                <Section title="Footer Content">
                  <CF label="About Text" value={content.footer.aboutText} onChange={(v) => update("footer", "aboutText", v)} textarea />
                  <CF label="Facebook URL" value={content.footer.facebook} onChange={(v) => update("footer", "facebook", v)} />
                  <CF label="Instagram URL" value={content.footer.instagram} onChange={(v) => update("footer", "instagram", v)} />
                  <CF label="YouTube URL" value={content.footer.youtube} onChange={(v) => update("footer", "youtube", v)} />
                  <CF label="Copyright Text" value={content.footer.copyright} onChange={(v) => update("footer", "copyright", v)} />
                </Section>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button onClick={save} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: "#b8902f" }}>
                  <FiSave size={15} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function CF({ label, value, onChange, textarea, placeholder = "" }) {
  const cls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none";
  const focusStyle = (e) => (e.target.style.boxShadow = "0 0 0 2px #b8902f40");
  const blurStyle = (e) => (e.target.style.boxShadow = "");
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={`${cls} resize-none`} placeholder={placeholder} onFocus={focusStyle} onBlur={blurStyle} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} placeholder={placeholder} onFocus={focusStyle} onBlur={blurStyle} />
      )}
    </div>
  );
}
