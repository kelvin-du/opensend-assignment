import { redirectToDefaultRoute } from "@/common/utils/router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: redirectToDefaultRoute,
  component: RouteComponent,
});

function RouteComponent() {
  return <></>;
}
