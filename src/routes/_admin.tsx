import Layout from "@/common/components/Layout";
import { authApi } from "@/features/auth/api";
import { forceLogout, getAccessToken } from "@/features/auth/utils";
import { store } from "@/redux/store";
import { QueryError } from "@/redux/types";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  beforeLoad: async () => {
    try {
      if (!getAccessToken()) {
        throw new Error("Unauthorized");
      }
      const res = await store.dispatch(authApi.endpoints.getProfile.initiate());

      if (!res.isSuccess) {
        throw new Error((res.error as QueryError).data.message);
      }

      if (res.data.view.type !== "ADMIN") {
        throw redirect({ to: "/dashboard" });
      }
    } catch (e) {
      if (e instanceof Error) {
        forceLogout();
        throw redirect({ to: "/login" });
      }
      throw e;
    }
  },
  component: AdminLayoutComponent,
});

function AdminLayoutComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
