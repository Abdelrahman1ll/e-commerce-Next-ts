"use client";
import { useGetProductsQuery } from "@/redux/Home/Product/ApiProducts";
import { useState, useEffect } from "react";

const UseMainComponents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isoPen, setIsoPen] = useState(false);
  
  const priceQuery = () => {
    const storedMin = Number(localStorage.getItem("min")) || 0;
    const storedMax = Number(localStorage.getItem("max")) || 0;
    const storedSort = localStorage.getItem("sort") || "";
    const storedCategory = localStorage.getItem("selectedCategoryIds");
    const storedBrand = localStorage.getItem("selectedBrandIds");

    let query = "/api/Product?";
    const params = [];

    if (storedMin  && storedMin > 0) {
      params.push(`price[gte]=${storedMin}`);
    }

    if (storedMax && storedMax > 0) {
      params.push(`price[lte]=${storedMax}`);
    }

    if (storedSort && storedSort === "السعر من الاقل الى الاعلى") {
      params.push("sort=price");
    } else if (storedSort && storedSort === "السعر من الاعلى الى الاقل") {
      params.push("sort=-price");
    }

    if (storedCategory && storedCategory !== "null") {
      try {
        const categoryIds = JSON.parse(storedCategory);
        if (Array.isArray(categoryIds) && categoryIds.length > 0) {
          categoryIds.forEach((id) => {
            params.push(`Category=${id}`);
          });
        }
      } catch (error) {
        console.error("Error parsing category IDs:", error);
      }
    }

    // Add brand filtering if brands are selected
    if (storedBrand && storedBrand !== "null") {
      try {
        const brandIds = JSON.parse(storedBrand);
        if (Array.isArray(brandIds) && brandIds.length > 0) {
          brandIds.forEach((id) => {
            params.push(`brand=${id}`);
          });
        }
      } catch (error) {
        console.error("Error parsing brand IDs:", error);
      }
    }

    // Join parameters with '&' only if there are any
    if (params.length > 0) {
      query += params.join("&");
    } else {
      return "/api/Product";
    }
    return query;
  };

  const { data, isLoading, refetch } = useGetProductsQuery(priceQuery());

  const product = data?.data.products || [];

  useEffect(() => {
    refetch();
  }, []);

  
  return {
    product,
    isLoading,
    isOpen,
    setIsOpen,
    isoPen,
    setIsoPen,
  };
};

export default UseMainComponents;
