import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "../routeTree.gen";
import { queryClient } from "./query";

export interface RouterContext {
  queryClient: QueryClient;
}

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  } as RouterContext,
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
