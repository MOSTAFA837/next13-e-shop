"use client";

import { useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { Heading } from "../components/Heading";
import { Input } from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
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

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created successfully");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged in");
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("Somethig went wrong"))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Heading title="Sign up" />
      <hr className=" bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        label={isLoading ? "Loading.." : "Sign up"}
        onClick={handleSubmit(onSubmit)}
      />

      <div className="w-full relative">
        <hr className=" bg-slate-300 w-full h-px" />
        <p className="absolute -top-[10px] left-1/2 font-bold">Or</p>
      </div>

      <Button
        outline
        isSubmit
        label="Sign up with google"
        onClick={() => {
          signIn("google");
        }}
        icon={AiOutlineGoogle}
      />

      <p>
        Already have an account?
        <Link className="ml-2 underline text-blue-500" href="/login">
          Login
        </Link>
      </p>
    </>
  );
}
