import Image from "next/image";
import Link from "next/link"; // Import Link

export default function Hero() {
  return (
    <section className="w-full mt-5 md:mt-0 overflow-hidden tracking-widest">
      <div className="relative h-150 bg-linear-to-r from-primary to-secondary text-textPrimary flex flex-col md:flex-row items-center justify-between px-6 md:px-16">
        
        {/* LEFT CONTENT */}
        <div className="relative z-20 w-full md:w-1/2 text-center md:text-left mt-10 md:mt-0">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase font-changa text-yellow-400 leading-none">
            <span className="capitalize text-white">Power Tools <br />for</span> 
            <br />
            <span className="block">Professionals</span>
          </h1>

          <p className="mt-4 text-textSecondary max-w-md mx-auto md:mx-0">
            High-performance tools for construction, DIY, and industrial use.
          </p>

       
          <Link href="/product/?page=1">
            <button className="mt-6 bg-yellow-400 text-black px-10 py-4 rounded-md font-bold hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-xl">
              View Products
            </button>
          </Link>
        </div>

        <div className="relative w-full h-75 md:h-full md:w-1/2 flex items-center justify-center">
          <div className="relative w-full h-full scale-125 -translate-x-35 md:scale-[1.8] md:-translate-x-10 lg:scale-[1.5] lg:-translate-x-50 transition-transform duration-300 ease-out">
            <Image
              src="/hero-main.png"
              alt="Tool"
              fill
              priority
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}