import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginResponse, ProfileResponse } from "./types";
import { makeBaseQuery, transformErrorResponse } from "@/redux/rtk-query";

export const authApi = createApi({
  reducerPath: "_rtkQuery/auth",
  baseQuery: makeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      transformErrorResponse,
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "/self/profile",
        method: "GET",
      }),
      transformErrorResponse,
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery, useLazyGetProfileQuery } =
  authApi;
