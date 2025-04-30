"use client";
import { useCallback, useState } from "react";
import { usePutProductMutation } from "@/redux/Admin/ApiProduct";
import { useGetProductsQuery } from "@/redux/Home/Product/ApiProducts";
import {
  useGetBrandQuery,
  useGetCategoryQuery,
} from "@/redux/Admin/ApiCategoryBrand";
import notify from "@/Components/notify";

// تعريف نوع المنتج
type ProductTy = {
  _id: string;
  title: string;
  price: string;
  PriceBeforeDiscount?: string;
  image: string;
  images?: string[];
  Evaluation: number;
  quantity: number;
  description: string;
  Category: string;
  brand: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
};

const UseAllProductsComponents = () => {
  // استعلامات API
  const [putProduct, { isLoading: isPutLoading }] = usePutProductMutation();
  const { data, isLoading, refetch } = useGetProductsQuery("/api/Product");
  const { data: categories } = useGetCategoryQuery({});
  const { data: brands } = useGetBrandQuery({});

  // تعريف products باستخدام بيانات الاستعلام
  const products: ProductTy[] = data?.data.products || [];
  const categoriesArray = categories?.data || [];
  const brandsArray = brands?.data || [];

  const [editOpen, setEditOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  // حالات النموذج
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [uploadKey, setUploadKey] = useState(0);
  // أخطاء التحقق من صحة النموذج
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    category: "",
    image: "",
  });

  // تجهيز المنتج للتعديل
  const handleEditId = (id: string) => {
    try {
      const product = products.find((prod: ProductTy) => prod._id === id);
      if (product) {
        setSelectedProductId(id);
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setPriceBeforeDiscount(product.PriceBeforeDiscount || "");
        // تحويل الكمية إلى سلسلة لتجنب أخطاء trim
        setQuantity(product.quantity.toString());
        setBrand(product.brand);
        setCategory(product.Category);

        // const productImages = product.images && product.images.length > 0
        // ? product.images
        // : [product.image];
        setImages(
          product.images && product.images.length > 0
            ? product.images
            : [product.image]
        );

        setEditOpen(true);
      }
    } catch {
      notify("حدث خطا ما", "error");
    }
  };

  const handleFiles = useCallback((files: string[]) => {
    setImages(files);
  }, []);

  // const base64ToBlob = async (imageData: string) => {
  //   try {
  //     // Check if it's a URL (not a base64 string)
  //     if (imageData.startsWith("http") || imageData.startsWith("/")) {
  //       // For URLs, fetch the image and convert to blob
  //       const response = await fetch(imageData);
  //       return await response.blob();
  //     }

  //     // Process base64 data
  //     if (!imageData || !imageData.includes(",")) {
  //       throw new Error("Invalid base64 format");
  //     }

  //     const parts = imageData.split(",");
  //     const mimeMatch = parts[0].match(/:(.*?);/);

  //     if (!mimeMatch) {
  //       throw new Error("Invalid MIME type in base64 data");
  //     }

  //     const mime = mimeMatch[1];
  //     const byteString = atob(parts[1]);
  //     const arrayBuffer = new ArrayBuffer(byteString.length);
  //     const uintArray = new Uint8Array(arrayBuffer);

  //     for (let i = 0; i < byteString.length; i++) {
  //       uintArray[i] = byteString.charCodeAt(i);
  //     }

  //     return new Blob([arrayBuffer], { type: mime });
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // دالة تحديث المنتج
  const base64ToBlob = async (imageData: string): Promise<Blob> => {
    try {
      // إذا كانت الصورة رابطًا مباشرًا
      if (imageData.startsWith('http')) {
        const response = await fetch(imageData, {
          mode: 'cors',
          headers: new Headers({
            'Origin': window.location.origin
          })
        });
        
        if (!response.ok) throw new Error('Failed to fetch image');
        return await response.blob();
      }
  
      // إذا كانت بيانات base64
      const parts = imageData.split(',');
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mime = mimeMatch?.[1] || 'image/jpeg';
      const byteString = atob(parts[1]);
      const buffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(buffer);
  
      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }
  
      return new Blob([buffer], { type: mime });
    } catch (error) {
      console.error('Image processing error:', error);
      throw new Error('فشل في معالجة الصورة');
    }
  };
 
  const handleUpdate = async (e: React.FormEvent) => {
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
    if (Number(price) <= 0) {
      newErrors.price = "الرجاء ادخال سعر المنتج";
      valid = false;
    } else if (
      priceBeforeDiscount &&
      Number(price) >= Number(priceBeforeDiscount)
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
    if (!brand.trim()) {
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
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("brand", brand);
        formData.append("Category", category);

        if (priceBeforeDiscount) {
          formData.append("PriceBeforeDiscount", priceBeforeDiscount);
        }

        // if (images.length > 0) {
        //   try {
        //     const mainImageBlob = await base64ToBlob(images[0]);
        //     await formData.append("image", mainImageBlob, "main-image.jpg");
        //   } catch {}
        // }

        // // Process all additional images
        // for (let i = 0; i < images.length; i++) {
        //   try {
        //     const imageBlob = await base64ToBlob(images[i]);
        //     await formData.append("images", imageBlob, `image-${i + 1}.jpg`);
        //   } catch {
        //     notify("حدث خطا ما", "error");
        //   }
        // }

        if (images.length > 0) {
          for (const [index, img] of images.entries()) {
            try {
              const isExistingImage = img.startsWith('http');
              if (!isExistingImage) {
                const imageBlob = await base64ToBlob(img);
                formData.append(index === 0 ? 'image' : 'images', imageBlob);
              } else if (index === 0) {
                formData.append('image', img);
              } else {
                formData.append('images', img);
              }
            } catch (error) {
              console.error(`Failed to process image ${index}:`, error);
            }
          }
        }

        await putProduct({
          id: selectedProductId,
          data: formData,
        }).unwrap();
        setUploadKey((prev) => prev + 1);
        setEditOpen(false);
        refetch();
        resetForm();
      } catch  {
        notify("حدث خطا ما", "error");
        
      }
    }
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setPriceBeforeDiscount("");
    setQuantity("");
    setBrand("");
    setCategory("");
    setImages([]);

    setErrors({
      title: "",
      description: "",
      price: "",
      quantity: "",
      brand: "",
      category: "",
      image: "",
    });
  };

  return {
    handleEditId,
    handleUpdate,
    editOpen,
    title,
    description,
    price,
    quantity,
    brand,
    category,
    handleFiles,
    errors,
    isLoading,
    brandsArray,
    categoriesArray,
    setEditOpen,
    setTitle,
    setDescription,
    setPriceBeforeDiscount,
    priceBeforeDiscount,
    setPrice,
    setQuantity,
    setCategory,
    uploadKey,
    setBrand,
    products,
    images,
    isPutLoading,
  };
};

export default UseAllProductsComponents;
