"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import GoogleSignInBtn from "../GoogleSignInBtn";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email("Invalid Email"),
  password: z.string().min(1, { message: "Password is Required" }),
});

const SignInForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [interestArr, setInterestArr] = useState([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const arr: string[] = [];

    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Error Signing In",
        description: "Something went wrong!",
        variant: "destructive",
      });
    } else {
      await fetch("/api/userInterests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data: " + data.interests);
          const arr: string[] = data.interests;
          console.log("arr: " + arr);
          console.log("arr len: " + arr.length);
          if (arr.length == 0) {
            router.push("/interests");
          } else {
            router.push("/user-recommendations");
          }

          router.refresh();
          // return arr;
        });
      // console.log("arr len in if statement: " + arr.length);
    }
  };

  return (
    <div className="space-y-4 ">
      <h1 className="text-2xl">Sign In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Password..."
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-6" type="submit">
            Sign In
          </Button>
        </form>

        <div className="mx-auto my-4 flex w-full items-center justify-evenly ">
          or{" "}
        </div>
        {/* <GoogleSignInBtn> Sign In with Google </GoogleSignInBtn> */}
        <p className="text-center text-sm text-grav-600 mt-2">
          If you don&apos;t have an account, please&nbsp;
          <Link className="text-blue-500 hover:underline" href="/sign-up">
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignInForm;
