import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../Api/baseURL";
import Cookies from "js-cookie";
export const ApiGetCart = createApi({
  reducerPath: "apiGetCart",
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
    getCart: builder.query({
      query: () => ({
        url: "/api/cart",
        method: "GET",
      }),
    }),
    postCart: builder.mutation({
      query: (data) => ({
        url: "/api/cart",
        method: "POST",
        body: data,
      }),
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/api/cart/${id}`,
        method: "DELETE",
      }),
    }),
    deleteAllCart: builder.mutation({
      query: () => ({
        url: "/api/cart",
        method: "DELETE",
      }),
      // invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  usePostCartMutation,
  useDeleteCartMutation,
  useDeleteAllCartMutation,
} = ApiGetCart;
