import Link from "next/link";
import Image from "next/image";
import { 
  IconBrandFacebook, 
  IconBrandInstagram, 
  IconBrandWhatsapp, 
  IconMail, 
  IconPhone, 
  IconMapPin, 
  IconChevronRight,
  IconSend
} from "@tabler/icons-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background text-gray-400 mt-20 border-t border-white/10">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      {/* Newsletter Section */}
      

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* BRAND COLUMN */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 bg-white rounded-lg p-1">
              <Image
                src="/logo.jpeg"
                alt="Yesare Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-yellow-500 transition-colors">
              YESARE
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Engineered for precision. Built for power. Kerala's leading supplier of industrial grade tools for the modern professional.
          </p>
          <div className="flex gap-3">
            <SocialIcon icon={<IconBrandFacebook size={20} />} href="https://www.facebook.com/YESSAREPOWERTOOLS61/" />
            <SocialIcon icon={<IconBrandInstagram size={20} />} href="https://www.instagram.com/yessaretools/reels/" />
            <SocialIcon icon={<IconBrandWhatsapp size={20} />} href="#" />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="lg:pl-8">
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8 border-l-2 border-yellow-500 pl-3">Company</h3>
          <ul className="space-y-4 text-sm">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/products">All Products</FooterLink>
            <FooterLink href="/about">Our Story</FooterLink>
            <FooterLink href="/contact">Support Center</FooterLink>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8 border-l-2 border-yellow-500 pl-3">Categories</h3>
          <ul className="space-y-4 text-sm">
            <FooterLink href="/cat/power">Power Tools</FooterLink>
            <FooterLink href="/cat/hand">Precision Hand Tools</FooterLink>
            <FooterLink href="/cat/cordless">Cordless Series</FooterLink>
            <FooterLink href="/cat/safety">Safety Equipment</FooterLink>
          </ul>
        </div>

        {/* CONTACT INFO + MINI MAP */}
        <div className="space-y-6">
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8 border-l-2 border-yellow-500 pl-3">
            Store Location
          </h3>
          
          <div className="w-full h-32 rounded-lg overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.5!2d76.6!3d9.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDYnMDAuMCJOIDc2wrAzNicwMC4wIkU!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>

          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm group">
              <IconMapPin className="text-yellow-500 shrink-0 group-hover:scale-110 transition-transform" size={18} />
              <span className="group-hover:text-white transition-colors">Chakkuvally, Kollam, Kerala</span>
            </li>
            <li className="flex items-center gap-3 text-sm group">
              <IconPhone className="text-yellow-500 shrink-0 group-hover:scale-110 transition-transform" size={18} />
              <span className="group-hover:text-white transition-colors">+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3 text-sm group">
              <IconMail className="text-yellow-500 shrink-0 group-hover:scale-110 transition-transform" size={18} />
              <span className="group-hover:text-white transition-colors">support@yesare.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p className="text-gray-500">© {currentYear} Yesare Tools. Precision Engineered.</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-yellow-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-yellow-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group flex items-center gap-2 hover:text-yellow-500 transition-all">
        <IconChevronRight size={14} className="text-yellow-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all transform hover:-translate-y-1"
    >
      {icon}
    </Link>
  );
}