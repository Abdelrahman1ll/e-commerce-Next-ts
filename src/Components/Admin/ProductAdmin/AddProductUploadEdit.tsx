"use client";
import { useRef, useState, FC, useEffect } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
interface AddProductUploadProps {
  initialImages?: (string | null)[];
  onFilesChange: (files: string[], deleted: string[]) => void;
}

const AddProductUploadEdit: FC<AddProductUploadProps> = ({
  initialImages = [],
  onFilesChange,
}) => {
  const [previews, setPreviews] = useState<(string | null)[]>(initialImages);
  const [files, setFiles] = useState<(string | null)[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const initialRef = useRef<(string | null)[]>([]);

  useEffect(() => {
    if (initialRef.current.length === 0) {
      const filledInitials = [...initialImages];
      while (filledInitials.length < 4) {
        filledInitials.push(null);
      }

      setPreviews(filledInitials);
      setFiles(filledInitials);
      initialRef.current = initialImages;
    }
  }, [initialImages]);

  const handleBulkUpload = async (newFiles: File[]) => {
    const availableSlots = files.filter((f) => f === null).length;
    const filesToAdd = newFiles.slice(0, availableSlots);

    const newPreviews = await Promise.all(
      filesToAdd.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      )
    );

    setPreviews((prev) => {
      const updated = [...prev];
      let previewIndex = 0;
      return updated.map((p) =>
        p === null && previewIndex < newPreviews.length
          ? newPreviews[previewIndex++]
          : p
      );
    });

    setFiles((prev) => {
      const updated = [...prev];
      let fileIndex = 0;
      return updated.map((f) =>
        f === null && fileIndex < newPreviews.length
          ? newPreviews[fileIndex++]
          : f
      );
    });
  };

  const handleSingleUpload = async (file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;

      setPreviews((prev) => {
        const newPreviews = [...prev];
        newPreviews[index] = result;
        return newPreviews;
      });

      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = result;
        return newFiles;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    if (targetIndex === null) {
      handleBulkUpload(selectedFiles);
    } else {
      handleSingleUpload(selectedFiles[0], targetIndex);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (index: number) => {
    const removed = files[index];

    if (removed && initialRef.current.includes(removed)) {
      setDeletedImages((prev) => [...prev, removed]);
    }

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

  useEffect(() => {
    const validFiles = files.filter(Boolean) as string[];
    onFilesChange(validFiles, deletedImages);
  }, [files, deletedImages, onFilesChange]);

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
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    width={128}
                    height={128}
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
                <div className="flex flex-col items-center justify-center text-gray-600">
                  <PhotoIcon className="w-8 h-8 mb-2" />
                  <span className="text-xs">اضغط للإضافة</span>
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
