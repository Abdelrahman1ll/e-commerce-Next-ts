"use client";
import {
  usePostAddressesMutation,
  useGetAddressesQuery,
  usePutAddressesMutation,
  useDeleteAddressesMutation,
} from "@/redux/User/ApiUser";

import { useState } from "react";
import notify from "../notify";
interface Address {
  _id: string;
  alias: string;
    details: string;
    phone: string;
    city: string;
  user: string;
  __v: number;
  createdAt: string;
  updatedAt: string;

}

const UseAddressComponents = () => {
  // اضافة عنوان
  const [open, setOpen] = useState(false);
  const [Addresses, setAddresses] = useState<string>("");
  const [Number, setNumber] = useState<string>("");
  const [Governorate, setGovernorate] = useState<string>("");
  const [selected, setSelected] = useState<string | null>(null);
  // تعديل عنوان
  const [Editopen, setEditopen] = useState(false);
  const [EditAddresses, setEditAddresses] = useState<string>("");
  const [EditNumber, setEditNumber] = useState<string>("");
  const [EditGovernorate, setEditGovernorate] = useState<string>("");
  const [EditId, setEditId] = useState<string>("");
  const [Editselected, setEditselected] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    Number: "",
    Governorate: "",
    Address: "",
    selected: "",
  });

  // اضافة عنوان
  const [postAddresses] = usePostAddressesMutation();
  // تحميل العناوين
  const [putAddresses] = usePutAddressesMutation();
  // حذف عنوان
  const [deleteAddresses] = useDeleteAddressesMutation();

  // اضافة عنوان
  const validateForm = () => {
    const newErrors = { ...errors };

    if (!Number.trim()) {
      newErrors.Number = "رقم الهاتف مطلوب";
    } else if (!/^\d{11}$/.test(Number)) {
      newErrors.Number = "رقم الهاتف غير صالح";
    } else {
      newErrors.Number = "";
    }

    if (!Governorate.trim()) {
      newErrors.Governorate = "المحافظة مطلوبة";
    } else {
      newErrors.Governorate = "";
    }

    if (!Addresses.trim()) {
      newErrors.Address = "العنوان مطلوب";
    } else {
      newErrors.Address = "";
    }

    if (selected === null) {
      newErrors.selected = "يجب اختيار نوع العنوان";
    } else {
      newErrors.selected = "";
    }

    setErrors(newErrors);
  };
  const handleAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
    try {
      await postAddresses({
        alias: selected,
        details: Addresses,
        phone: Number,
        city: Governorate,
      }).unwrap();
      setAddresses("");
      setNumber("");
      setGovernorate("");
      setSelected(null);
      setOpen(false);
      window.location.reload();
    } catch  {
      notify("خطأ في اضافة العنوان", "error");
    }
  };

  // تحميل العناوين
  const { data, isLoading, error } = useGetAddressesQuery({});
  const addresses: Address[] = data?.addresses || [];
  // تعديل العنوان
  const validateEditForm = () => {
    const newErrors = { ...errors };

    if (!EditNumber.trim()) {
      newErrors.Number = "رقم الهاتف مطلوب";
    } else if (!/^\d{11}$/.test(EditNumber)) {
      newErrors.Number = "رقم الهاتف غير صالح";
    } else {
      newErrors.Number = "";
    }

    if (!EditGovernorate.trim()) {
      newErrors.Governorate = "المحافظة مطلوبة";
    } else {
      newErrors.Governorate = "";
    }

    if (!EditAddresses.trim()) {
      newErrors.Address = "العنوان مطلوب";
    } else {
      newErrors.Address = "";
    }

    if (Editselected === null) {
      newErrors.selected = "يجب اختيار نوع العنوان";
    } else {
      newErrors.selected = "";
    }

    setErrors(newErrors);
  };
  const Edit = async (id: string) => {
    setEditopen(true);
    const address = addresses.find((address) => address._id === id);
    if (address) {
      setEditId(address._id);
      setEditAddresses(address.details);
      setEditNumber(address.phone);
      setEditGovernorate(address.city);
      setEditselected(address.alias);
    }
  };
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateEditForm();
    try {
       await putAddresses({
        id: EditId,
        data: {
          alias: Editselected,
          details: EditAddresses,
          phone: EditNumber,
          city: EditGovernorate,
        },
      }).unwrap();
      setEditAddresses("");
      setEditNumber("");
      setEditGovernorate("");
      setEditId("");
      setEditselected(null);
      setEditopen(false);
      window.location.reload();
    } catch  {
      notify("خطأ في تعديل العنوان", "error");
    }
  };

  // حذف العنوان
  const handleDelete = async (id: string) => {
    try {
      await deleteAddresses(id).unwrap();
      window.location.reload();
    } catch  {
      notify("حدث خطا ما", "error");
    }
  };
 
  return {
    handleAddress,
    handleEdit,
    Edit,
    handleDelete,
    isLoading,
    addresses,
    Editopen,
    setEditopen,
    error,
    Governorate,
    setGovernorate,
    Addresses,
    setAddresses,
    Number,
    setNumber,
    EditNumber,
    setEditNumber,
    EditGovernorate,
    setEditGovernorate,
    EditAddresses,
    setEditAddresses,
    Editselected,
    setEditselected,
    open,
    setOpen,
    selected,
    setSelected,
    errors,
  };
};

export default UseAddressComponents;
