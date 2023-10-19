"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

const formSchema = z.object({
  address: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  date_of_birth: z.string().min(2, {
    message: "firstname must be at least 8 characters.",
  }),
  email: z.string().min(10, {
    message: "email must be at least 10 characters.",
  }),
  first_name: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),

  last_name: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "firstname must be at least 8 characters.",
  }),
  phone_number: z
    .string()
    .min(10, {
      message: "phone number must be at least 10 characters.",
    })
    .max(10, {
      message: "phone number must be at most 10 characters.",
    }),
  role: z.string(),
});

export function CreateUser() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Enter email id</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
