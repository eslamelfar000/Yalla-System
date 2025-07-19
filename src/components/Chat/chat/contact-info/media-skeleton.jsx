import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MediaSkeleton = () => {
  return (
    <div className="space-y-4 mt-5">
      {/* First Row */}
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-16 w-full rounded-md" />
        <Skeleton className="h-16 w-full rounded-md" />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-16 w-full rounded-md" />
        <Skeleton className="h-16 w-full rounded-md" />
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-16 w-full rounded-md" />
        <Skeleton className="h-16 w-full rounded-md" />
      </div>
    </div>
  );
};

export default MediaSkeleton;
