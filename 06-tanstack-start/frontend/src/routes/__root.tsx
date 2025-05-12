import appStyles from "../index.css?url";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { RouterContext } from "#common/router";
import { queryClient } from "#common/query";

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "Using TanStack Start" },
    ],
    links: [
      {
        type: "text/css",
        rel: "stylesheet",
        href: appStyles,
      },
    ],
  }),
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      await context.auth.fetchAuthUser();
    }
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" data-theme="corporate">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <ReactQueryDevtools />
        </QueryClientProvider>
        <TanStackRouterDevtools />
        <Scripts />
      </body>
    </html>
  );
}
