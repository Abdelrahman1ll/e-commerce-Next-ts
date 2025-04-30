"use client";
import {
  useDeleteCartMutation,
  useGetCartQuery,
  useDeleteAllCartMutation,
} from "@/redux/Cart/ApiGetCart";
import { useState, useEffect } from "react";
import notify from "../notify";
const UseCartComponents = () => {
  const [deleteAllCart] = useDeleteAllCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const { data, isLoading, refetch } = useGetCartQuery({});
  const [Amount, setAmount] = useState(0);
  const products = data?.data?.cart;
  const Data = data?.data?.cart?.products;

  const Id = products?._id;
  useEffect(() => {
    if (data?.amount) {
      setAmount(data.amount || 0);
    }
  }, [data]);

  const handleRemove = async (id: string) => {
    try {
      await deleteCart(id).unwrap();
      refetch();
      window.location.reload();
    } catch  {
      notify("حدث خطا ما", "error");
    }
  };

  const handleRemoveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteAllCart().unwrap();
      window.location.reload();
    } catch  {
      notify("حدث خطا ما", "error");
    }
  };
  
  return { products, isLoading, Data, Amount, handleRemove, handleRemoveAll,Id };
};

export default UseCartComponents;
