"use client";
import dynamic from 'next/dynamic';
import { useGetAllProductInCategoryQuery } from '@/redux/Home/AllProductInCategory/ApiAllProductInCategory';
import { useEffect, useState } from 'react';

const Cart = dynamic(() => import('../Home/Cart'), {
  ssr: false,
  loading: () => <div className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
});
type ProductTy = {
  _id: string;
  title: string;
  price: string;
  image: string;
  Evaluation: number;
  quantity: number;
  description: string;
  Category: string;
  brand: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
};
const AllProductinCategoryComponents = () => {
  const [id, setCategoryId] = useState<string | null>(null);
 

  useEffect(() => {
    
      const categoryId = localStorage.getItem("category");
      setCategoryId(categoryId);
    
  }, []);
  const { data, isLoading } = useGetAllProductInCategoryQuery(id);
  const Data = data?.data?.products;
  const displayedProducts = Data?.slice(0, 4);


  return (
    <>
    {
      displayedProducts?.length ? (
        <div className="mb-6 p-4  border border-gray-200 rounded-md shadow-md bg-white ml-4 mr-4">
        <div className="w-full container mx-auto px-4">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {isLoading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
          ))
        ) : displayedProducts?.length ? (
          displayedProducts.map((product:ProductTy) => (
            <Cart key={product._id} product={product} />
          ))
        ) : (
          <div className="font-bold text-2xl col-span-full text-center">
            لا يوجد منتجات
          </div>
        )}
      </div>
    </div>
    </div>

      ):("")
    }
    
    </>
  );
};

export default dynamic(() => Promise.resolve(AllProductinCategoryComponents), {
  ssr: false
});