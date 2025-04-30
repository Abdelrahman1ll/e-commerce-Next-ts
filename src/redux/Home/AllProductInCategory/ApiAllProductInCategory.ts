import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../../Api/baseURL";

export const ApiAllProductInCategory = createApi({
  reducerPath: "apiAllProductInCategory",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (builder) => ({
    getAllProductInCategory: builder.query({
      query: (id) => ({
        url: `/api/AllProductInCategory/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductInCategoryQuery } = ApiAllProductInCategory;