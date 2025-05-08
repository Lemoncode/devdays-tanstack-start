import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Navbar } from "#components/navbar.component";
import { Footer } from "#components/footer.component";

export const Route = createFileRoute("/_private")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: { redirect: location.pathname },
      });
    }
  },
  component: Layout,
});

function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Navbar />
      <main className="h-full overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
