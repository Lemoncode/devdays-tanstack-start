import type React from "react";
import { Link } from "react-router";
import { routes } from "#common/router";

export const Navbar = () => {
  return (
    <nav className="navbar bg-primary text-primary-content shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <Menu>
          <li>
            <Link to={routes.home} className="text-lg">
              Home
            </Link>
          </li>
          <li>
            <Link to={routes.posts} className="text-lg">
              Post list
            </Link>
          </li>
          <li>
            <Link to={routes.post(1)} className="text-lg">
              First post
            </Link>
          </li>
        </Menu>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Using React Router</a>
      </div>

      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />{" "}
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
        className="menu menu-sm dropdown-content bg-primary-content text-primary font-bold z-1 w-52 p-2 shadow rounded-box"
      >
        {children}
      </ul>
    </div>
  );
};
