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

function PhoneStep({ onNext, setPhoneNumber }) {
  const formSchema = z.object({
    phone: z.string().min(1, {
      message: "Phone number is required.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const { mutate, isPending } = useMutate({
    method: "POST",
    endpoint: "send-code-api", // Replace with your actual register endpoint
    text: "Registration successful!",
    queryKeysToInvalidate: ["user"], // Adjust depending on your query keys
    onSuccess: () => {
        
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="phone number" {...field} /> */}
                    <PhoneInput
                      name="phone"
                      defaultCountry="EG"
                      value={field?.value}
                      prefix="+20"
                      fullIsoCode={true}
                      initialFormat="national"
                      onchange={(n) => {
                        field?.onChange(n);
                      }}
                      inputProps={{ name: "phone", autoComplete: "tel" }}
                      containerClass="flex-1"
                      {...field}
                    />
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

export default PhoneStep;
