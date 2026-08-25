"use client";

import Link from "next/link";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="mt-5 flex h-[82px] items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Yessare Home"
          >
            <img
              src="/logo.png"
              alt="Yessare"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">

            <Link
              href="/"
              className="relative py-2 text-sm font-semibold text-[#071126] transition-colors hover:text-blue-600"
            >
              Home
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-blue-600" />
            </Link>

            <Link
              href="/shop"
              className="py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
            >
              Shop
            </Link>

            <Link
              href="/#categories"
              className="flex items-center gap-1 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
            >
              Categories
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/brands"
              className="py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
            >
              Brands
            </Link>

            <Link
              href="/offers"
              className="py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
            >
              Offers
            </Link>

            <Link
              href="/#about"
              className="py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
            >
              Contact
            </Link>

          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/shop"
              className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-blue-300 hover:bg-white"
            >
              <Search className="h-4 w-4 text-slate-500 transition-colors group-hover:text-blue-600" />

              <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
                Search products
              </span>
            </Link>
          </div>

          {/* MOBILE */}
          <div className="flex items-center gap-3 lg:hidden">

            <Link
              href="/shop"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 backdrop-blur-md"
              aria-label="Search"
            >
              <Search className="h-4.5 w-4.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 backdrop-blur-md"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="absolute left-4 right-4 top-[74px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl lg:hidden">

          <nav className="flex flex-col p-3">

            <MobileLink href="/" label="Home" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/shop" label="Shop" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/categories" label="Categories" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/brands" label="Brands" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/offers" label="Offers" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/about" label="About Us" onClick={() => setMobileOpen(false)} />
            <MobileLink href="/contact" label="Contact" onClick={() => setMobileOpen(false)} />

          </nav>
        </div>
      )}
    </header>
  );
}

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
    >
      {label}
    </Link>
  );
}