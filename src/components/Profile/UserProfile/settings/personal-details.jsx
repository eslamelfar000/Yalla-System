"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { countries } from "./countries";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutate } from "@/hooks/useMutate";
import BtnLoading from "@/SharedComponents/BtnLoading/BtnLoading";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  phone: z.string().min(6, "Phone number is too short"),
  email: z.string().email("Invalid email"),
  language: z.string().min(1, "Language is required"),
  country: z.string().min(1, "Country is required"),
  // city: z.string().min(1, "City is required"),
});

const PersonalDetails = ({ user_data, previewPublicImage }) => {
  const { mutate, isPending } = useMutate({
    endpoint: "update-profile-api",
    method: "POST",
    text: "Profile updated successfully!",
    queryKeysToInvalidate: ["user-profile", "user-data"],
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user_data?.name || "",
      phone: user_data?.phone || "",
      email: user_data?.email || "",
      language: user_data?.language || "arabic",
      country: user_data?.country || "EG",
    },
  });


  const onSubmit = (data) => {
    // Prepare form data including image if available
    const formData = {
      ...data,
      image: previewPublicImage?.file || null,
    };
    mutate(formData);
  };

  return (
    <Card className="rounded-t-none pt-6">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-12 md:gap-x-12 gap-y-5">
              {/* Full Name */}
              <div className="col-span-12 md:col-span-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone Number */}
              <div className="col-span-12 md:col-span-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <div className="col-span-12 md:col-span-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Language */}
              <div className="col-span-12 md:col-span-6">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="bangla">Bangla</SelectItem>
                          <SelectItem value="arabic">Arabic</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Country */}
              <div className="col-span-12 lg:col-span-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <ScrollArea className="h-64">
                            {countries.map((country) => (
                              <SelectItem
                                key={country.code}
                                value={country.code}
                              >
                                {country.name}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* City */}
              {/* <div className="col-span-12 lg:col-span-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" className="text-main">
                <Link to="/profile">Back</Link>
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-main text-white hover:bg-main-dark w-50"
              >
                {!!isPending ? <BtnLoading text="Updating..." /> : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PersonalDetails;
