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
      <section
        className=" relative py-32 md:py-70 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-cover bg-center"
        style={{
          backgroundImage: "url('/main2.png')", // 
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight text-white leading-tight">
            Yessare — Kerala’s First{" "}
            <span className="text-blue-400">Tools Supermarket</span>
          </h1>

          <p className="max-w-3xl text-xl md:text-2xl text-gray-200 leading-relaxed mb-12">
            One-stop destination for all your tool needs with a wide multibrand collection, best pricing, and trusted service.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="/shop"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-full font-bold transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Now
            </a>
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
              src="/shop.png"
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
      {/* OWNER SECTION */}
      <section className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left Side: Round Image */}
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <img
                src="https://via.placeholder.com/400x400?text=Owner+Photo"
                alt="Founder of Yessare"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Badge */}
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black font-bold px-6 py-3 rounded-2xl shadow-lg transform rotate-3">
              Founder
            </div>
          </div>

          {/* Right Side: Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              The Vision Behind <span className="text-yellow-500">Yessare</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              "Our journey began in 2016 with a simple goal: to make high-quality tools accessible to every worker in Kerala. What started as a rental service has evolved into a community hub for professionals and hobbyists alike. We believe that with the right tools, anyone can build greatness."
            </p>
            <div className="space-y-1">
              <p className="text-xl font-bold text-slate-900">Sreerajan Savidham</p>
              <p className="text-yellow-600 font-medium">Founder & Managing Director</p>
            </div>
          </div>
        </div>
      </section>
      {/* TESTIMONIALS SECTION */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900">
            Trusted by <span className="text-yellow-500">Many</span>
          </h2>
        </div>

        <div className="relative flex">
          {/* Rolling Track */}
          <div className="animate-scroll flex gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-8">
                {[
                  { name: "Rahul K.", role: "Contractor", text: "Best price for Bosch tools in Kollam. Highly recommended!" },
                  { name: "Suresh Mani", role: "DIY Enthusiast", text: "The service center is excellent. They repaired my drill in one day." },
                  { name: "Anjali V.", role: "Architect", text: "Kerala's first tools supermarket indeed! The variety is unmatched." },
                  { name: "Deepak Nair", role: "Industrialist", text: "Genuine spares and expert advice. Yessare is my go-to store." },
                  { name: "Abhilash", role: "Electrician", text: "Affordable pricing that beats online stores easily." }
                ].map((review, idx) => (
                  <div
                    key={idx}
                    className="w-[350px] p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex text-yellow-400 mb-4 text-xl">★★★★★</div>
                    <p className="text-slate-700 italic mb-6">"{review.text}"</p>
                    <div>
                      <p className="font-bold text-slate-900">{review.name}</p>
                      <p className="text-sm text-slate-500">{review.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Gradient Fades for the edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
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