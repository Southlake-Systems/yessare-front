"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { liveSearch } from "@/lib/api";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User, Package, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 2) {
      const data = await liveSearch(value);
      // Limit to 7 results here
      setSuggestions(data.slice(0, 7));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (id: number) => {
    router.push(`/product/${id}`);
  };

  const handleSearch = () => {
    if (!query) return;
    router.push(`/search?q=${query}`);
  };

  // Add shadow on scroll for better depth
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    "Air Compressors", 
    "Cordless Tools", 
    "Cleaning Tools",
    "Power Tools",
    "Welding Tools",
  ];

  return (
    <header
      className={` bg-background text-textPrimary sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-lg py-1" : "shadow-sm py-0"
        }`}
    >
      {/* Main Bar */}
      <div className="max-w-full mx-auto px-10 flex items-center justify-between py-5 gap-4">

        {/* Logo */}
        <Link href="/shop" className="shrink-0 flex items-center gap-3 hover:opacity-80 transition group">
          <div className="relative w-12.5 h-10 md:w-17.5 md:h-12.5">
            <Image
              src="/logo.jpeg"
              alt="Yesare Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-black tracking-tighter ">
            Yesare
          </span>
        </Link>

        {/* 🔍 Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xl relative group">
          <input
            value={query}
            onChange={handleChange}
            placeholder="Search products..."
            className="w-full px-5 py-2.5 rounded-l-full bg-gray-100 focus:bg-white border-2 border-transparent focus:border-yellow-400 text-black outline-none transition-all"
          />


          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-[calc(100%-120px)] bg-white border border-gray-200 shadow-xl rounded-b-xl z-[60] mt-1 overflow-hidden">
              {suggestions.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleSelect(item.id);
                    setSuggestions([]); // Clear suggestions after clicking
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left border-b last:border-0"
                >
                  <Search size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-800 font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          )}


          <button
            onClick={handleSearch}
            className="bg-yellow-400 hover:bg-green-600 hover:text-white text-black px-8 py-2.5 rounded-r-full text-sm font-bold transition-all duration-300 flex items-center gap-2 shrink-0"
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/contact"
            className="bg-yellow-400 hover:bg-green-600 hover:text-white text-black px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300"

          >
            Contact Us
          </Link>
        </div>


        {/* 📱 Mobile Actions */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 hover:bg-gray-100  rounded-md transition"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (Below Logo) */}
      <div className="flex items-center mx-auto justify-center md:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools..."
            className="max-w-full px-2 py-2.5 rounded-lg bg-gray-100 text-black focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Desktop Category Nav */}
      <nav className="hidden md:block">
        <div className="bg-white text-black max-w-full mx-auto flex items-center justify-center gap-30 py-5">
          {categories.map((item) => (
            <Link
              key={item}
              href={`/category/${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-semibold hover:text-yellow-500 hover:underline underline-offset-8 decoration-2 transition-all whitespace-nowrap"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      {/* 📱 Mobile Side Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-white text-black z-70 p-6 shadow-2xl md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 border-b pb-6">
                  <Link href="/account" className="flex items-center gap-3 text-lg font-medium"><User /> My Account</Link>
                  <Link href="/orders" className="flex items-center gap-3 text-lg font-medium"><Package /> My Orders</Link>
                </div>

                <div className="flex flex-col gap-5">
                  <span className="text-xs uppercase text-gray-400 font-bold tracking-widest">Categories</span>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href="#"
                      className="text-lg font-semibold hover:text-yellow-500 transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}