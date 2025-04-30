import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../Api/baseURL";
import Cookies from "js-cookie";
export const ApiProducts = createApi({
  reducerPath: "apiProductPost",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("authToken");
      
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postAddProduct: builder.mutation({
      query: (data) => ({
        url: "/api/Product",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/api/user",
        method: "GET",
      }),
    }),
    postDeliveryAndtax: builder.mutation({
      query: (data) => ({
        url: "/api/deliveryAndtax",
        method: "POST",
        body: data,
      }),
    }),
    getDeliveryAndtax: builder.query({
      query: () => ({
        url: "/api/deliveryAndtax",
        method: "GET",
      }),
    }),
    putProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/Product/${id}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const {
  usePostAddProductMutation,
  useGetAllUsersQuery,
  usePostDeliveryAndtaxMutation,
  useGetDeliveryAndtaxQuery,
  usePutProductMutation,
} = ApiProducts;
