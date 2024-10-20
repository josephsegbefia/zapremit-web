"use client";

import { Loader, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DottedSeparator } from "@/components/shared-components/dotted-separator";
import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";

export const UserButton = () => {
  const { data: user, isLoading } = useCurrent();
  const { mutate: logout } = useLogout();

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-teal-600 border border-neutral-300">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!user) {
    return null;
  }
  const { name, email } = user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 rounded-full flex items-center justify-center bg-teal-600 hover:opacity-75 transition">
          <AvatarFallback className="font-medium bg-teal-600 text-white flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4 border border-neutral-300 rounded-md shadow-lg">
          <Avatar className="size-[52px] rounded-full flex items-center justify-center bg-teal-600 transition">
            <AvatarFallback className="bg-teal-600 font-medium text-xl text-white flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || "User"}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
          <DottedSeparator className="mb-1" />
          <DropdownMenuItem
            className="h-5 flex items-center justify-center text-amber-700 font-medium cursor-pointer outline-none hover:bg-slate-300 px-10 py-5"
            onClick={() => logout()}
          >
            <LogOut className="size-4 mr-2 " />
            Log out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
