import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#0f4c81] text-white shadow">

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 relative">
            <Image
              src="/logo.jpeg"// put your logo in public/logo.png
              alt="Yesare Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold tracking-wide">
            Yesare
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 hidden md:flex">
          <input
            type="text"
            placeholder="Search power tools..."
            className="w-full px-4 py-2 rounded-l-md text-amber-50 outline-none"
          />
        <button className="bg-yellow-400 px-5 rounded-r-md text-black font-semibold hover:bg-yellow-500 transition">
          Search
        </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6 text-sm">
          <span className="hover:text-yellow-400 cursor-pointer">
            Account
          </span>
          <span className="hover:text-yellow-400 cursor-pointer">
            Orders
          </span>
          <span className="hover:text-yellow-400 cursor-pointer">
            Cart
          </span>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="bg-[#0b3a63] text-sm px-4 py-2 flex gap-6 overflow-x-auto justify-center">
        {[
          "Power Tools",
          "Hand Tools",
          "Cordless Tools",
          "Safety Equipments",
          "Home Tools",
        ].map((item) => (
          <span
            key={item}
            className="cursor-pointer hover:text-yellow-400 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </nav>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Search tools..."
          className="w-full px-4 py-2 rounded text-black"
        />
      </div>
    </header>
  );
}