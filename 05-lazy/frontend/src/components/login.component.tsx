import React from "react";
import { getRouteApi } from "@tanstack/react-router";

export const Login = () => {
  const route = getRouteApi("/login");
  const { auth } = route.useRouteContext();
  const search = route.useSearch();
  const navigate = route.useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = state;
    await auth.login(email, password);
    navigate({ to: search.redirect });
  };

  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const handleChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setState((prev) => ({ ...prev, [name]: value }));
    };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content w-full max-w-sm">
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                value={state.email}
                className="input"
                onChange={handleChange("email")}
              />
              <label className="label">Password</label>
              <input
                type="password"
                value={state.password}
                className="input"
                onChange={handleChange("password")}
              />
              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};
