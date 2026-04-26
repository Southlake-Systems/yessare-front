"use client";
import Header from "@/app/components/mainHeader";
import Footer from "@/app/components/Footer";
import { ShieldCheck, Lock, Eye, FileText, UserCheck, Cookie, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
export default function PrivacyPolicyPage() {
  const lastUpdated = "April 26, 2026";
  const storeAddress = "Yesare Tools, Chakkuvally, Kollam, Kerala, India - 690520";
  const storeEmail = "support@yesare.com";

  const navItems = [
    "Information We Collect",
    "How We Use Your Information",
    "Sharing Your Information",
    "Data Security",
    "Cookies Policy",
    "Contact"
  ];

  return (
    <div className="bg-white text-slate-900">
    <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 mt-10">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-yellow-600 transition-all group"
          >
            <ChevronLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>
        </div>
      </div>
      {/* HERO HEADER - Light Version */}
      <section className="relative py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
        {/* Subtle Brand Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none uppercase font-black text-9xl flex items-center justify-center select-none">
          Yesare Tools
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-700 text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <ShieldCheck size={14} className="text-yellow-600" /> Consumer Protection
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
              Privacy <span className="text-yellow-500">Policy</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed">
              Transparent data handling for Kerala's leading tools supermarket. 
              We protect your information as strictly as we test our equipment.
            </p>
            <div className="mt-10 flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-8 h-px bg-slate-200"></span>
              Last Revised: {lastUpdated}
              <span className="w-8 h-px bg-slate-200"></span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16">
        
        {/* STICKY SIDE NAVIGATION */}
        <aside className="hidden lg:block w-72 sticky top-32 h-fit">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Table of Contents</p>
          <nav className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all text-sm font-bold text-slate-500 hover:text-yellow-600"
              >
                {item}
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
              </a>
            ))}
          </nav>
        </aside>

        {/* CONTENT AREA */}
        <div className="flex-1 space-y-24">
          
          <PolicySection 
            id="section-0"
            icon={<Eye />}
            title="1. Information We Collect"
          >
            <p className="mb-8 text-lg">We prioritize data minimization, collecting only what is essential for technical fulfillment and service excellence.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DataCard title="Personal Identity" desc="Full name, email address, and verified phone number for order tracking." />
              <DataCard title="Logistics Data" desc="Precise shipping coordinates and billing details for secure delivery." />
              <DataCard title="Technical Logs" desc="IP addresses and device specifications to optimize our web storefront." />
              <DataCard title="Usage Metrics" desc="Analysis of browsing patterns to improve our inventory selection." />
            </div>
          </PolicySection>

          <PolicySection 
            id="section-1"
            icon={<FileText />}
            title="2. How We Use Your Information"
          >
            <div className="space-y-6">
              <UsageItem num="01" text="Seamless processing of industrial and domestic tool orders." />
              <UsageItem num="02" text="Direct communication for technical support and genuine spare parts." />
              <UsageItem num="03" text="Refinement of the Yesare Supermarket digital user interface." />
              <UsageItem num="04" text="Advanced fraud detection to protect your payment credentials." />
            </div>
          </PolicySection>

          <PolicySection 
            id="section-2"
            icon={<UserCheck />}
            title="3. Sharing Your Information"
          >
            <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-yellow-500 font-black uppercase tracking-widest text-xs mb-3">Our Integrity Pledge</h4>
                <p className="text-xl font-bold leading-snug">
                  Yesare Tools <span className="underline decoration-yellow-500">never sells</span> your data to third-party brokers.
                </p>
                <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                  We only disclose information to authorized logistics partners (for shipping) and secure payment gateways required to finalize your transaction.
                </p>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck size={120} />
              </div>
            </div>
          </PolicySection>

          <PolicySection 
            id="section-3"
            icon={<Lock />}
            title="4. Data Security"
          >
            <p className="text-lg leading-relaxed">
              We employ SSL encryption and hardware-level firewalls. Just like our heavy-duty power tools, our security protocols are designed for maximum durability. We conduct regular audits to ensure your data remains fortified against unauthorized access.
            </p>
          </PolicySection>

          <PolicySection 
            id="section-4"
            icon={<Cookie />}
            title="5. Cookies Policy"
          >
            <p className="text-slate-600">
              We use "Performance Cookies" to understand how visitors interact with our shop. These small files help us remember your cart items and language preferences, ensuring a high-speed shopping experience every time you return.
            </p>
          </PolicySection>

          <PolicySection id="section-5" title="6. Contact & Legal Inquiry">
            <div className="p-10 rounded-[2.5rem] bg-yellow-400 border border-yellow-500 shadow-2xl shadow-yellow-500/20">
              <h4 className="text-2xl font-black text-slate-900 mb-8">Have questions? Reach out to our legal desk.</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900/60 block mb-2">Primary Email</span>
                  <p className="text-lg font-bold text-slate-900">{storeEmail}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900/60 block mb-2">Corporate Office</span>
                  <p className="text-lg font-bold text-slate-900 leading-tight">{storeAddress}</p>
                </div>
              </div>
            </div>
          </PolicySection>

        </div>
      </main>

      <div className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          Copyright © 2026 Yesare Tools. All rights reserved.
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* UI Helper Components */

function PolicySection({ id, title, icon, children }: { id: string; title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 group">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-900 shadow-sm group-hover:border-yellow-400 group-hover:bg-yellow-50 transition-all duration-300">
          {icon ? <span className="scale-110">{icon}</span> : <ShieldCheck size={24} />}
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
          {title}
        </h2>
      </div>
      <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg">
        {children}
      </div>
    </section>
  );
}

function DataCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-yellow-200 hover:bg-yellow-50/30 transition-all">
      <h5 className="font-black text-slate-900 text-sm mb-2 uppercase tracking-wide">{title}</h5>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function UsageItem({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
      <span className="text-2xl font-black text-yellow-500/40">{num}</span>
      <p className="font-bold text-slate-700">{text}</p>
    </div>
  );
}