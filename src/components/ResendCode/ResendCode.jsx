import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const ResendCode = ({
  onResend,
  isResending = false,
  email,
  className = "",
  buttonText = "Resend Code",
  countdownText = "Resend code in",
  disabledText = "Resend Code",
}) => {
  const [countdown, setCountdown] = useState(60);
  const [isCountingDown, setIsCountingDown] = useState(true);

  useEffect(() => {
    let timer;
    if (isCountingDown && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountingDown(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, isCountingDown]);

  const handleResend = async () => {
    if (isCountingDown) return;

    try {
      await onResend();
      setCountdown(60);
      setIsCountingDown(true);
    } catch (error) {
      console.error("Resend failed:", error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {email && (
        <p className="text-sm text-gray-500">Code was sent to {email}</p>
      )}

      <div className="flex flex-col items-center gap-2">
        {isCountingDown ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon icon="heroicons:clock" className="h-4 w-4" />
            <span>
              {countdownText} {formatTime(countdown)}
            </span>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResend}
            disabled={isResending}
            className="text-sm"
          >
            {isResending ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                <span>Sending...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Icon icon="heroicons:arrow-path" className="h-4 w-4" />
                <span>{buttonText}</span>
              </div>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResendCode;
