import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutate } from "@/hooks/UseMutate";
import { toast } from "sonner";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";
import ResendCode from "@/components/ResendCode/ResendCode";

const verificationSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Code must be numeric"),
});

const EmailVerificationBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Check if email is not verified
  const isEmailNotVerified = !user?.email_verified_at;

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const { mutate: verifyMutate } = useMutate({
    method: "POST",
    endpoint: "verify-email",
    text: "Email verified successfully!",
    onSuccess: () => {
      setIsOpen(false);
      // Refresh the page to update the user data
      window.location.reload();
    },
  });

  const { mutate: resendMutate } = useMutate({
    method: "POST",
    endpoint: "resend-otp",
    text: "Verification code resent successfully!",
  });

  const onSubmit = (data) => {
    setIsVerifying(true);
    verifyMutate(
      {
        otp: data.code,
        email: user?.email,
      },
      {
        onSettled: () => {
          setIsVerifying(false);
        },
      }
    );
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendMutate({ email: user?.email });
    } catch (error) {
      console.error("Resend failed:", error);
    } finally {
      setIsResending(false);
    }
  };

  // Handle dialog open - automatically send verification code
  const handleDialogOpen = async (open) => {
    setIsOpen(open);

    // When dialog opens, automatically send verification code
    if (open && user?.email) {
      setIsResending(true);
      try {
        await resendMutate({ email: user?.email });
      } catch (error) {
        toast.error("Failed to send verification code. Please try again.");
      } finally {
        setIsResending(false);
      }
    }
  };

  const codeValue = watch("code");

  // Don't show the bar if email is verified or no user
  if (!user || isEmailNotVerified === false) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <Icon
            icon="material-symbols:warning-outline"
            className="h-5 w-5 text-yellow-600"
          />
          <div className="flex-1">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">
                Please verify your email address.
              </span>
              <span className="ml-1">
                click the button below and check your inbox at {user?.email}
              </span>
            </p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
          <DialogTrigger asChild>
            <Button
              // variant="outline"
              size="sm"
              className=""
            >
              Verify Email
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                Verify Your Email Address
              </DialogTitle>
              <DialogDescription className="text-center">
                Enter the 6-digit verification code sent to {user?.email}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4 text-center flex flex-col items-center">
                <Label htmlFor="code">Verification Code</Label>
                <InputOTP
                  maxLength={6}
                  value={codeValue}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={(value) => setValue("code", value)}
                ></InputOTP>
                {errors.code && (
                  <p className="text-sm text-red-500">{errors.code.message}</p>
                )}

                <ResendCode
                  onResend={handleResend}
                  isResending={isResending}
                  email={user?.email}
                  className="mt-4"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" disabled={isVerifying} className="flex-1">
                  {isVerifying ? (
                    <BtnLoading text="Verifying..." />
                  ) : (
                    <>
                      <CheckBadgeIcon className="h-4 w-4 mr-2" />
                      Verify Code
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmailVerificationBar;
