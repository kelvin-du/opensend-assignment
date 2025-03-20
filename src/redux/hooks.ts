import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./types";
import { dashboardSlice } from "@/features/dashboard/slice";
import { authApi } from "@/features/auth/api";
import { storeApi } from "@/features/store/api";
import { useCallback } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useResetStore = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(dashboardSlice.actions.reset());
    dispatch(authApi.util.resetApiState());
    dispatch(storeApi.util.resetApiState());
  }, [dispatch]);
};
