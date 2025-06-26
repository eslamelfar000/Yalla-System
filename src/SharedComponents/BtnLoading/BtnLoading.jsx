import { LoaderPinwheel } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils"; // shadcn utility for class merging
import { Icon } from "@iconify/react";

const BtnLoading = ({ text = "", className = "", size="8" }) => {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LoaderPinwheel className={`w-${size} h-${size} animate-spin`} />
      <span>{text}</span>
    </span>
  );
};

export default BtnLoading;
