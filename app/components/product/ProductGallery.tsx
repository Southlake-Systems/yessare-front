export default function ProductGallery() {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">

      {/* Thumbnails */}
      <div className="flex sm:flex-col gap-2 justify-center">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-300 flex items-center justify-center text-xs"
          >
            img{i}
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 w-full aspect-square bg-gray-300 flex items-center justify-center text-sm sm:text-lg">
        MAIN IMAGE
      </div>
    </div>
  );
}