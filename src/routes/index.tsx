import { getAccessToken } from "@/features/auth/utils";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad() {
    if (!getAccessToken()) {
      throw redirect({ to: "/login" });
    }
    throw redirect({ to: "/dashboard" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <></>;
}
