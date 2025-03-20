import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_client/onboarding")({
  beforeLoad: async ({ context }) => {
    const { storeInfo } = context;

    if (storeInfo.store.onboarding_procedure.onboarding_status !== "DONE") {
      return context;
    }
    throw redirect({ to: "/dashboard" });
  },
  component: OnboardingRouteComponent,
});

function OnboardingRouteComponent() {
  return (
    <div className="p-2 md:p-4">
      <h1 className="text-xl font-bold">Onboarding page</h1>
    </div>
  );
}
