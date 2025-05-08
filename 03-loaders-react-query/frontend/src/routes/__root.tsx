import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { RouterContext } from "#common/router";
import { Navbar, Footer } from "#components";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Navbar />
      <main className="h-full overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </div>
  );
}
