import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../Api/baseURL";

export const ApiFilterbyNumberValue = createApi({
  reducerPath: "apiFilterbyNumberValue",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (builder) => ({
    getFilterbyNumberValue: builder.query({
      query: ({ g, l }) => ({
        url: `/api/Product?price[gte]=${g}&price[lte]=${l}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFilterbyNumberValueQuery } = ApiFilterbyNumberValue;
