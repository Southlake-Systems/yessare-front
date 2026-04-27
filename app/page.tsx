
import Header from "@/app/components/mainHeader";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { ShieldCheck, Layers, BadgePercent, Wrench, Users, Trophy, Briefcase } from "lucide-react";

export default async function Home() {
  const categories = [
    { name: "Air Compressors", image: "categories/aircompressor.png" },
    { name: "Cordless Tools", image: "categories/chordlesstools.png" },
    { name: "Cleaning Tools", image: "categories/cleaningtools.png" },
    { name: "Power Tools", image: "categories/powertools.png" },
    { name: "Welding Tools", image: "categories/weldingtools.png" },
  ];
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
  const reviews = [
    { name: "Sojin S Daniel", role: "Local Guide", text: "Excellent selection of power tools and equipment. Wide range including spanners, generators, drilling, welding and cutting machines." },
    { name: "Azharudheen N", role: "Customer", text: "Highly recommended power tool shop with a wide range of branded products like Bosch, Makita and DeWalt. Competitive pricing." },
    { name: "Vrindha Vijayan", role: "Customer", text: "Impressed with the collection and quality. From agricultural tools to industrial machines, everything is available under one roof." },
    { name: "Amal Pradeep", role: "Customer", text: "Friendly and helpful staff who explain everything clearly. Good quality tools at reasonable prices." },
    { name: "Adarsh Praveen", role: "Customer", text: "Clean shop, excellent tools and very friendly staff. Great overall experience with good pricing." },
    { name: "Deva Das", role: "Customer", text: "All types of tools and products are available here. Very friendly staff and a great place for power tools." },
    { name: "Abdulla TK", role: "Local Guide", text: "Wide range of power tools and equipment. Staff are very friendly and helpful, especially Sujatha." },
    { name: "Moncy Ancy", role: "Customer", text: "Great products at affordable prices. Excellent customer service and a very satisfying shopping experience." }
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

          {/* <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="/shop"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-full font-bold transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Now
            </a>
          </div> */}
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
{/* CATEGORIES SECTION */}
<section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
    <div className="max-w-2xl">
      <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-yellow-600 mb-3">
        Browse Collection
      </h2>
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
        What We <span className="text-yellow-500">Offer</span>
      </h2>
    </div>
    {/* <Link 
      href="/shop" 
      className="text-slate-900 font-bold border-b-2 border-yellow-400 pb-1 hover:text-yellow-600 transition-colors"
    >
      View All Categories →
    </Link> */}
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 max-w-7xl mx-auto">
    {categories.map((cat, idx) => (
      <Link
        href={`/shop?category=${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
        key={idx}
        className="group relative block overflow-hidden rounded-3xl bg-slate-100 aspect-[4/5] transition-all duration-500 hover:-translate-y-2"
      >
        {/* Background Image with Zoom Effect */}
        <img
          src={cat.image}
          alt={cat.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Permanent Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Content Wrapper */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Explore
            </p>
            <h3 className="text-xl font-extrabold text-white leading-tight">
              {cat.name}
            </h3>
            <div className="h-1 w-0 bg-yellow-500 mt-2 group-hover:w-12 transition-all duration-300" />
          </div>
        </div>

        {/* Subtle Inner Border Glow */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-yellow-500/50 transition-colors pointer-events-none" />
      </Link>
    ))}
  </div>
</section>
      {/* WHY CHOOSE US SECTION */}
     <section className="bg-slate-50 py-24 px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
      <div className="max-w-2xl">
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-yellow-600 mb-3">
          Our Standards
        </h2>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">
          ENGINEERED FOR <span className="text-yellow-500">EXCELLENCE</span>
        </h2>
        <p className="text-slate-600 text-lg">
          We don't just sell tools; we provide the reliability and support
          required to build the future.
        </p>
      </div>
      <div className="hidden md:block h-px grow bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-8 mb-4"></div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((item, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
        >
          {/* Animated Gradient Background on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Icon Container */}
          <div className="relative z-10 mb-8 inline-flex p-4 rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-yellow-500 group-hover:text-black group-hover:rotate-6 transition-all duration-500 shadow-sm">
            {item.icon}
          </div>

          {/* Text Content */}
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-700 transition-colors">
              {item.title}
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm group-hover:text-slate-700 transition-colors">
              {item.description}
            </p>
          </div>

          {/* Decorative Corner Element */}
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-slate-50 rounded-tl-3xl transition-colors group-hover:bg-yellow-400/20" />
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
                src="/founder.png"
                alt="Founder of Yessare"
                className="w-full h-full object-cover object-[center_30%] scale-105 transition-transform duration-500 hover:scale-110"
              />
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
      {/* STATS COUNTER SECTION */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 relative  text-black overflow-hidden">

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Brands */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-6 p-4 rounded-2xl  border border-white/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                <Briefcase className="w-10 h-10" />
              </div>
              <h3 className="text-5xl md:text-6xl font-black text-black mb-2">300+</h3>
              <p className="text-yellow-500 font-bold uppercase tracking-widest text-sm">Global Brands</p>
              <p className="text-black mt-3 max-w-[200px]">The widest selection of premium tools in Kerala.</p>
            </div>

            {/* Customers */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-all duration-300">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-5xl md:text-6xl font-black text-black mb-2">10,000+</h3>
              <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">Satisfied Customers</p>
              <p className="text-black mt-3 max-w-[200px]">Trusted by professionals and DIY enthusiasts alike.</p>
            </div>

            {/* Experience */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-green-400 group-hover:bg-green-400 group-hover:text-black transition-all duration-300">
                <Trophy className="w-10 h-10" />
              </div>
              <h3 className="text-5xl md:text-6xl font-black text-black mb-2">10+</h3>
              <p className="text-green-400 font-bold uppercase tracking-widest text-sm">Years of Excellence</p>
              <p className="text-black mt-3 max-w-[200px]">A decade of providing quality and technical expertise.</p>
            </div>

          </div>
        </div>
      </section>
      {/* TESTIMONIALS SECTION */}
      <section className="bg-slate-50 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
          <h2 className="text-sm font-bold tracking-widest uppercase text-yellow-600 mb-3">
            Testimonials
          </h2>
          <p className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Trusted by <span className="text-slate-500 font-medium italic">Thousands</span>
          </p>
        </div>

        <div className="relative flex items-center">
          {/* Rolling Track */}
          <div className="animate-scroll flex gap-6 hover:[animation-play-state:paused] cursor-pointer">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="w-[380px] flex flex-col justify-between p-8 rounded-2xl bg-white border border-slate-200/60 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-[1.02] hover:border-yellow-400/50"
                  >
                    <div>
                      <div className="flex gap-1 text-yellow-500 mb-5">
                        {[...Array(5)].map((_, starIdx) => (
                          <svg key={starIdx} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-slate-600 leading-relaxed text-lg mb-8">
                        "{review.text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 leading-none mb-1">{review.name}</p>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{review.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Improved Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10"></div>
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
            {/* <Link
              href="/shop"
              className="inline-block bg-black text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Shop Now
            </Link> */}
            {/* <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-black text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}