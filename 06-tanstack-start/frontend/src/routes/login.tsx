import { createFileRoute, redirect } from "@tanstack/react-router";
import { Login } from "#components/login.component";

interface LoginSearch {
  redirect?: string;
}

export const Route = createFileRoute("/login")({
  validateSearch: (search: LoginSearch): LoginSearch => ({
    redirect: search.redirect || "/",
  }),
  beforeLoad: async ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: search.redirect,
      });
    }
  },
  component: Login,
});
