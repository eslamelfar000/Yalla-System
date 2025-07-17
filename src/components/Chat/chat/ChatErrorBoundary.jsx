import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const ChatErrorBoundary = ({ error, resetError }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <div className="mb-4">
        <Icon
          icon="material-symbols:error-outline"
          className="text-6xl text-red-500 mb-4"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-4 max-w-md">
        {error?.message ||
          "An error occurred while loading the chat. Please try again."}
      </p>
      <Button
        onClick={resetError}
        className="bg-main text-primary-foreground hover:bg-main/90"
      >
        Try Again
      </Button>
    </div>
  );
};

export default ChatErrorBoundary;
