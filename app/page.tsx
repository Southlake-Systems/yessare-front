import Header from "@/app/components/mainHeader";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { ShieldCheck, Layers, BadgePercent, Wrench } from "lucide-react";

export default async function Home() {
  const features = [
    {
      title: "Comprehensive",
      description: "A complete one-stop ecosystem for both professional industrial machinery and everyday domestic tool requirements.",
      icon: <ShieldCheck className="w-8 h-8" />,
      gradient: "from-blue-500/20 to-transparent"
    },
    {
      title: "Multibrand",
      description: "Curated selections from global giants like Bosch, Makita, and iBELL, bringing world-class engineering to your hands.",
      icon: <Layers className="w-8 h-8" />,
      gradient: "from-yellow-500/20 to-transparent"
    },
    {
      title: "Competitive",
      description: "Aggressive pricing strategies that match or beat online marketplaces, ensuring you get local value at global prices.",
      icon: <BadgePercent className="w-8 h-8" />,
      gradient: "from-green-500/20 to-transparent"
    },
    {
      title: "Expert Support",
      description: "Beyond the sale: our certified service centers provide genuine spares and technical expertise to keep you working.",
      icon: <Wrench className="w-8 h-8" />,
      gradient: "from-red-500/20 to-transparent"
    }
  ];
  return (
    <div className="">
      <Header />

      {/* HERO SECTION */}
      <section className="bg-background py-32 md:py-48 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight text-white  leading-tight">
            Yessare — Kerala’s First <span className="text-yellow-500">Tools Supermarket</span>
          </h1>
          <p className="max-w-3xl text-xl md:text-2xl text-white leading-relaxed mb-12">
            One-stop destination for all your tool needs with a wide multibrand collection, best pricing, and trusted service.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              href="/shop"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-5 rounded-full font-bold transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Now
            </Link>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-8">
              Our <span className="text-yellow-500">Journey</span>
            </h2>
            <div className="h-2 w-20 bg-yellow-400 mb-10"></div>
            <p className="text-xl leading-relaxed text-gray-700">
              Founded in 2016 as a small tools rental store, Yessare has grown into
              Kerala’s first tools supermarket. Today, we offer a wide range of tools
              from leading brands, combining affordability, reliability, and strong
              after-sales support — all under one roof.
            </p>
          </div>
          <div className="aspect-w-16 aspect-h-9 md:aspect-w-1 md:aspect-h-1 overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://via.placeholder.com/800x600/f3f4f6/374151?text=Yessare+Tools+Store+Photo"
              alt="Yessare Tools Store"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="bg-white text-black py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                ENGINEERED FOR <span className="text-yellow-400">EXCELLENCE</span>
              </h2>
              <p className="text-gray-800 text-lg">
                We don't just sell tools; we provide the reliability and support
                required to build the future.
              </p>
            </div>
            <div className="hidden md:block h-px grow bg-linear-to-r from-transparent via-gray-800 to-transparent mx-8 mb-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
            {features.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-background p-8 hover:border-yellow-400/50 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 mb-6 inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 text-yellow-400 group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-500">
                  {item.icon}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-200 transition-colors">
                    {item.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES SECTION */}
      <section className="relative py-24 px-4 overflow-hidden bg-white">
        {/* Subtle Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-200 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              Our <span className="text-yellow-500">Achievements</span>
            </h2>
            <div className="h-1.5 w-24 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mx-auto max-w-4xl">
            {[
              {
                title: "Kerala’s No.1",
                desc: "iBELL tools dealer",
                icon: "/brands/ibell.png"

              },
              {
                title: "Authorized",
                desc: "Bosch Service Center (Kollam)",
                icon: "/brands/bosch.png"

              },
              {
                title: "Best Dealer",
                desc: "Makita dealer in Kollam",
                icon: "/brands/makita.png"

              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Accent Number Tag */}


                {/* Icon */}
                {item.icon && (
                  <div className="w-25 h-25 mb-6 mx-auto">
                    <img src={item.icon} alt={`${item.title} logo`} className="object-contain w-full h-full" />
                  </div>
                )}

                <h3 className="text-sm uppercase tracking-widest font-bold text-yellow-600 mb-2">
                  {item.title}
                </h3>

                <p className="text-2xl font-extrabold text-slate-800 leading-tight">
                  {item.desc}
                </p>

                <div className="mt-8 h-1 w-0 bg-yellow-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-yellow-400 text-black py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight text-black">
            Experience tools like <br />never before.
          </h2>
          <p className="mb-14 font-medium text-2xl max-w-3xl mx-auto text-gray-900">
            Visit our supermarket or browse our online catalog for the best deals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/shop"
              className="inline-block bg-black text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-black text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}