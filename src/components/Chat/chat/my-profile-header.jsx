import React from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MyProfileHeader = () => {
  // Get current user data from localStorage
  const user_data = JSON.parse(localStorage.getItem("user_data") || "null");

  // If no profile data at all, show a default student profile
  if (!user_data) {
    return (
      <>
        <div className="">
          <div className="flex  gap-3 border-b border-default-200 p-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div className="block">
              <div className="text-sm font-medium text-default-900 ">
                <span className="relative before:h-1.5 before:w-1.5 before:rounded-full before:bg-success before:absolute before:top-1.5 before:-right-3">
                  Student
                </span>
              </div>
              <span className="text-xs text-default-600">
                Loading profile...
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="">
        <div className="flex  gap-3 border-b border-default-200 p-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user_data?.image} alt="" />
            <AvatarFallback>
              {user_data?.name?.slice(0, 2).toUpperCase() || "ST"}
            </AvatarFallback>
          </Avatar>
          <div className="block">
            <div className="text-sm font-medium text-default-900 ">
              <span className="relative before:h-1.5 before:w-1.5 before:rounded-full before:bg-success before:absolute before:top-1.5 before:-right-3">
                {user_data?.name || "Student"}
              </span>
            </div>
            <span className="text-xs text-default-600">
              {user_data?.role === "student"
                ? "Student"
                : user_data?.about || "Student"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfileHeader;
