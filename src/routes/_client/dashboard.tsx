import { NewWidgetButton } from "@/features/dashboard/components/NewWidgetButton";
import { WidgetBoard } from "@/features/dashboard/components/WidgetBoard";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_client/dashboard")({
  beforeLoad: async ({ context }) => {
    const { storeInfo } = context;

    if (storeInfo.store.onboarding_procedure.onboarding_status !== "DONE") {
      throw redirect({ to: "/onboarding" });
    }
    return context;
  },
  component: DashboardRouteComponent,
});

function DashboardRouteComponent() {
  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center pb-2 md:pb-3">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex-1" />
        <NewWidgetButton />
      </div>
      <WidgetBoard />
    </div>
  );
}
