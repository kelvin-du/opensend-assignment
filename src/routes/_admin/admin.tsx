import { useGetProfileQuery } from "@/features/auth/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin")({
  component: AdminRouteComponent,
});

function AdminRouteComponent() {
  const { data: profile } = useGetProfileQuery();

  return (
    <>
      <div className="p-2 md:p-4">
        <h1 className="text-xl font-bold">Admin page</h1>
        <p>Hello {profile?.user.first_name}</p>
      </div>
    </>
  );
}
