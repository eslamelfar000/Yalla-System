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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Icon } from "@iconify/react";
import PhoneInput from "react-phone-input-pro";
import "./phoneinputstyle.css";
import { useMutate } from "@/hooks/UseMutate";
import { useNavigate } from "react-router-dom";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";

function RegisterForm() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const strongPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
  const formSchema = z
    .object({
      name: z.string().min(5, {
        message: "Name must be at least 5 characters.",
      }),
      email: z.string().email({
        message: "Please enter a valid email address.",
      }),
      phone: z.string().min(1, {
        message: "Phone number is required.",
      }),
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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { mutate, isPending } = useMutate({
    method: "POST",
    endpoint: "register-api", // Replace with your actual register endpoint
    text: "Registration successful!",
    queryKeysToInvalidate: ["register"], // Adjust depending on your query keys
    onSuccess: () => {
      localStorage.setItem("to-verify-email", form.getValues("email"));
      form.reset();
      navigate("/verify-email");
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="full name" {...field} autoFocus />
                    {/* autoFocus here */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </div>
          <div className="cover flex justify-center">
            <Button
              type="submit"
              className="w-full bg-main hover:bg-main-dark"
              disabled={isPending}
            >
              {isPending ? (
                <BtnLoading size="6" text="Submitting..." />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
