"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import SideBarNav from "./SideBarNav";
import ButtonIcon from "@/ui/ButtonIcon";

type SideBarProps = { onClose?: () => void };

export default function SideBar({ onClose }: SideBarProps) {
  // const { logout } = useAuth();

  const logoutHandler = async () => {
    // await logout;
  };

  return (
    <div className="flex h-screen flex-col overflow-y-auto p-6 pt-10 lg:pt-8">
      <div className="mb-5 flex w-full items-center justify-between border-b border-b-secondary-200 pb-2">
        <Link
          href="/"
          className="flex items-center justify-center gap-x-4 text-secondary-700"
        >
          <HomeIcon className="h-6 w-6" />
          <span> نکست بلاگ</span>
        </Link>

        <ButtonIcon
          onClick={onClose}
          variant="outline"
          className="block border-none lg:hidden"
        >
          <XMarkIcon />
        </ButtonIcon>
      </div>

      <div className="flex-auto overflow-y-auto">
        <SideBarNav />
        <div
          onClick={logoutHandler}
          className="flex cursor-pointer items-center gap-x-2 rounded-2xl px-4 py-3 font-medium text-secondary-700 transition-all duration-200 hover:text-red-400"
        >
          <ArrowLeftStartOnRectangleIcon className="ml-4 h-5 w-5" />
          <span>خروج</span>
        </div>
      </div>
    </div>
  );
}
