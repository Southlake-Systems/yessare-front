"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, Phone, ShoppingCart } from "lucide-react";

export default function ShopHeader() {
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-[88px] w-full items-center gap-6 px-6 pt-3 pb-3 lg:px-8 xl:px-10">

        {/* =====================================================
            LOGO
        ====================================================== */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src="/logo.jpeg"
              alt="Yessare"
              fill
              className="object-cover"
            />
          </div>

          <div className="hidden sm:block leading-none">
            <p className="text-[20px] font-extrabold tracking-tight text-slate-900">
              Yessare
            </p>

            <p className="mt-1 text-[8px] font-semibold tracking-[0.18em] text-slate-500">
              TOOLS SUPERMARKET
            </p>
          </div>
        </Link>

        {/* =====================================================
            CATEGORY DROPDOWN
        ====================================================== */}
        <button
          className="
            hidden
            h-11
            shrink-0
            items-center
            gap-8
            rounded-md
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            font-medium
            text-slate-700
            transition
            hover:border-blue-500
            hover:text-blue-600
            lg:flex
          "
        >
          <span>All Categories</span>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>

        {/* =====================================================
            SEARCH
        ====================================================== */}
        <div className="relative flex h-11 min-w-0 flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for tools, brands and more..."
            className="
              h-full
              w-full
              rounded-l-md
              border
              border-slate-200
              bg-white
              px-4
              pr-14
              text-sm
              text-slate-800
              outline-none
              placeholder:text-slate-400
              focus:border-blue-500
              focus:ring-1
              focus:ring-blue-500
            "
          />

          <button
            aria-label="Search"
            className="
              absolute
              right-0
              top-0
              flex
              h-11
              w-12
              items-center
              justify-center
              rounded-r-md
              bg-yellow-400
              text-slate-950
              transition
              hover:bg-yellow-500
            "
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* =====================================================
            PHONE
        ====================================================== */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Phone className="h-5 w-5 text-slate-900" />

          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-900">
              +91 9633 968 574
            </p>

            <p className="mt-1 text-[9px] text-slate-500">
              Mon - Sat 9:00 AM - 7:00 PM
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden h-10 w-px bg-slate-200 xl:block" />

        {/* =====================================================
            CART
        ====================================================== */}
        <Link
          href="/cart"
          className="
            hidden
            shrink-0
            items-center
            gap-3
            text-slate-800
            transition
            hover:text-blue-600
            sm:flex
          "
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />

            <span
              className="
                absolute
                -right-2
                -top-2
                flex
                h-4
                min-w-4
                items-center
                justify-center
                rounded-full
                bg-yellow-400
                px-1
                text-[9px]
                font-bold
                text-slate-950
              "
            >
              0
            </span>
          </div>

          <span className="text-sm font-semibold">
            My Cart
          </span>
        </Link>

      </div>
    </header>
  );
}