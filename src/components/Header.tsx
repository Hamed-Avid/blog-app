"use client";

import { useAuth } from "@/context/AuthContext";
import NavLink from "./NavLink";

const navLinks = [
  {
    title: "خانه",
    path: "/",
  },
  {
    title: "بلاگ ها",
    path: "/blogs",
  },
];

export default function Header() {
  const { user, isLoading } = useAuth();

  return (
    <header
      className={`sticky top-0 z-10 mb-10 border-b border-b-secondary-300 bg-inherit shadow-md transition-all duration-200 ${isLoading ? "opacity-70 blur-sm" : "opacity-100 blur-0"}`}
    >
      <nav className="container xl:max-w-screen-xl">
        <div className="flex items-center justify-between py-2 text-secondary-400">
          <ul className="flex items-center gap-x-10">
            {navLinks.map(({ path, title }, index) => {
              return (
                <li key={index}>
                  <NavLink path={path}>{title}</NavLink>
                </li>
              );
            })}
          </ul>
          {user ? (
            <NavLink path="/profile">پروفایل</NavLink>
          ) : (
            <NavLink path="/signin">ورود</NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
