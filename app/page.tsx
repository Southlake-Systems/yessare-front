import Hero from "./components/Hero";
import Section from "./components/Section";

const categories = [
  "Power Tools",
  "Hand Tools",
  "Cordless Tools",
  "Safety Equipments",
  "Home Tools",
];


const products = [
  { name: "Angle Grinder", price: "₹2,499" },
  { name: "Cordless Drill", price: "₹3,199" },
  { name: "Hammer Drill", price: "₹2,899" },
  { name: "Circular Saw", price: "₹4,499" },
  { name: "Safety Gloves", price: "₹299" },
];


export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 space-y-8 pb-10 ">
        <Section title="Shop by Categories" items={categories} type="category" />

        <Section title="Top Deals on Tools" items={products} type="product" />

        <Section title="Recommended for You" items={products} type="product" />
      </div>
    </div>
  );
}