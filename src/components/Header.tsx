import { FaSearch } from "react-icons/fa";
import Input from "./Input";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/stores";
import Button from "./Button";
import {
  AUTH_PREFIX,
  CREATOR_STREAM_ROUTE,
  DEFAULT_AUTH_REDIRECT_ROUTE,
} from "@/data/routes.data";
import Notification from "./Notification";
import { UserHeaderDropdown } from "@/features/user/components";
import { useState } from "react";

export default function Header() {
  const { isLoggedIn } = useAuth();
  const { pathname } = useLocation();
  const isAuthRoute = pathname.startsWith(AUTH_PREFIX);
  const isStreamRoute = pathname.startsWith(CREATOR_STREAM_ROUTE);
  const [{ duration, isLive }] = useState({
    isLive: false,
    duration: "00:00",
  });

  if (isAuthRoute) return null;

  return (
    <div className="bg-sur w-full p-4 flex items-center justify-between gap-6 border-b border-b-bor sticky top-0 right-0 z-50">
      <Input className="pl-2 w-[15rem]" placeholder="Search...">
        <FaSearch className="size-3 text-muted" />
      </Input>

      <div className="flex items-center justify-center gap-4">
        {isStreamRoute && isLive && (
          <div className="flex items-center justify-center gap-2">
            <p className="bg-red-600 py-1.5 px-3 rounded-md font-medium">
              Live
            </p>
            <div className="border border-bor py-1.5 px-2.5 rounded-md bg-bg">
              <p className="font-medium">{duration}</p>
            </div>
            <Button btnType="primary" disabled className="text-nowrap text-sm">
              End Stream
            </Button>
          </div>
        )}
        <Notification />

        {isLoggedIn ? (
          <UserHeaderDropdown />
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
