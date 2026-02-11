import { FaBell, FaSearch } from "react-icons/fa";
import Input from "./Input";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/stores";
import Button from "./Button";
import { useState } from "react";
import { AUTH_PREFIX, DEFAULT_AUTH_REDIRECT_ROUTE } from "@/data/routes.data";

export default function Header() {
  const { name, email, isLoggedIn, profilePicture } = useAuth();
  const [isNotification] = useState(true);
  const { pathname } = useLocation();
  const isAuthRoute = pathname.startsWith(AUTH_PREFIX);

  if (isAuthRoute) return null;
  return (
    <div className="bg-sur w-full p-4 flex items-center justify-between gap-6 border-b border-b-bor sticky top-0 right-0">
      <Input className="pl-2 w-[15rem]" placeholder="Search...">
        <FaSearch className="size-3 text-muted" />
      </Input>

      <div className="flex items-center justify-center gap-4">
        <Button className="border border-bor p-3 rounded-full relative">
          <FaBell className="size-4" />

          {isNotification && (
            <div className="absolute top-0 right-0 size-2.5 rounded-full bg-destructive"></div>
          )}
        </Button>

        {isLoggedIn ? (
          <NavLink
            to={"/user"}
            className="flex items-center justify-center gap-2 "
          >
            <div className="bg-pri size-12 rounded-full flex items-center justify-center text-bg text-lg font-medium">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt={`${name} profile picture`}
                  className="size-12 rounded-full"
                />
              ) : (
                (name || "").at(0)?.toUpperCase()
              )}
            </div>

            <div>
              <p className="text-g font-medium">{name}</p>
              <p className="text-xs">{email}</p>
            </div>
          </NavLink>
        ) : (
          <NavLink to={DEFAULT_AUTH_REDIRECT_ROUTE}>
            <Button btnType="primary" className="text-nowrap">
              Log in
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
