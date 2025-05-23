"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import {Link} from "react-router-dom";
import { profileUser, contacts, chats } from "../../Chat/chat/data";

const ProfileInfo = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className=" cursor-pointer user-select-none border-2 border-main rounded-full p-0.5 select-none"
      >
        <div className="flex items-center">
          {profileUser?.avatar && (
            <img
              src={profileUser?.avatar}
              alt={profileUser?.avatar ?? ""}
              width={30}
              height={30}
              className="rounded-full"
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0 " align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3 ">
          {profileUser?.avatar && (
            <img
              src={profileUser?.avatar}
              alt={profileUser?.avatar ?? ""}
              width={36}
              height={36}
              className="border-2 border-main rounded-full p-0.5"
            />
          )}
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
              {profileUser?.fullName ?? "Mcc Callem"}
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-default-600 hover:text-primary"
            >
              @uxuidesigner
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {[
            {
              name: "profile",
              icon: "heroicons:user",
              href: "/profile",
            },
            // {
            //   name: "Billing",
            //   icon: "heroicons:megaphone",
            //   href:"/dashboard"
            // },
            {
              name: "Settings",
              icon: "heroicons:paper-airplane",
              href: "/profile-setting",
            },
            // {
            //   name: "Keyboard shortcuts",
            //   icon: "heroicons:language",
            //   href:"/dashboard"
            // },
          ].map((item, index) => (
            <Link
              to={item.href}
              key={`info-menu-${index}`}
              className="cursor-pointer"
            >
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 hover:bg-second cursor-pointer opacity-70 hover:opacity-100 transition">
                <Icon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <Link href="/dashboard" className="cursor-pointer">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
              <Icon icon="heroicons:user-group" className="w-4 h-4" />
              team
            </DropdownMenuItem>
          </Link> */}
          {/* <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background">
              <Icon icon="heroicons:user-plus" className="w-4 h-4" />
              Invite user
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {[
                  {
                    name: "email",
                  },
                  {
                    name: "message",
                  },
                  {
                    name: "facebook",
                  },
                ].map((item, index) => (
                  <Link
                    href="/dashboard"
                    key={`message-sub-${index}`}
                    className="cursor-pointer"
                  >
                    <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub> */}
          {/* <Link href="/dashboard">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
              <Icon icon="heroicons:variable" className="w-4 h-4" />
              Github
            </DropdownMenuItem>
          </Link> */}

          {/* <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
              <Icon icon="heroicons:phone" className="w-4 h-4" />
              Support
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {[
                  {
                    name: "portal",
                  },
                  {
                    name: "slack",
                  },
                  {
                    name: "whatsapp",
                  },
                ].map((item, index) => (
                  <Link href="/dashboard" key={`message-sub-${index}`}>
                    <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mb-0 bg-border" />
        <DropdownMenuItem
          onSelect={() => signOut()}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 hover:bg-second cursor-pointer opacity-70 hover:opacity-100 transition"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
