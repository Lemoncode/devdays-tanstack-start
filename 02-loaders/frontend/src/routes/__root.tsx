import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Navbar, Footer } from "#components";

export const Route = createRootRoute({
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
