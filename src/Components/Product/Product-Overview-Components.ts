"use client";
import { useGetCartQuery, usePostCartMutation } from "@/redux/Cart/ApiGetCart";
import { useGetProductsQuery } from "@/redux/Home/Product/ApiProducts";
import { useEffect, useState } from "react";
import notify from "../notify";
type Props = {
  id: string;
  _id: string;
  images: string[];
  price: string;
  title: string;
  description: string;
  PriceBeforeDiscount: string;
  quantity: number;
};
const UseProductOverviewComponents = ({ id }: Props) => {
  const { data } = useGetProductsQuery("/api/Product");
  const products = data?.data.products || [];
  const product = products.find(
    (item: Props) => item._id === id || item.id === id
  );
  
  const categoryId = product?.Category;
  if (categoryId) {
    localStorage.removeItem("category");
    const cleanCategoryId = categoryId.replace(/[[\]']+/g, "");
    localStorage.setItem("category", cleanCategoryId);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const images = product?.images || [];
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
 
  const [quantity, setQuantity] = useState(1);

  // تحديث selectedImage بعد تحميل بيانات المنتج
  useEffect(() => {
    if (product && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [product, images]);

  const handleNextImage = () => {
    const currentIndex = images.indexOf(selectedImage);

    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const [postCart] = usePostCartMutation();
  // هذا هو الـ refetch الخاص بالسلة
  const { refetch: refetchCart } = useGetCartQuery({});
  const handleCart = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(quantity > product?.quantity){
        notify("الكمية المطلوبة غير متاحة", "error");
        return;

      }
      if (quantity < 1) {
        notify("الكمية يجب أن تكون أكبر من 0", "error");
        return;
      }
      if(!id){
        notify("يرجى اختيار منتج", "error");
        return;
      }
      await postCart({ productId: id, quantity: quantity }).unwrap();
      refetchCart();
    } catch (error) {
      
      if (
        error.data?.message ===
        "You do not have permission to access this path."
      ) {
        notify("غير مسموح للادمن باضافه منتج في السله", "error");
      }else if (
        error.data?.message ==="You are not logged in. Please log in to access this page."
      ){
        notify("يرجى تسجيل الدخول", "error");
      }
    }
  };

  return {
    product,
    images,
    selectedImage,
    handleNextImage,
    quantity,
    setQuantity,
    setSelectedImage,
    handleCart,
  };
};

export default UseProductOverviewComponents;
