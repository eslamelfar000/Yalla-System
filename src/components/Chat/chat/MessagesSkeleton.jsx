import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MessagesSkeleton = ({ count = 8 }) => {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`flex gap-2 ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {index % 2 === 0 && (
            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          )}

          <div className={`max-w-[70%] ${index % 2 === 0 ? "ml-2" : "mr-2"}`}>
            <Skeleton
              className={`h-16 rounded-lg ${
                index % 2 === 0 ? "bg-muted" : "bg-primary"
              }`}
            />
            <Skeleton className="h-3 w-16 mt-1" />
          </div>

          {index % 2 === 1 && (
            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessagesSkeleton;
