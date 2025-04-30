"use client";
import SlidingPanel from "./SlidingPanel";
import Cart from "./Cart";
import { ListFilter } from "lucide-react";
import FilterByPrice from "./FilterByPrice";
import UseMainComponents from "./Main-Components";
const MainComponents = () => {
  const { product, isLoading, isOpen, setIsOpen, isoPen, setIsoPen } =
    UseMainComponents();
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
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8 ">
        <div className="flex mb-10  justify-between">
          <div
            onClick={() => setIsoPen(!isoPen)}
            className="flex  rounded-sm px-2 py-2 text-gray-700  hover:text-gray-500"
          >
            <FilterByPrice oPen={isoPen} toggleMenu={() => setIsoPen(false)} />
          </div>

          <div className="flex  rounded-sm px-2 py-2 text-gray-700  hover:text-gray-500 ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex justify-between items-center w-full px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none cursor-pointer"
            >
              <SlidingPanel
                open={isOpen}
                togglePanel={() => setIsOpen(false)}
              />
              الفلتر <ListFilter className="ml-2" />
            </button>
          </div>
        </div>

        <div className="w-full container mx-auto px-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {isLoading ? (
              [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))
            ) : product.length !== 0 ? (
              product.map((product: ProductTy) => (
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
    </div>
  );
};

export default MainComponents;
