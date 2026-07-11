import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { checkAuth } from "@/lib/adminAuth";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children, title = "Dashboard" }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let active = true;
    checkAuth().then((ok) => {
      if (!active) return;
      if (ok) {
        setAuthed(true);
        setChecking(false);
      } else {
        router.replace("/admin");
      }
    });
    return () => {
      active = false;
    };
  }, [router]);

  if (checking || !authed) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
