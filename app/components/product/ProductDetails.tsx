type Props = {
  description: string;
};

export default function ProductDetails({ description }: Props) {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg">
      <h2 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-6">
        Know more
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

        <div className="w-full max-w-sm aspect-square border rounded flex items-center justify-center text-2xl mx-auto lg:mx-0">
          ▶
        </div>

        <div className="text-gray-700 space-y-3 sm:space-y-4 leading-relaxed">
          <p>{description}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}