import type React from "react";

export const Navbar = () => {
  return (
    <nav className="navbar bg-accent text-accent-content shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <Menu>
          <li>
            <a className="text-lg">Home</a>
          </li>
          <li>
            <a className="text-lg">Post list</a>
          </li>
          <li>
            <a className="text-lg">First post</a>
          </li>
        </Menu>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Using TanStack Router</a>
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
        className="menu menu-sm dropdown-content bg-accent-content text-accent font-bold z-1 w-52 p-2 shadow rounded-box"
      >
        {children}
      </ul>
    </div>
  );
};
