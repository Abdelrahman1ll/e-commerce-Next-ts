"use client";
import { useRef, useState, FC, useEffect } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface AddProductUploadProps {
  onFilesChange: (files: string[]) => void;
}

const AddProductUpload: FC<AddProductUploadProps> = ({ onFilesChange }) => {
  const [previews, setPreviews] = useState<(string | null)[]>(
    Array(4).fill(null)
  );
  const [files, setFiles] = useState<(string | null)[]>(Array(4).fill(null));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  // Handle bulk upload
  const handleBulkUpload = async (newFiles: File[]) => {
    const availableSlots = files.filter((f) => f === null).length;
    const filesToAdd = newFiles.slice(0, availableSlots);

    // Create previews for selected images
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

    // Update states
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

  // Handle single upload
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
    setPreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews[index] = null;
      return newPreviews;
    });

    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = null;
      return newFiles;
    });
  };

  useEffect(() => {
    // Pass only valid base64 strings to parent component
    const validFiles = files.filter(Boolean) as string[];
    onFilesChange(validFiles);
  }, [files, onFilesChange]);

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
              className={`
                relative group h-32 rounded-lg bg-gray-50 flex items-center justify-center
                cursor-pointer hover:bg-gray-100 transition-colors
                ${
                  preview
                    ? "ring-2 ring-blue-400"
                    : "border-2 border-dashed border-gray-300"
                }
              `}
              onClick={() => {
                setTargetIndex(index);
                fileInputRef.current?.click();
              }}
            >
              {preview ? (
                <>
                  {/* Use img instead of Next.js Image for base64 */}
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1
                               hover:bg-red-600 transition-colors shadow-sm"
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

export default AddProductUpload;