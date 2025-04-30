// src/redux/Orders/ApiOrder.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../Api/baseURL";
import Cookies from "js-cookie";
export const ApiOrders = createApi({
  // <-- Add 'export' here
  reducerPath: "apiOrder",
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
    postOrder: builder.mutation({
      query: (data) => ({
        url: "/api/order",
        method: "POST",
        body: data,
      }),
    }),
    getOrder: builder.query({
      query: () => ({
        url: "/api/order/user",
        method: "GET",
      }),
    }),
    getAllOrder: builder.query({
      query: () => ({
        url: "/api/order",
        method: "GET",
      }),
    }),
    putPay: builder.mutation({
      query: (id) => ({
        url: `/api/order/${id}/pay`,
        method: "PUT",
      }),
    }),
    putDeliver: builder.mutation({
      query: (id) => ({
        url: `/api/order/${id}/deliver`,
        method: "PUT",
      }),
    }),
    CardOrder: builder.mutation({
      query: (data) => ({
        url: "/api/v1/order-card",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  usePostOrderMutation,
  useGetOrderQuery,
  useGetAllOrderQuery,
  usePutPayMutation,
  usePutDeliverMutation,
  useCardOrderMutation,
} = ApiOrders;
