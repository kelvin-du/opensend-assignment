import { persistor, store } from "@/redux/store";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const Route = createRootRoute({
  component: () => (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Outlet />
          <TanStackRouterDevtools />
        </PersistGate>
      </Provider>
    </>
  ),
});
