import { createApi } from "@reduxjs/toolkit/query/react";
import { makeBaseQuery, transformErrorResponse } from "@/redux/rtk-query";
import { StoreInfoResponse } from "./types";

export const storeApi = createApi({
  reducerPath: "_rtkQuery/store",
  baseQuery: makeBaseQuery(),
  endpoints: (builder) => ({
    getStoreInfo: builder.query<StoreInfoResponse, number | undefined>({
      query: (id) => ({
        url: `/store/${id}`,
        method: "GET",
      }),
      transformErrorResponse,
    }),
  }),
});

export const { useGetStoreInfoQuery, useLazyGetStoreInfoQuery } = storeApi;
