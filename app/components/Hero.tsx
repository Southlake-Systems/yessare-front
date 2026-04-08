export default function Hero() {
  return (
<div className="max-w-7xl mx-auto px-4 mt-6">
  <div className="rounded-xl bg-gradient-to-r from-[#0f4c81] to-[#1f6aa5] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow">

    <div className="max-w-lg">
      <h1 className="text-2xl md:text-4xl font-bold leading-tight">
        Power Tools for Professionals
      </h1>
      <p className="mt-3 text-sm md:text-base text-gray-200">
        High-performance tools for construction, DIY, and industrial use.
      </p>

      <button className="mt-5 bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-500">
        Shop Now
      </button>
    </div>

    <div className="w-full md:w-[400px] h-[200px] mt-6 md:mt-0 bg-white/10 rounded-lg flex items-center justify-center">
      HERO IMAGE
    </div>
  </div>
</div>
  );
}