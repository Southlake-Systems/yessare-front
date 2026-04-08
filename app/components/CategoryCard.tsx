type Props = {
  name: string;
};

export default function CategoryCard({ name }: { name: string }) {
  return (
    <div className="group border rounded-xl p-4 bg-white hover:shadow-md transition cursor-pointer text-center">

      <div className="w-full h-24 bg-gray-100 rounded mb-3 flex items-center justify-center text-xs text-gray-400">
        IMAGE
      </div>

      <p className="text-sm font-medium text-gray-700 group-hover:text-[#0f4c81]">
        {name}
      </p>
    </div>
  );
}