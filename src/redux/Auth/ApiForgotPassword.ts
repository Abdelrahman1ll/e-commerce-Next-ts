import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../Api/baseURL";
export const ApiForgotPassword = createApi({
  reducerPath: "apiforgotpassword",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (builder) => ({
    postForgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    postResetCode: builder.mutation({
      query: (data) => ({
        url: "/api/reset-code",
        method: "POST",
        body: data,
      }),
    }),
    postResetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/reset-password",
        method: "POST",
        body: data,
      }),
    })
  }),
});


export const { usePostForgotPasswordMutation ,usePostResetCodeMutation,usePostResetPasswordMutation} = ApiForgotPassword