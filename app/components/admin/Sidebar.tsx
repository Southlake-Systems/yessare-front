"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Upload,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "View Brands", path: "/admin/view_brands", icon: Layers },
    { label: "Add Brands", path: "/admin/add_brands", icon: Layers },
    { label: "Add Products", path: "/admin/upload", icon: Upload },

  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-6">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-[#005bae] rounded-xl flex items-center justify-center text-white font-black">
          Y
        </div>
        <span className="text-lg font-black uppercase tracking-tight">
          Yesare Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive
                  ? "bg-slate-100 text-[#005bae]"
                  : "text-slate-500 hover:bg-slate-50"
                }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-xs text-slate-400 font-bold">
        Admin Panel v1.0
      </div>
    </aside>
  );
}