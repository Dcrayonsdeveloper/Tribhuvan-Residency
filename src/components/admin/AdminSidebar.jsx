import Link from "next/link";
import { useRouter } from "next/router";
import { logout } from "@/lib/adminAuth";
import {
  FiGrid, FiHome, FiCalendar, FiUsers, FiEdit3, FiImage,
  FiStar, FiTag, FiMessageSquare, FiMail, FiCreditCard,
  FiUserCheck, FiSettings, FiLogOut, FiX,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", icon: <FiGrid />, href: "/admin/dashboard" },
  { label: "Rooms", icon: <FiHome />, href: "/admin/rooms" },
  { label: "Bookings", icon: <FiCalendar />, href: "/admin/bookings" },
  { label: "Guests", icon: <FiUsers />, href: "/admin/guests" },
  { label: "Content", icon: <FiEdit3 />, href: "/admin/content" },
  { label: "Gallery", icon: <FiImage />, href: "/admin/gallery" },
  { label: "Amenities", icon: <FiStar />, href: "/admin/amenities" },
  { label: "Offers", icon: <FiTag />, href: "/admin/offers" },
  { label: "Testimonials", icon: <FiMessageSquare />, href: "/admin/testimonials" },
  { label: "Inquiries", icon: <FiMail />, href: "/admin/inquiries" },
  { label: "Payments", icon: <FiCreditCard />, href: "/admin/payments" },
  { label: "Staff", icon: <FiUserCheck />, href: "/admin/staff" },
  { label: "Settings", icon: <FiSettings />, href: "/admin/settings" },
];

export default function AdminSidebar({ open, onClose }) {
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/admin");
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 flex flex-col
          bg-[#1e293b] text-white
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: "#b8902f" }}
            >
              T
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">Tribhuvan</p>
              <p className="text-[10px] text-gray-400 leading-tight">Residency Admin</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {navItems.map((item) => {
            const active = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
                style={active ? { backgroundColor: "#b8902f" } : {}}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 border-t border-white/10 pt-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors w-full"
          >
            <FiLogOut className="text-base" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
