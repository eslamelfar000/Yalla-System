import React from "react";
import { CircularProgress } from "@/components/ui/progress";
const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <div>
        <CircularProgress
          value="50"
          color="default"
          loading
          size="xs"
          className="text-main"
        />
      </div>
    </div>
  );
};

export default Loader;
