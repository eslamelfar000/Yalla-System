import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutate } from "@/hooks/UseMutate";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icon } from "@iconify/react";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";
import { useNavigate } from "react-router-dom";

const strongPattern =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .regex(strongPattern, {
        message:
          "Password must include an uppercase letter, a number, and a special character.",
      }),
    password_confirmation: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation) {
      ctx.addIssue({
        code: "custom",
        path: ["password_confirmation"], // attach error to this field
        message: "Passwords do not match",
      });
    }
  });

export default function PasswordStep({ phone }) {
  const [show, setShow] = useState(false);
  const email = localStorage.getItem("to-reset-email") || "";
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      phone: phone || "",
      password: "",
      password_confirmation: "",
    },
  });

  const { mutate, isPending } = useMutate({
    method: "POST",
    endpoint: "reset-password-api",
    text: "Reset your password successfully!",
    queryKeysToInvalidate: ["reset"],
    onSuccess: () => {
      form.reset();
      localStorage.removeItem("to-reset-email");
      navigate("/login");
    },
  });

  const onSubmit = (data) => {
    // Call your mutation with form data
    mutate({
      ...data,
      email,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  type={`${show ? "text " : "password"}`}
                  {...field}
                />
              </FormControl>
              {show ? (
                <Button
                  size="icon"
                  variant="ghost"
                  className=" h-7 w-7 absolute right-1 top-8"
                  color="primary"
                  title="Show"
                  type="button"
                  onClick={() => setShow(!show)}
                >
                  <Icon icon="heroicons:eye-slash" className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  className=" h-7 w-7 absolute right-1 top-8"
                  color="primary"
                  title="Show"
                  type="button"
                  onClick={() => setShow(!show)}
                >
                  <Icon icon="heroicons:eye" className="h-4 w-4" />
                </Button>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="confirm password"
                  type={`${show ? "text " : "password"}`}
                  {...field}
                />
              </FormControl>
              {show ? (
                <Button
                  size="icon"
                  variant="ghost"
                  className=" h-7 w-7 absolute right-1 top-8"
                  color="primary"
                  title="Show"
                  type="button"
                  onClick={() => setShow(!show)}
                >
                  <Icon icon="heroicons:eye-slash" className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  className=" h-7 w-7 absolute right-1 top-8"
                  color="primary"
                  title="Show"
                  type="button"
                  onClick={() => setShow(!show)}
                >
                  <Icon icon="heroicons:eye" className="h-4 w-4" />
                </Button>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex  gap-2">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-main hover:bg-main-dark text-white"
          >
            {isPending ? <BtnLoading text="Resetting..." /> : "Reset Password"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
