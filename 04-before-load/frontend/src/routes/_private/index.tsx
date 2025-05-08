import { createFileRoute } from "@tanstack/react-router";
import { Home } from "#components";

export const Route = createFileRoute("/_private/")({
  component: Home,
});
