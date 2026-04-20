"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Ensure lucide-react is installed

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`bg-background text-white sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md py-2" : "shadow-sm py-4"
      }`}
    >
      <div className="max-w-full mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition z-50">
          <div className="relative w-10 h-8 md:w-12 md:h-10">
            <Image
              src="/logo.jpeg"
              alt="Yessare Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">
            Yessare
          </span>
        </Link>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-10">
          <Link 
            href="/contact" 
            className="text-sm font-bold uppercase tracking-wider hover:text-yellow-600 transition"
          >
            Contact Us
          </Link>
          
          <Link 
            href="/shop" 
            className="bg-yellow-400 hover:bg-black hover:text-white text-black px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 z-50" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-background transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } md:hidden flex flex-col items-center justify-center gap-8 z-40`}
        >
          <Link 
            href="/contact" 
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold uppercase tracking-widest"
          >
            Contact Us
          </Link>
          <Link 
            href="/shop" 
            onClick={() => setIsOpen(false)}
            className="bg-yellow-400 text-black px-10 py-4 rounded-full text-lg font-black uppercase shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </header>
  );
}