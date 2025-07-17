import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ChatListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 border-l-2 border-transparent hover:bg-second cursor-pointer"
        >
          {/* Avatar skeleton */}
          <div className="relative">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-2 w-2 rounded-full absolute bottom-0 right-0" />
          </div>

          {/* Content skeleton */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>

          {/* Time and badge skeleton */}
          <div className="flex flex-col items-end gap-2 hidden lg:flex">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-3 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListSkeleton;
