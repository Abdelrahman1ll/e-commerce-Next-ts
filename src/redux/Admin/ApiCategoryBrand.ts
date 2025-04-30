import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../Api/baseURL";
import Cookies from "js-cookie";
export const ApiCategoryBrand = createApi({
  reducerPath: "apicategorybrand",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("authToken") || "";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "/api/category",
        method: "GET",
      }),
    }),
    getBrand: builder.query({
      query: () => ({
        url: "/api/brand",
        method: "GET",
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/category/${id}`,
        method: "DELETE",
      }),
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/api/brand/${id}`,
        method: "DELETE",
      }),
    }),
    putCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/category/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    putBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/brand/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    postCategory: builder.mutation({
      query: (data) => ({
        url: "/api/category",
        method: "POST",
        body: data,
      }),
    }),
    postBrand: builder.mutation({
      query: (data) => ({
        url: "/api/brand",
        method: "POST",
        body: data,
      }),
    })
  }),
});

export const {
  useGetCategoryQuery,
  useGetBrandQuery,
  useDeleteCategoryMutation,
  useDeleteBrandMutation,
  usePutCategoryMutation,
  usePutBrandMutation,
  usePostCategoryMutation,
  usePostBrandMutation,
} = ApiCategoryBrand;
