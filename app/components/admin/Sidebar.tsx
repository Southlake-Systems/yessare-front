"use client";

import Link from "next/link"; // Use Link instead of router.push
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Upload,
  Tag,
  PlusCircle
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "View Brands", path: "/admin/view_brands", icon: Layers },
    { label: "Add Brands", path: "/admin/add_brands", icon: PlusCircle },
    { label: "Add Products", path: "/admin/upload", icon: Upload },
    { label: "Offer Zone", path: "/admin/offer_section", icon: Tag }
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-6 h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-[#005bae] rounded-xl flex items-center justify-center text-white font-black">
          Y
        </div>
        <span className="text-lg font-black uppercase tracking-tight text-slate-800">
          Yesare Admin
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
      <div className="mt-auto pt-6 border-t border-slate-100 text-[10px] text-slate-400 font-bold tracking-widest uppercase">
        Admin Panel v1.0
      </div>
    </aside>
  );
}