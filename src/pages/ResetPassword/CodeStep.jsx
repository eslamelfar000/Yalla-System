import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import AuthImageSide from "@/components/AuthImageSide/AuthImageSide";
import logo from "../../assets/logo.png";
import login from "../../assets/login.png";
import { useMutate } from "@/hooks/UseMutate";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";
import ResendCode from "@/components/ResendCode/ResendCode";

const verificationSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Code must be numeric"),
});

function CodeStep({ onNext, onBack }) {
  const email = localStorage.getItem("to-reset-email") || "test@test.com";
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      email: email || "",
      code: "",
    },
  });

  const { mutate, isPending } = useMutate({
    method: "POST",
    endpoint: "verify-email",
    text: "verified successfully!",
    onSuccess: () => {
      onNext();
    },
  });

  const { mutate: resendMutate } = useMutate({
    method: "POST",
    endpoint: "resend-otp",
    text: "Verification code resent successfully!",
  });

  const onSubmit = (data) => {
    mutate({ otp: data.code, email: email });
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendMutate({ email });
    } catch (error) {
      console.error("Resend failed:", error);
    } finally {
      setIsResending(false);
    }
  };

  const codeValue = watch("code");

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 text-center flex flex-col items-center">
        <InputOTP
          maxLength={6}
          value={codeValue}
          onChange={(value) => setValue("code", value)}
        />
        {errors.code && (
          <p className="text-sm text-red-500">{errors.code.message}</p>
        )}
        <ResendCode
          onResend={handleResend}
          isResending={isResending}
          email={email}
          className="mt-4"
        />
      </div>

      <div className="flex  gap-2">
        <Button
          type="button"
          onClick={onBack}
          className="flex-1 bg-black hover:opacit-70 text-white"
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-main hover:bg-main-dark text-white"
        >
          {isPending ? <BtnLoading text="Verifying..." /> : "Verify Code"}
        </Button>
      </div>
    </form>
  );
}

export default CodeStep;
