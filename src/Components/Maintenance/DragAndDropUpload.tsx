"use client";
import { useRef, useState, FC, useEffect } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface SingleImageUploadProps {
  onImageUpload?: (imageData: string | null) => void;
}

const DragAndDropUpload: FC<SingleImageUploadProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // إزالة السمات المضافة بواسطة الإضافات
    const cleanupAttributes = () => {
      document.querySelectorAll('[data-new-gr-c-s-check-loaded]').forEach(el => {
        el.removeAttribute('data-new-gr-c-s-check-loaded');
      });
      document.querySelectorAll('[data-gr-ext-installed]').forEach(el => {
        el.removeAttribute('data-gr-ext-installed');
      });
    };
    
    cleanupAttributes();
    window.addEventListener('load', cleanupAttributes);
    
    return () => {
      window.removeEventListener('load', cleanupAttributes);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('الرجاء اختيار ملف صورة');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreview(reader.result);
        onImageUpload?.(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPreview(null);
    onImageUpload?.(null);
  };

  if (!isMounted) return null; // تجنب التصيير على الخادم

  return (
    <div className="max-w-2xl mx-auto">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        صورة المنتج
      </label>
      
      <div
        onClick={() => fileInputRef.current?.click()}
        className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer text-center hover:border-gray-400 transition h-50 relative"
      >
        {preview ? (
          <div className="relative w-full h-full">
            <Image
              src={preview}
              alt="معاينة الصورة"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain rounded-md"
              quality={80}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              onError={(e) => {
                e.currentTarget.src = '/fallback-image.jpg';
              }}
            />
            <button
              type="button"
              onClick={handleDelete}
              className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 hover:bg-red-600 transition-colors backdrop-blur-sm"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <PhotoIcon className="w-12 h-12 mb-2 opacity-70" />
            <span className="text-sm">اسحب الصورة هنا أو انقر للرفع</span>
            <span className="text-xs text-gray-400 mt-1">JPEG, PNG, WEBP</span>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/jpeg, image/png, image/webp"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DragAndDropUpload;