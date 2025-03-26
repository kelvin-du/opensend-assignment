import { authApi } from "@/features/auth/api";
import { forceLogout, getAccessToken } from "@/features/auth/utils";
import { store } from "@/redux/store";
import { QueryError } from "@/redux/types";
import { createFileRoute, redirect } from "@tanstack/react-router";

const redirectToDefaultRoute = async () => {
  try {
    if (!getAccessToken()) {
      forceLogout();
      throw redirect({ to: "/login" });
    }
    const profileResponse = await store.dispatch(
      authApi.endpoints.getProfile.initiate()
    );
    if (!profileResponse.isSuccess) {
      throw new Error((profileResponse.error as QueryError).data.message);
    }

    const userProfile = profileResponse.data;

    if (userProfile.view.type === "ADMIN") {
      throw redirect({ to: "/admin" });
    }
    throw redirect({ to: "/dashboard" });
  } catch (e) {
    if (e instanceof Error) {
      forceLogout();
      throw redirect({ to: "/login" });
    }
    throw e;
  }
};

export const Route = createFileRoute("/")({
  beforeLoad: redirectToDefaultRoute,
  component: RouteComponent,
});

function RouteComponent() {
  return <>hre</>;
}
