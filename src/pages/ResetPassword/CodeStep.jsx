import React from "react";
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
import { useMutate } from "@/hooks/useMutate";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";

const verificationSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Code must be numeric"),
});

function CodeStep({ onNext, phone, onBack }) {
  const phoneNumber = localStorage.getItem("phone") || "12345678786";
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      phone: phone || "",
      code: "",
    },
  });

  const { mutate, isPending } = useMutate({
    method: "post",
    endpoint: "verify-code-api",
    text: "verified successfully!",
    onSuccess: () => {
      localStorage.removeItem("phone");
      onNext();
    },
  });

  const onSubmit = (data) => {
    mutate({ code: data.code, phone: phoneNumber });
  };

  const codeValue = watch("code");

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 text-center">
        <InputOTP
          maxLength={6}
          value={codeValue}
          onChange={(value) => setValue("code", value)}
        />
        {errors.code && (
          <p className="text-sm text-red-500">{errors.code.message}</p>
        )}
        <p className="text-sm text-gray-500">Code was sent to {phoneNumber}</p>
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
