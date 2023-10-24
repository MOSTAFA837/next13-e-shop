"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Heading } from "../components/Heading";
import { Input } from "../components/inputs/Input";
import { Button } from "../components/Button";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged in");
      }

      if (callback?.error) {
        toast.success(callback.error);
      }
    });
  };

  return (
    <>
      <Heading title="Login" />
      <hr className=" bg-slate-300 w-full h-px" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />

      <Button
        isSubmit
        label={isLoading ? "Loading.." : "Login"}
        onClick={handleSubmit(onSubmit)}
      />

      <div className="w-full relative">
        <hr className=" bg-slate-300 w-full h-px" />
        <p className="absolute -top-[10px] left-1/2 font-bold">Or</p>
      </div>

      <Button
        outline
        isSubmit
        label="Continue with google"
        onClick={() => {
          signIn("google");
        }}
        icon={AiOutlineGoogle}
      />

      <p>
        Don't have an account?
        <Link className="ml-2 underline text-blue-500" href="/register">
          Sign up
        </Link>
      </p>
    </>
  );
}
