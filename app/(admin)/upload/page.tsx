"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    Upload, Plus, Trash2, ChevronLeft, Layers, Box,
    Image as ImageIcon, Info, AlertCircle, Save,
    ChevronDown, LayoutDashboard, Package,
    Settings, Eye, CheckCircle2, ListPlus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductEditor() {
    const [specs, setSpecs] = useState([{ key: "Motor", value: "Brushless" }]);
    const updateSpec = (index: number, field: "key" | "value", val: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = val;
        setSpecs(newSpecs);
    };
    const router = useRouter();
    const pathname = usePathname();
    const navItems = [
  { icon: LayoutDashboard, label: "Orders", path: "/orders" },
  { icon: Package, label: "Product Catalog", path: "/products" },
  { icon: Layers, label: "Brands", path: "/brands" },
];
    const removeSpec = (index: number) => {
        if (specs.length > 1) {
            setSpecs(specs.filter((_, i) => i !== index));
        }
    };
    const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);

    return (
        <div className="flex min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">

            {/* 🛠️ CLEAN LIGHT SIDEBAR */}
            <aside className="hidden xl:flex w-72 bg-white border-r-2 border-slate-200 flex-col sticky top-0 h-screen p-6">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="relative w-10 h-10 bg-[#005bae] rounded-xl flex items-center justify-center overflow-hidden">
                        <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
                    </div>
                    <span className="text-xl font-black tracking-tighter uppercase">Yesare</span>
                </div>

                <nav className="space-y-1.5 flex-1">
                        {navItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <button
                            key={item.label}
                            onClick={() => router.push(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                                isActive
                                ? "bg-slate-100 text-[#005bae]"
                                : "hover:bg-slate-50 text-slate-500"
                            }`}
                            >
                            <item.icon size={18} />
                            {item.label}
                            </button>
                        );
                        })}
                </nav>

                {/* <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black uppercase text-slate-400">System Status</span>
                    </div>
                    <p className="text-xs font-bold text-slate-600">Database synced 1m ago</p>
                </div> */}
            </aside>

            {/* 📝 MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Top Header Bar */}
                <header className="bg-white/80 backdrop-blur-md border-b-2 border-slate-200 px-8 py-4 sticky top-0 z-30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="xl:hidden p-2 bg-slate-100 rounded-lg"><ChevronLeft /></button>
                        <div>
                            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">Create Listing</h1>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                Inventory <ChevronLeft size={8} className="rotate-180" /> Power Tools
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">
                            <Eye size={18} /> Preview
                        </button>
                        <button className="bg-yellow-500 text-black px-8 py-2.5 rounded-xl font-black text-sm hover:bg-yellow-600 shadow-sm active:scale-95 transition-all flex items-center gap-2">
                            <Save size={18} /> SAVE CHANGES
                        </button>
                    </div>
                </header>

                <div className="p-8 lg:p-12">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left Column */}
                        <div className="lg:col-span-7 space-y-8">

                            {/* Product Info */}
                            <section className="bg-white border-2 border-slate-200 rounded-[2rem] p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="text-xs font-black bg-slate-900 text-white w-6 h-6 rounded-md flex items-center justify-center italic">1</span>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Primary Details</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Listing Title</label>
                                        <input className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-lg font-bold focus:bg-white focus:border-[#005bae] outline-none transition-all" placeholder="e.g. 20V Max Lithium-Ion Drill" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Store Category</label>
                                            <div className="relative">
                                                <select className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 font-bold outline-none appearance-none">
                                                     <option></option>
                                                    <option>Power Tools</option>
                                                    <option>Safety Gear</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            </div>
                                        </div>
                                       <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sub Category</label>
                                            <div className="relative">
                                                <select className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 font-bold outline-none appearance-none">
                                                    <option ></option>
                                                    <option>Drilling</option>
                                                    <option>Safety Gear</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            </div>
                                        </div> 
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Warranty Period</label>
                                            <input className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 font-bold outline-none" placeholder="e.g. 2 Years" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</label>
                                        <textarea rows={4} className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 font-medium outline-none focus:bg-white transition-all resize-none" placeholder="Enter product features..." />
                                    </div>
                                </div>
                            </section>

                            {/* Specs */}
                            <section className="bg-white border-2 border-slate-200 rounded-[2rem] p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-black bg-slate-900 text-white w-6 h-6 rounded-md flex items-center justify-center italic">2</span>
                                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Specifications</h3>
                                    </div>
                                    <button onClick={addSpec} className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded hover:bg-slate-200 transition">ADD ROW</button>
                                </div>

                                <div className="space-y-2">
                                    {specs.map((s, i) => (
                                        <div key={i} className="flex gap-2 group">
                                            <input
                                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-xs outline-none focus:border-[#005bae]"
                                                placeholder="Field (e.g. Torque)"
                                                value={s.key}
                                                onChange={(e) => updateSpec(i, "key", e.target.value)} // Fixes the error
                                            />
                                            <input
                                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-xs outline-none focus:border-[#005bae]"
                                                placeholder="Value (e.g. 50Nm)"
                                                value={s.value}
                                                onChange={(e) => updateSpec(i, "value", e.target.value)} // Fixes the error
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSpec(i)}
                                                className="text-slate-300 hover:text-red-500 transition px-2"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-5 space-y-8">

                            {/* Pricing */}
                            <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Commercials</h3>

                                <div className="space-y-6">
                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-2 block">MRP Price</label>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-slate-300">₹</span>
                                            <input className="bg-transparent text-4xl font-black outline-none w-full" placeholder="0" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Stock</label>
                                            <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-black" placeholder="0" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Discount %</label>
                                            <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-black" placeholder="0" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Photos */}
                            <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Media Library</h3>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <label className="col-span-3 aspect-video border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all group">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#005bae]/10 transition-colors">
                                            <Upload size={20} className="text-slate-400 group-hover:text-[#005bae]" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-tighter">Main Image</span>
                                        <input type="file" className="hidden" />
                                    </label>
                                    <div className="aspect-square bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-200"><Plus size={16} /></div>
                                    <div className="aspect-square bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-200"><Plus size={16} /></div>
                                    <div className="aspect-square bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-200"><Plus size={16} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}