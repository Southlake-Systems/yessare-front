"use client";

import Link from "next/link"; // Use Link instead of router.push
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Upload,
  Tag,
  PlusCircle,
  FileSpreadsheet,
  LogOut,
} from "lucide-react";
import { logout } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, isAdmin } = useAuth();

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "Brands", path: "/admin/brands/view_brands", icon: Layers },
    // { label: "Add Brands", path: "/admin/add_brands", icon: PlusCircle },
    // { label: "Add Products", path: "/admin/upload", icon: Upload },
    { label: "Sections", path: "/admin/offer_section", icon: Tag },
    { label: "Bulk Import", path: "/admin/bulk-upload", icon: FileSpreadsheet },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-6 h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-[#005bae] rounded-xl flex items-center justify-center text-white font-black">
          Y
        </div>
        <span className="text-lg font-black uppercase tracking-tight text-slate-800">
          Yessare Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          // startsWith ensures the link stays highlighted even on sub-pages
          const isActive = pathname.startsWith(item.path);

          return (
            <Link
              key={item.label}
              href={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-[#005bae] shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-slate-100 space-y-3">
        {user && (
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-700 truncate">{user}</p>
              <span
                className={`inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isAdmin
                    ? "bg-blue-50 text-[#005bae]"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {role === "admin" ? "Admin" : "Viewer"}
              </span>
            </div>
            <button
              onClick={() => {
                logout();
                router.replace("/login");
                router.refresh();
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-600 shrink-0"
            >
              <LogOut size={14} /> Log out
            </button>
          </div>
        )}
        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
          Admin Panel v1.0
        </p>
      </div>
    </aside>
  );
}