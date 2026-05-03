import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../Api/baseURL";
import Cookies from "js-cookie";
import { getMockData } from "../mockData/index";

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers) => {
    // Both authToken and userData might be used
    const token = Cookies.get("authToken") || Cookies.get("userData") || "";
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const method = typeof args === "string" ? "GET" : args.method || "GET";
  const url = typeof args === "string" ? args : args.url;

  // Condition 1: Block all methods except GET, unless it's login
  if (method !== "GET" && !url.includes("login")) {
    console.warn(`Request ${method} to ${url} blocked. Only GET allowed.`);
    return { data: getMockData(url) };
  }

  try {
    const result = await baseQuery(args, api, extraOptions);

    // Condition 2: If the backend is not working (network error, 404, 500, etc.)
    if (result.error && (result.error.status !== 400 && result.error.status !== 401 && result.error.status !== 422)) {
      console.warn(`Backend failed for ${url} with status ${result.error.status}, falling back to mock data...`);
      return { data: getMockData(url) };
    }

    return result;
  } catch (error) {
    console.warn(`Fetch threw an error for ${url}, falling back to mock data...`, error);
    return { data: getMockData(url) };
  }
};
