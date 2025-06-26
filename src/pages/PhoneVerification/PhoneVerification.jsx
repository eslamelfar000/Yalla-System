import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
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

function PhoneVerification() {
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
      code: "",
    },
  });

  const { mutate, isPending } = useMutate({
    method: "post",
    endpoint: "verify-code-register",
    text: "Phone number verified successfully!",
    onSuccess: () => {
      navigate("/login");
      localStorage.removeItem("phone");
    },
  });

  const onSubmit = (data) => {
    mutate({ code: data.code, phone: phoneNumber });
  };

  const codeValue = watch("code");

  return (
    <div className="cover flex flex-col-reverse md:flex-row justify-between items-center h-screen overflow">
      <div className="left flex-1 w-full h-full flex justify-between items-center">
        <div className="flex flex-col w-[90%] xl:w-[70%] mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 rounded-2xl shadow-xl bg-second">
          <div className="flex flex-col justify-center mx-auto items-center gap-3 pb-4">
            <img src={logo} alt="Logo" />
          </div>
          <div className="text-md text-[#6B7280] pb-8 mx-auto">
            Verification of your phone number
          </div>

          <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 text-center">
              <Label htmlFor="code">Verification Code</Label>
              {/* <InputOTP
                maxLength={6}
                value={codeValue}
                onChange={(value) => setValue("code", value)}
              /> */}
              {errors.code && (
                <p className="text-sm text-red-500">{errors.code.message}</p>
              )}
              <p className="text-sm text-gray-500">
                Code was sent to {phoneNumber}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-[#5685CE] hover:bg-[#4a75b7] text-white"
              >
                {isPending ? <BtnLoading text="Verifying..." /> : "Verify Code"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <AuthImageSide image={login} />
    </div>
  );
}

export default PhoneVerification;
