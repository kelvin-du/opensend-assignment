import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken, getClientToken } from "@/features/auth/utils";
import { QueryError } from "./types";

const BASE_URL = "https://stgapp-bwgkn3md.opensend.com";

export const makeBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      const clientToken = getClientToken();

      if (token) {
        headers.set("Access-Token", `Bearer ${token}`);
      }
      if (clientToken) {
        headers.set("Client-Token", clientToken);
      }

      return headers;
    },
  });

export const isQueryError = (error: unknown): error is QueryError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "message" in error.data
  );
};

const extractErrorMessage = (error: string): string => {
  const parts = error.split("::");
  return parts.length > 1 ? parts[1].trim() : error;
};

/**
 * Transforms the error response from the API into a string
 * @param error - The error response from the API
 * @returns The error message after "::" or the original error if no "::" is found
 */
export const transformErrorResponse = (error: unknown): QueryError => {
  if (isQueryError(error)) {
    return {
      ...error,
      data: {
        ...error.data,
        message: extractErrorMessage(error.data.message),
      },
    };
  }
  return {
    status: 500,
    data: {
      code: "INTERNAL_SERVER_ERROR",
      log_id: "INTERNAL_SERVER_ERROR",
      message: "Unknown error",
    },
  };
};
