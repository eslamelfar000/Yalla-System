"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMutate } from "@/hooks/UseMutate";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";

// ✅ Zod schema
const formSchema = z
  .object({
    current_password: z.string().min(6, "Current password is required"),
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9\s\W]/, "Must include number, symbol, or whitespace"),
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords do not match",
    path: ["new_password_confirmation"],
  });

const ChangePassword = () => {
  const [visibility, setVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const { mutate, isPending } = useMutate({
    endpoint: "change-password-api",
    method: "POST",
    text: "Password changed successfully!",
    queryKeysToInvalidate: ["user-profile"],
    onSuccess: () => {
      form.reset();
    },
  });

  const onSubmit = (data) => {
    mutate(data);
    // call your API or custom mutate hook here
  };

  return (
    <Card className="rounded-t-none pt-6">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-12 md:gap-x-12 gap-y-5"
          >
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6">
                  <FormLabel className="text-default-800">
                    Current Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={visibility.current ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    {visibility.current ? (
                      <EyeOff
                        className={cn(
                          "absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer"
                        )}
                        onClick={() =>
                          setVisibility((prev) => ({ ...prev, current: false }))
                        }
                      />
                    ) : (
                      <Eye
                        className={cn(
                          "absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer"
                        )}
                        onClick={() =>
                          setVisibility((prev) => ({ ...prev, current: true }))
                        }
                      />
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6">
                  <FormLabel className="text-default-800">
                    New Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={visibility.new ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    {visibility.new ? (
                      <EyeOff
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer"
                        onClick={() =>
                          setVisibility((prev) => ({ ...prev, new: false }))
                        }
                      />
                    ) : (
                      <Eye
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer"
                        onClick={() =>
                          setVisibility((prev) => ({ ...prev, new: true }))
                        }
                      />
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password_confirmation"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6">
                  <FormLabel className="text-default-800">
                    Confirm Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={visibility.confirm ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    {visibility.confirm ? (
                      <EyeOff
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer"
                        onClick={() =>
                          setVisibility((prev) => ({ ...prev, confirm: false }))
                        }
                      />
                    ) : (
                      <Eye
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer"
                        onClick={() =>
                          setVisibility((prev) => ({ ...prev, confirm: true }))
                        }
                      />
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-12 mt-6 flex gap-5 justify-end">
              <Button type="button" variant="outline" className="text-main">
                <Link to="/profile">Back</Link>
              </Button>
              <Button
                type="submit"
                className="bg-main text-white cursor-pointer hover:bg-main-dark w-50"
              >
                {isPending ? (
                  <BtnLoading text="Saving..." />
                ) : (
                  <>
                    <Icon
                      icon="heroicons:lock-closed"
                      className="w-5 h-5 text-primary-foreground me-1"
                    />
                    Change Password
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
