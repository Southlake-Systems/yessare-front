"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/onam.png",
    alt: "Onam Tool Festival",
    href: "/shop?offer=onam",
  },
  {
    image: "/bosch.png",
    alt: "Bosch Professional Tools",
    href: "/shop?brand=bosch",
  },
  {
    image: "/all.png",
    alt: "Power Tools",
    href: "/shop?category=power-tools",
  },
];

export default function ShopCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="w-full bg-white px-4 py-6 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
  <div className="relative mx-auto w-full max-w-[1800px] overflow-hidden rounded-2xl">

        {/* Slides */}
        {/* Slides */}
<div className="relative w-full aspect-[3.1/1]">
  {slides.map((slide, index) => (
    <Link
      key={slide.image}
      href={slide.href}
      className={`absolute inset-0 transition-opacity duration-700 ${
        index === current
          ? "z-10 opacity-100"
          : "pointer-events-none z-0 opacity-0"
      }`}
    >
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        priority={index === 0}
        sizes="100vw"
        className="object-center"
      />
    </Link>
  ))}

  {/* Previous */}
  <button
    type="button"
    onClick={previousSlide}
    aria-label="Previous slide"
    className="
      absolute left-4 top-1/2 z-20
      flex h-10 w-10 -translate-y-1/2
      items-center justify-center
      rounded-full
      border border-white/50
      bg-white/90
      text-slate-900
      shadow-lg
      backdrop-blur
      transition
      hover:scale-105
      hover:bg-white
    "
  >
    <ChevronLeft className="h-5 w-5" />
  </button>

  {/* Next */}
  <button
    type="button"
    onClick={nextSlide}
    aria-label="Next slide"
    className="
      absolute right-4 top-1/2 z-20
      flex h-10 w-10 -translate-y-1/2
      items-center justify-center
      rounded-full
      border border-white/50
      bg-white/90
      text-slate-900
      shadow-lg
      backdrop-blur
      transition
      hover:scale-105
      hover:bg-white
    "
  >
    <ChevronRight className="h-5 w-5" />
  </button>

  {/* Dots */}
  <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
    {slides.map((_, index) => (
      <button
        key={index}
        type="button"
        aria-label={`Go to slide ${index + 1}`}
        onClick={() => setCurrent(index)}
        className={`h-2.5 rounded-full transition-all duration-300 ${
          current === index
            ? "w-8 bg-blue-600"
            : "w-2.5 bg-white/80 hover:bg-white"
        }`}
      />
    ))}
  </div>
</div>
      </div>
    </section>
  );
}