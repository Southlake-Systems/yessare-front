import BrandSection from "@/app/components/brand/BrandSection";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Section from "@/app/components/Section";
import { getBrands, getHomeSections } from "@/lib/api";

export default  async function Shop() {
  const brands = await getBrands();
  const sections = await getHomeSections();

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      <div className="mx-auto px-4 space-y-8 pb-10">
        
        <BrandSection brands={brands} />

        
        {sections.map((section: any) => (
          <Section
            key={section.id}
            title={section.title}
            items={section.products}
            type="product"
          />
        ))}
        
      </div>

      <Footer />
    </div>
  );
}