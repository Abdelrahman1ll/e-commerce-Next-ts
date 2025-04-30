import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../Api/baseURL";
import Cookies from "js-cookie";
export const ApiUser = createApi({
  reducerPath: "apiuser",
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
    putUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/user/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    postAddresses: builder.mutation({
      query: (data) => ({
        url: "/api/addresses",
        method: "POST",
        body: data,
      }),
    }),
    getAddresses: builder.query({
      query: () => ({
        url: "/api/addresses",
        method: "GET",
      }),
    }),
    putAddresses: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/addresses/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAddresses: builder.mutation({
      query: (id) => ({
        url: `/api/addresses/${id}`,
        method: "DELETE",
      }),
    }),
    putForgotPassword: builder.mutation({
      query: ({data, id}) => ({
        url: `/api/user/forgot-password/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  usePutUserMutation,
  usePostAddressesMutation,
  useGetAddressesQuery,
  usePutAddressesMutation,
  useDeleteAddressesMutation,
  usePutForgotPasswordMutation,
} = ApiUser;
