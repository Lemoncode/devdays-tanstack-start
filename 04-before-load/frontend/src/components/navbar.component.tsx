import React from "react";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  const { auth } = useRouteContext({ from: "__root__" });
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-accent text-accent-content shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <Menu>
          <li>
            <Link to="/" className="text-lg">
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" className="text-lg">
              Post list
            </Link>
          </li>
          <li>
            <Link
              to="/posts/$postId"
              params={{ postId: "1" }}
              className="text-lg"
            >
              First post
            </Link>
          </li>
        </Menu>
      </div>
      <div className="navbar-center">
        <a
          className="btn btn-ghost text-xl capitalize"
          onClick={() => navigate({ to: "/" })}
        >
          Hola {auth.user}!
        </a>
      </div>

      <div className="navbar-end">
        <button
          className="btn btn-ghost btn-circle"
          onClick={async () => {
            await auth.logout();
            navigate({ to: "/login", search: { redirect: location.pathname } });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

const Menu: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />{" "}
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-accent-content text-accent font-bold z-1 w-52 p-2 shadow rounded-box"
      >
        {children}
      </ul>
    </div>
  );
};
