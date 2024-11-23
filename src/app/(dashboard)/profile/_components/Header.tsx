"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Avatar from "@/ui/Avatar";
import ButtonIcon from "@/ui/ButtonIcon";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";
import SideBar from "./SideBar";

export default function Header({}) {
  const { user, isLoading } = useAuth();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const closeDrawerHandler = () => setIsOpenDrawer(false);

  return (
    <header
      className={`flex w-full items-center justify-between px-4 py-5 lg:px-8 ${isLoading ? "bg-opacity-30 blur-md" : "bg-secondary-0"}`}
    >
      <ButtonIcon
        variant="outline"
        className="block border-none lg:hidden"
        onClick={() => setIsOpenDrawer(!isOpenDrawer)}
      >
        {isOpenDrawer ? <XMarkIcon /> : <Bars3Icon />}
      </ButtonIcon>

      <span className="text-sm font-bold text-secondary-700 lg:text-lg">
        سلام؛ {user?.name}
      </span>

      <Link href="/profile">
        <Avatar src={user?.avatarUrl || null} alt={user?.name || null} />
      </Link>

      <Drawer isOpen={isOpenDrawer} onClose={closeDrawerHandler}>
        <SideBar onClose={closeDrawerHandler} />
      </Drawer>
    </header>
  );
}
