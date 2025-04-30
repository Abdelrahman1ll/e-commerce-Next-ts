import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../Api/baseURL";
import Cookies from "js-cookie";
export const ApiMaintenance = createApi({
  reducerPath: "apiMaintenance",
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
    PostMaintenance: builder.mutation({
      query: (data) => ({
        url: "/api/maintenance",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    getMaintenance: builder.query({
      query: () => ({
        url: "/api/maintenance/user",
        method: "GET",
      }),
    }),
    getAllMaintenance: builder.query({
      query: () => ({
        url: "/api/maintenance",
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePostMaintenanceMutation,
  useGetMaintenanceQuery,
  useGetAllMaintenanceQuery,
} = ApiMaintenance;
export const ApiOrders = createApi({
  // <-- Add 'export' here
  reducerPath: "apiOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
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
    // putPaymentCallback: builder.mutation({
    //   query: (query) => ({
    //     url: "/order-card",
    //     method: "PUT",
    //     body: query,
    //   }),
    // })
  }),
});
