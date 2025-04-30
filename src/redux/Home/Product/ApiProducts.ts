import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../../Api/baseURL";
import Cookies from "js-cookie";
export const ApiProductsGetAll = createApi({
  reducerPath: "apiProducts",
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
    getProducts: builder.query({
      query: (url) => {
        return {
          url,
          method: "GET",
        };
      },
    }),
    getOneProduct: builder.query({
      query: (id) => ({
        url: `/api/Product/${id}`,
        method: "GET",
      }),
    }),
    postReview: builder.mutation({
      query: (data) => ({
        url: "/api/Review",
        method: "POST",
        body: data,
      }),
    }),
    getReviews: builder.query({
      query: (id) => ({
        url: `/api/Review/product/${id}`,
        method: "GET",
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/api/Review/${id}`,
        method: "DELETE",
      }),
    }),
    putReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/Review/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  usePostReviewMutation,
  useGetReviewsQuery,
  useDeleteReviewMutation,
  usePutReviewMutation,
} = ApiProductsGetAll;
