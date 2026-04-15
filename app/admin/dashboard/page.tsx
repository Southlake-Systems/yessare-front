// app/admin/dashboard/page.tsx
import { products } from "@/data/product";
import { 
  ArrowUpRight, 
  ArrowDownRight,
  ExternalLink,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "Total Products", value: products.length, trend: "+2", trendUp: true, color: "border-blue-500" },
    { label: "Orders", value: 12, trend: "+14%", trendUp: true, color: "border-orange-500" },
    { label: "Revenue", value: "₹24,500", trend: "+8%", trendUp: true, color: "border-emerald-500" },
    { label: "Customers", value: 8, trend: "-2%", trendUp: false, color: "border-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-10 space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time overview of your store's performance.
          </p>
        </div>
        <button className="px-5 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition shadow-sm">
          Download Report
        </button>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className={`bg-white border-l-4 ${item.color} border-y border-r border-gray-200 rounded-xl p-6 shadow-sm`}
          >
            <div className="flex justify-between items-center">
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                {item.label}
              </p>
              <div className={`flex items-center gap-0.5 text-xs font-bold ${item.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                {item.trend}
                {item.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mt-2 tracking-tight">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

  
      <div className="grid lg:grid-cols-3 gap-8">
        

        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <h2 className="font-black text-sm uppercase tracking-wider text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-800 transition">View All Orders</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs border border-gray-200">
                    #{i}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Order ID: #120{i}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      COD • <span className="text-orange-500">Processing</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-gray-900">₹{(2000 + i * 850).toLocaleString()}</p>
                  <button className="text-[10px] font-black uppercase text-gray-400 hover:text-blue-600 flex items-center gap-1 ml-auto mt-1 transition">
                    Manage <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-red-600 mb-6 border-b border-gray-100 pb-4">
              <AlertTriangle className="w-4 h-4" />
              <h2 className="font-black text-xs uppercase tracking-widest">Inventory Alerts</h2>
            </div>
            <div className="space-y-5">
              {[
                { name: "Bosch Drill GSB 600", stock: "2 left", color: "text-red-600" },
                { name: "Makita Angle Grinder", stock: "Low", color: "text-amber-600" },
                { name: "Dewalt Hammer Kit", stock: "Out", color: "text-gray-400" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center group cursor-default">
                  <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{item.name}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border border-current ${item.color} bg-opacity-5`}>
                    {item.stock}
                  </span>
                </div>
              ))}
            </div>
            
            <Link 
              href="/admin/inventory" 
              className="mt-8 block text-center py-3 bg-gray-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black transition active:scale-95"
            >
              Restock Inventory
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}