import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../Api/baseURL";
import Cookies from "js-cookie";
export const ApiAuth = createApi({
  reducerPath: "signupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("userData") || "";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postSignup: builder.mutation({
      query: (data) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    postLogIn: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body:data,
      })
    }),
    postGoogle: builder.mutation({
      query: (data) => ({
        url: "/api/auth/signup-google",
        method: "POST",
        body:data,
      })
    }),

  }),
});

export const { usePostSignupMutation,usePostLogInMutation,usePostGoogleMutation } = ApiAuth;
