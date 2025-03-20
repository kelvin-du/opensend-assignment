import { useResetStore } from "@/redux/hooks";
import { useNavigate } from "@tanstack/react-router";
import { clearAllTokens } from "./utils";
import { useCallback } from "react";

export const useLogout = () => {
  const resetStore = useResetStore();
  const navigate = useNavigate();

  return useCallback(() => {
    clearAllTokens();
    resetStore();
    navigate({ to: "/login" });
  }, [navigate, resetStore]);
};
