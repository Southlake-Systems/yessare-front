"use client";

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { X, Check, ZoomIn, ZoomOut } from "lucide-react";

type Area = { x: number; y: number; width: number; height: number };

async function getCroppedBlob(imageSrc: string, pixelCrop: Area): Promise<File> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) { reject(new Error("Canvas is empty")); return; }
      resolve(new File([blob], "cropped.webp", { type: "image/webp" }));
    }, "image/webp", 0.92);
  });
}

type Props = {
  src: string;
  fileName: string;
  onConfirm: (file: File) => void;
  onCancel: () => void;
};

export default function ImageCropperModal({ src, fileName, onConfirm, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    const file = await getCroppedBlob(src, croppedAreaPixels);
    onConfirm(file);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <span className="font-semibold text-sm text-slate-700 truncate max-w-xs">{fileName}</span>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        {/* Cropper */}
        <div className="relative bg-slate-900" style={{ height: 360 }}>
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Zoom slider */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center gap-3">
          <ZoomOut size={14} className="text-slate-400 shrink-0" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 accent-blue-600"
          />
          <ZoomIn size={14} className="text-slate-400 shrink-0" />
        </div>

        {/* Actions */}
        <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={processing}
            className="px-4 py-2 text-sm text-white bg-[#005bae] rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Check size={14} /> {processing ? "Processing..." : "Use this crop"}
          </button>
        </div>
      </div>
    </div>
  );
}
