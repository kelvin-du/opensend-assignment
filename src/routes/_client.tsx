import Layout from "@/common/components/Layout";
import { authApi } from "@/features/auth/api";
import { forceLogout, getAccessToken } from "@/features/auth/utils";
import { storeApi } from "@/features/store/api";
import { store } from "@/redux/store";
import { QueryError } from "@/redux/types";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_client")({
  beforeLoad: async () => {
    try {
      if (!getAccessToken()) {
        throw new Error("Unauthorized");
      }
      const profileResponse = await store.dispatch(
        authApi.endpoints.getProfile.initiate()
      );
      if (!profileResponse.isSuccess) {
        throw new Error((profileResponse.error as QueryError).data.message);
      }

      if (profileResponse.data.view.type === "ADMIN") {
        throw redirect({ to: "/admin" });
      }
      const userProfile = profileResponse.data;

      const storeResponse = await store.dispatch(
        storeApi.endpoints.getStoreInfo.initiate(
          userProfile.accesses[0].store_id
        )
      );
      if (!storeResponse.isSuccess) {
        throw new Error((storeResponse.error as QueryError).data.message);
      }
      const storeInfo = storeResponse.data;

      return { userProfile, storeInfo };
    } catch (e) {
      if (e instanceof Error) {
        forceLogout();
        throw redirect({ to: "/login" });
      }
      throw e;
    }
  },
  component: ClientLayoutComponent,
});

function ClientLayoutComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
