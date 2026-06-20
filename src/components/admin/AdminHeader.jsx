import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FiMenu, FiBell, FiLogOut, FiChevronDown } from "react-icons/fi";
import { getAdminUser, logout } from "@/lib/adminAuth";

export default function AdminHeader({ title, onMenuClick }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    setUser(getAdminUser());
  }, []);

  function handleLogout() {
    logout();
    router.replace("/admin");
  }

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm h-16 flex items-center px-4 md:px-6 gap-4">
      {/* Hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
      >
        <FiMenu size={22} />
      </button>

      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-800 flex-1 truncate">{title}</h1>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100">
          <FiBell size={20} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: "#b8902f" }}
          />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropOpen(!dropOpen)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: "#8a5a2b" }}
            >
              {user?.name?.charAt(0) || "A"}
            </div>
            <span className="hidden md:inline font-medium">{user?.name || "Admin"}</span>
            <FiChevronDown size={14} />
          </button>

          {dropOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <FiLogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
