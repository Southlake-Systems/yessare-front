// @/app/components/product/ProductInfo.tsx

interface ProductInfoProps {
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  brand?: string;
}

export default function ProductInfo({ 
  name, 
  price, 
  originalPrice, 
  description, 
  brand 
}: ProductInfoProps) {
  return (
    <div className="space-y-4">
      {brand && <p className="text-yellow-600 font-bold uppercase text-xs">{brand}</p>}
      <h1 className="text-3xl font-black text-gray-900">{name}</h1>
      
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-black text-gray-900">₹{price.toLocaleString()}</span>
        {originalPrice && originalPrice > price && (
          <span className="text-lg text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
        )}
      </div>
      
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}