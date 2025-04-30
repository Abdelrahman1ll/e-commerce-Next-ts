/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import notify from "@/Components/notify";
import {
  useDeleteCustomerMutation,
  useGetCustomersQuery,
  usePostCustomerMutation,
  usePutCustomerMutation,
} from "@/redux/CustomersWhoAreNotOnTheSite/ApiCustomers";
import React, { useState } from "react";
type Props = {
  _id: string;
  name: string;
  phoneNumber: string;
  data: string;
  updatedAt: string;
};
const UseCustomersComponents = () => {
     const { data, isLoading: Dataloading, refetch } = useGetCustomersQuery({});
      const Customers = data?.data;
    
      const [postCustomer, { isLoading: Postloading }] = usePostCustomerMutation();
      const [deleteCustomer, { isLoading: Deleteloading }] =
        useDeleteCustomerMutation();
    
      const [Name, setName] = useState("");
      const [Phone, setPhone] = useState("");
      const [Data, setData] = useState("");
      const [errors, setErrors] = useState({
        Name: "",
        Phone: "",
        Data: "",
        NameEdit: "",
        PhoneEdit: "",
        DataEdit: "",
      });
    
      // اطافة عميل
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
          Name: "" as string,
          Phone: "" as string,
          Data: "" as string,
        };
        let valid = true;
    
        if (!Name.trim()) {
          newErrors.Name = "لا يمكن ان يكون الاسم فارغ";
          valid = false;
        } else if (Name.length < 3) {
          newErrors.Name = "الاسم غير صالح";
          valid = false;
        } else {
          newErrors.Name = "";
        }
    
        if (!Phone.trim()) {
          newErrors.Phone = "لا يمكن ان يكون الرقم فارغ";
          valid = false;
        } else if (Phone.length < 11 || Phone.length > 11) {
          newErrors.Phone = "الرقم غير صالح";
          valid = false;
        } else {
          newErrors.Phone = "";
        }
    
        if (!Data.trim()) {
          newErrors.Data = "لا يمكن ان يكون الطلب فارغ";
          valid = false;
        } else {
          newErrors.Data = "";
        }
    
        setErrors(newErrors as typeof errors);
        if (valid) {
          try {
             await postCustomer({
              name: Name,
              phoneNumber: Phone,
              data: Data,
            }).unwrap();
            setName("");
            setPhone("");
            setData("");
            refetch();
          } catch (error: string | any) {
            
            if (error.data?.message === "Customer already exists.") {
              notify("العميل موجود بالفعل", "error");
            }else {
              notify("حدث خطأ", "error");
            }
            
          }
        }
      };
    
      const [open, setOpen] = useState(false);
      const [selectedProductId, setSelectedProductId] = useState<string | null>(
        null
      );
      const [putCustomer, { isLoading: Putloading }] = usePutCustomerMutation();
      const openDeleteDialog = (id: string) => {
        setSelectedProductId(id);
        setOpen(true);
      };
    
      // دالة حذف المنتج
      const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          if (selectedProductId) {
            await deleteCustomer(selectedProductId).unwrap();
            setOpen(false);
            refetch();
            setSelectedProductId(null);
          }
        } catch  {
          notify("حدث خطأ", "error");
        }
      };
    
      const [openEdit, setOpenEdit] = useState(false);
      const [NameEdit, setNameEdit] = useState("");
      const [PhoneEdit, setPhoneEdit] = useState("");
      const [DataEdit, setDataEdit] = useState("");
      const [EditId, setEditId] = useState(null);
      const handleEdit = (id: string) => {
        setOpenEdit(true);
        const customer = Customers?.find((c:Props) => c._id === id);
        if (customer) {
          setEditId(customer._id);
          setNameEdit(customer?.name);
          setPhoneEdit(customer?.phoneNumber);
          setDataEdit(customer?.data);
        }
      };
    
      const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
          NameEdit: "",
          PhoneEdit: "",
          DataEdit: "",
        };
        let valid = true;
    
        if (!NameEdit.trim()) {
          newErrors.NameEdit = "لا يمكن ان يكون الاسم فارغ";
          valid = false;
        } else if (NameEdit.length < 3) {
          newErrors.NameEdit = "الاسم غير صالح";
          valid = false;
        } else {
          newErrors.NameEdit = "";
        }
    
        if (!PhoneEdit.trim()) {
          newErrors.PhoneEdit = "لا يمكن ان يكون الرقم فارغ";
          valid = false;
        } else if (PhoneEdit.length < 11 || PhoneEdit.length > 11) {
          newErrors.PhoneEdit = "الرقم غير صالح";
          valid = false;
        } else {
          newErrors.PhoneEdit = "";
        }
    
        if (!DataEdit.trim()) {
          newErrors.DataEdit = "لا يمكن ان يكون الطلب فارغ";
          valid = false;
        } else {
          newErrors.DataEdit = "";
        }
    
        setErrors(newErrors as typeof errors);
    
        if (valid) {
          try {
            await putCustomer({
              id: EditId,
              data: {
                name: NameEdit,
                phoneNumber: PhoneEdit,
                data: DataEdit,
              },
            }).unwrap();
            setNameEdit("");
            setPhoneEdit("");
            setDataEdit("");
            setOpenEdit(false);
            refetch();
          } catch  {
            
            notify("حدث خطأ", "error");
          }
        }
      };


    return {
        handleDelete,
        openDeleteDialog,
        handleEdit,
        handleUpdate,
        openEdit,
        NameEdit,
        PhoneEdit,
        DataEdit,
        open,
        Name,
        Phone,
        Data,
        Putloading,
        Customers,
        handleSubmit,
        Dataloading,
        errors,
        Postloading,
        Deleteloading,
        setOpen,
        setOpenEdit,
        setNameEdit,
        setPhoneEdit,
        setDataEdit,
        setName,
        setData,
        setPhone
    }
};

export default UseCustomersComponents;