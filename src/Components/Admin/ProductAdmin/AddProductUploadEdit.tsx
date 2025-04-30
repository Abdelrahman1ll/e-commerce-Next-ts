"use client";
import { useRef, useState, FC, useEffect } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
interface AddProductUploadProps {
  initialImages?: string[]; // مصفوفة الصور الابتدائية (من المفترض أن تحتوي على 4 صور) سواء كانت Base64 أو روابط URL
  onFilesChange: (files: string[]) => void; // دالة لإرجاع الصور الحالية للوالد
}

const AddProductUploadEdit: FC<AddProductUploadProps> = ({
  initialImages = [],
  onFilesChange,
}) => {
  // تهيئة الحالة بحيث تكون مصفوفات previews وfiles بطول 4
  // (تأخذ الصور الابتدائية إن وُجِدت وتُملأ الفراغات بـ null)
  const [previews, setPreviews] = useState<(string | null)[]>(() => {
    const arr = [...initialImages];
    while (arr.length < 4) arr.push(null);
    return arr.slice(0, 4);
  });
  const [imgLoading, setImgLoading] = useState(true); // حالة تحميل الصورة
  const [files, setFiles] = useState<(string | null)[]>(() => {
    const arr = [...initialImages];
    while (arr.length < 4) arr.push(null);
    return arr.slice(0, 4);
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  // targetIndex يحدد أي صورة سيتم تحديثها عند اختيار ملف واحد
  // إذا كانت القيمة null يتم التعامل معها على أنها تحميل جماعي
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  // دالة لمعالجة التحميل الجماعي للصور في الخانات الفارغة
  const handleBulkUpload = async (newFiles: File[]) => {
    // إيجاد مواقع الخانات الفارغة
    const availableSlots = files.reduce((acc, file, idx) => {
      if (file === null) acc.push(idx);
      return acc;
    }, [] as number[]);
    // اختيار عدد الملفات بما يتناسب مع عدد الخانات المتاحة
    const filesToAdd = newFiles.slice(0, availableSlots.length);

    const newPreviews = await Promise.all(
      filesToAdd.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );

    // تحديث حالة المعاينات
    setPreviews((prev) => {
      const updated = [...prev];
      newPreviews.forEach((preview, i) => {
        const slotIndex = availableSlots[i];
        updated[slotIndex] = preview;
      });
      return updated;
    });

    // تحديث حالة الملفات بحيث تتزامن مع المعاينات
    setFiles((prev) => {
      const updated = [...prev];
      newPreviews.forEach((preview, i) => {
        const slotIndex = availableSlots[i];
        updated[slotIndex] = preview;
      });
      return updated;
    });
  };

  // دالة لمعالجة تحميل صورة واحدة وتحديث الصورة في الموقع المحدد
  const handleSingleUpload = async (file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // نقبل الصورة لو كانت Base64 أو أي بيانات (الصورة الجديدة عادةً هتكون Base64)
      if (result.startsWith("data:image")) {
        // تحديث كل من حالة المعاينة والملف
        setPreviews((prev) => {
          const updated = [...prev];
          updated[index] = result;
          return updated;
        });
        setFiles((prev) => {
          const updated = [...prev];
          updated[index] = result;
          return updated;
        });
      } else {
        console.error("Invalid image format");
      }
    };
    reader.readAsDataURL(file);
  };

  // معالجة تغيير ملف الإدخال
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    // إذا كان targetIndex null يتم التعامل معها كتحميل جماعي
    // وإلا يتم تحديث الصورة في الموضع المحدد
    if (targetIndex === null) {
      handleBulkUpload(selectedFiles);
    } else {
      handleSingleUpload(selectedFiles[0], targetIndex);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // دالة لحذف صورة من المكان المحدد
  const handleDelete = (index: number) => {
    setPreviews((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  // دالة ترجع الصور الصالحة (غير null)
  const getValidImages = (): string[] => {
    return files.filter((file): file is string => Boolean(file));
  };

  // إرسال الصور (سواء تم تعديلها أم لا) إلى المكوّن الأب
  useEffect(() => {
    onFilesChange(getValidImages());
  }, [files, onFilesChange]);

  // في حال كنت بحاجة لتعريض الدالة للوالد عبر نافذة المتصفح
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).productImageUpload = {
        getImages: getValidImages,
      };
    }
  }, [files]);

  return (
    <div className="max-w-2xl mx-auto">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        صور المنتج (الحد الأقصى 4 صور)
      </label>
      <div className="mt-1 border-2 border-dashed rounded-lg p-2 border-gray-300">
        <div className="grid grid-cols-2 gap-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className={`relative group h-32 rounded-lg bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors ${
                preview
                  ? "ring-2 ring-blue-400"
                  : "border-2 border-dashed border-gray-300"
              }`}
              onClick={() => {
                setTargetIndex(index);
                fileInputRef.current?.click();
              }}
            >
              {preview ? (
                <>
                {imgLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
                  <Image
                    // إضافة crossOrigin لمصادر الصور الخارجية من API
                    crossOrigin="anonymous"
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      console.error("فشل تحميل الصورة:", preview);
                      // يمكنك حذف الصورة أو استبدالها بصورة بديلة هنا لو حابب
                    }}
                    onLoadingComplete={() => setImgLoading(false)}

                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-sm"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <PhotoIcon className="w-8 h-8 mb-2" />
                  <span className="text-xs max-[950px]:mr-4">اضغط للإضافة</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setTargetIndex(null);
              fileInputRef.current?.click();
            }}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm cursor-pointer"
          >
            أو اختر 4 صور معًا
          </button>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple={targetIndex === null}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AddProductUploadEdit;
