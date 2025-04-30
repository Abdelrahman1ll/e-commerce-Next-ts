"use client";
import {  useState, useEffect } from "react";
import { usePostMaintenanceMutation } from "@/redux/Orders/ApiMaintenance";
import notify from "../notify";
import { useRouter } from "next/navigation";
import { useGetAddressesQuery } from "@/redux/User/ApiUser";

interface Address {
    _id: string;
    alias: string;
  }
const UseMaintenanceComponents = () => {
 const router = useRouter();
  const { data } = useGetAddressesQuery({});
  const addresses = data?.addresses || [];
  const [selected, setSelected] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({
    selected: "",
    productDetails: "",
    selectedAddress: "",
    images: "",
  });
  useEffect(() => {
    if (selectedAddress) {
      const address = addresses.find((a: Address) => a._id === selectedAddress);
      if (address) {
        setAlias(address.alias);
        setDetails(address.details);
        setPhone(address.phone);
        setCity(address.city);
      }
    }
  }, [selectedAddress, addresses]);
  const [postMaintenance, { isLoading }] = usePostMaintenanceMutation();
  const handleFileUpload = (imageData: string) => {
    setImages([imageData]);
  };

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

    if (selected === null) {
      newErrors.selected = "الرجاء اختيار المنتج";
      valid = false;
    } else {
      newErrors.selected = "";
    }
    if (!productDetails.trim()) {
      newErrors.productDetails = "الرجاء ادخال وصف المنتج";
      valid = false;
    } else {
      newErrors.productDetails = "";
    }
    if (selectedAddress === "") {
      newErrors.selectedAddress = "الرجاء اختيار عنوان";
      valid = false;
    } else {
      newErrors.selectedAddress = "";
    }

    if (images.length === 0) {
      newErrors.images = "الرجاء اختيار صورة";
      valid = false;
    } else {
      newErrors.images = "";
    }
    setErrors(newErrors);
    if (valid) {
      try {
        const formData = new FormData();
        formData.append("title", selected || "");
        formData.append("description", productDetails);
        formData.append("alias", alias);
        formData.append("details", details);
        formData.append("phone", phone);
        formData.append("city", city);

        if (images.length > 0) {
          try {
            const mainImageBlob = base64ToBlob(images[0]);
           await formData.append("image", mainImageBlob);
          } catch  {
            
          }
        }
        await postMaintenance(formData).unwrap();
        setSelected(null);
        setProductDetails("");
        setSelectedAddress("");
        setImages([]);
        setAlias("");
        setDetails("");
        setPhone("");
        setCity("");
        setUploadKey((prev) => prev + 1);
        notify("تم ارسال الطلب بنجاح", "success");
        router.push("/user/maintenance-requests");
      } catch (err: any) {
        console.log(err)
        if (
          err.data.message === "You do not have permission to access this path."
        ) {
          notify("غير مسموح للادمن ده خاص للعملاء", "error");
        } else if (
          err.data.message ===
          "You are not logged in. Please log in to access this page."
        ) {
          notify("يرجى تسجيل الدخول", "error");
          router.push("/logIn");
        }else{
          notify("حدث خطأ ما", "error");
          
        }
      }
    }
  };


  return {
    selected,
    setSelected,
    productDetails,
    setProductDetails,
    selectedAddress,
    setSelectedAddress,
    addresses,
    handleFileUpload,
    handleSubmit,
    errors,
    uploadKey,
    isLoading,
    
  };
};

export default UseMaintenanceComponents;