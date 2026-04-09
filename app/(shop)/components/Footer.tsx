import Link from "next/link";
import Image from "next/image";
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="font-bitcount bg-background text-gray-400 mt-20 border-t-4 border-yellow-500">
      {/* Newsletter / Top Bar */}


      <div className="w-full mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* BRAND COLUMN */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-10">
              <Image
                src="/logo.jpeg"
                alt="Yesare Logo"
                fill
                className="object-contain " // Makes logo white for dark bg
              />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-yellow-500 transition-colors">
              YESARE
            </span>
          </Link>
          <p className="text-sm leading-relaxed">
            Engineered for precision. Built for power. Kerala's leading supplier of industrial grade tools for the modern professional.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<IconBrandFacebook size={20} />} href="#" />
            <SocialIcon icon={<IconBrandInstagram size={20} />} href="#" />
            <SocialIcon icon={<IconBrandWhatsapp size={20} />} href="#" />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/products">All Products</FooterLink>
            <FooterLink href="/about">About Our Story</FooterLink>
            <FooterLink href="/contact">Support Center</FooterLink>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Categories</h3>
          <ul className="space-y-4 text-sm">
            <FooterLink href="/cat/power">Power Tools</FooterLink>
            <FooterLink href="/cat/hand">Precision Hand Tools</FooterLink>
            <FooterLink href="/cat/cordless">Cordless Series</FooterLink>
            <FooterLink href="/cat/safety">Safety Equipment</FooterLink>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Store Location</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm">
              <IconMapPin className="text-yellow-500 shrink-0" size={18} />
              <span>Chakkuvally <br />Kollam, Kerala, India</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <IconPhone className="text-yellow-500 shrink-0" size={18} />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <IconMail className="text-yellow-500 shrink-0" size={18} />
              <span>support@yesare.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <p>© {currentYear} Yesare Tools. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-yellow-500">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-yellow-500">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components for cleaner code
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-yellow-500 hover:translate-x-1 transition-all inline-block">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Link 
      href={href} 
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all"
    >
      {icon}
    </Link>
  );
}