import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../Api/baseURL";
import Cookies from "js-cookie";
export const ApiCustomers = createApi({
  reducerPath: "apiCustomers",
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
    getCustomers: builder.query({
      query: () => `/api/customers`,
    }),
    postCustomer: builder.mutation({
      query: (data) => ({
        url: "/api/customers",
        method: "POST",
        body: data,
      }),
    }),
    putCustomer: builder.mutation({
      query: ({ id , data }) => ({
        url: `/api/customers/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/api/customers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  usePostCustomerMutation,
  usePutCustomerMutation,
  useDeleteCustomerMutation,
} = ApiCustomers;
