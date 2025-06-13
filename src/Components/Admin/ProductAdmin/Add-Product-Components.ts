"use client";
import { useCallback } from "react";
import { useState } from "react";
import { usePostAddProductMutation } from "../../../redux/Admin/ApiProduct";
import notify from "../../notify";

import { SerializedError } from "@reduxjs/toolkit";
import {
  useGetBrandQuery,
  useGetCategoryQuery,
} from "@/redux/Admin/ApiCategoryBrand";
interface ApiError extends SerializedError {
  data?: {
    message?: string;
    status?: string;
    error?: {
      statusCode?: number;
      isOperational?: boolean;
    };
  };
  status?: number;
}

const UseAddProductComponents = () => {
  const { data: categories } = useGetCategoryQuery({});
  const { data: brands } = useGetBrandQuery({});
  const [addProduct, { isLoading }] = usePostAddProductMutation();
  const categoriesArray = categories?.data || [];
  const brandsArray = brands?.data || [];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [PriceBeforeDiscount, setPriceBeforeDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    category: "",
    image: "",
  });
  const handleFiles = useCallback((files: string[]) => {
    setImages(files);
  }, []);

  const base64ToBlob = (base64Str: string) => {
    try {
      // Make sure the base64 string is properly formatted
      if (!base64Str || !base64Str.includes(",")) {
        throw new Error("Invalid base64 format");
      }

      const parts = base64Str.split(",");
      const mimeMatch = parts[0].match(/:(.*?);/);

      if (!mimeMatch) {
        throw new Error("Invalid MIME type in base64 data");
      }

      const mime = mimeMatch[1];
      const byteString = atob(parts[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }

      return new Blob([arrayBuffer], { type: mime });
    } catch (error) {
      throw error;
    }
  };
  const [uploadKey, setUploadKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    if (!title.trim()) {
      newErrors.title = "الرجاء ادخال اسم المنتج";
      valid = false;
    } else {
      newErrors.title = "";
    }
    if (!description.trim()) {
      newErrors.description = "الرجاء ادخال وصف المنتج";
      valid = false;
    } else {
      newErrors.description = "";
    }
    if (!price.trim()) {
      newErrors.price = "الرجاء ادخال سعر المنتج";
      valid = false;
    } else if (
      PriceBeforeDiscount &&
      Number(price) >= Number(PriceBeforeDiscount)
    ) {
      newErrors.price = "سعر المنتج يجب ان يكون اصغر من سعر الخصم";
      valid = false;
    } else {
      newErrors.price = "";
    }

    if (!quantity.trim()) {
      newErrors.quantity = "الرجاء ادخال الكمية";
      valid = false;
    } else {
      newErrors.quantity = "";
    }
    if (!Brand.trim()) {
      newErrors.brand = "الرجاء ادخال العلامة التجارية";
      valid = false;
    } else {
      newErrors.brand = "";
    }
    if (!category.trim()) {
      newErrors.category = "الرجاء ادخال القسم";
      valid = false;
    } else {
      newErrors.category = "";
    }

    if (!images.length) {
      newErrors.image = "الرجاء اختيار صورة المنتج";
      valid = false;
    } else {
      newErrors.image = "";
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (PriceBeforeDiscount) {
          formData.append("PriceBeforeDiscount", PriceBeforeDiscount);
        }
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("brand", Brand);
        formData.append("Category", category);
        // if (images.length > 0) {
        //   try {
        //     const mainImageBlob = base64ToBlob(images[0]);
        //     await formData.append("image", mainImageBlob, "main-image.jpg");
        //   } catch {
        //     notify("حدث خطا ما", "error");
        //   }
        // }

        // Add additional images
        for (let i = 0; i < images.length; i++) {
          try {
            const imageBlob = base64ToBlob(images[i]);
            await formData.append("images", imageBlob, `image-${i + 1}.jpg`);
          } catch {
            notify("حدث خطا ما", "error");
          }
        }

        await addProduct(formData).unwrap();

        notify("تم اضافة المنتج بنجاح", "success");
        setTitle("");
        setDescription("");
        setPrice("");
        setPriceBeforeDiscount("");
        setQuantity("");
        setBrand("");
        setCategory("");
        setImages([]);
        setUploadKey((prev) => prev + 1);
      } catch (error) {
        if (isApiError(error)) {
          notify("حدث خطا ما", "error");
        }
      }
    }
  };

  function isApiError(error: unknown): error is ApiError {
    return (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof error.data === "object" &&
      error.data !== null
    );
  }

  return {
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    PriceBeforeDiscount,
    setPriceBeforeDiscount,
    quantity,
    setQuantity,
    Brand,
    setBrand,
    category,
    setCategory,

    uploadKey,
    handleSubmit,
    errors,
    isLoading,
    categoriesArray,
    handleFiles,
    brandsArray,
  };
};

export default UseAddProductComponents;
