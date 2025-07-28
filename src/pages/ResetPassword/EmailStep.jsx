"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Icon } from "@iconify/react";
import PhoneInput from "react-phone-input-pro";
import { useMutate } from "@/hooks/UseMutate";
import { useNavigate } from "react-router-dom";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";
import { Input } from "@/components/ui/input";

function EmailStep({ onNext }) {
  const formSchema = z.object({
    email: z.string().min(1, {
      message: "Email is required.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutate({
    method: "POST",
    endpoint: "send-code-api", // Replace with your actual register endpoint
    text: "Registration successful!",
    queryKeysToInvalidate: ["user"], // Adjust depending on your query keys
    onSuccess: () => {
      localStorage.setItem("to-reset-email", form.getValues("email"));
      onNext();
    },
  });

  const onSubmit = (data) => {
    // Call your mutation with form data
    mutate(data);
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <div className=" grid grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="phone number" {...field} /> */}
                    <Input placeholder="type your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="cover flex justify-center">
            <Button
              type="submit"
              className="w-full bg-main hover:bg-main-dark"
              disabled={isPending}
            >
              {isPending ? <BtnLoading text="Sending..." /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EmailStep;
