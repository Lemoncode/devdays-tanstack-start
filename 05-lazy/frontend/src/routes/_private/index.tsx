import { createFileRoute } from "@tanstack/react-router";
import { Home } from "#components/home.component";

export const Route = createFileRoute("/_private/")({
  component: Home,
});
