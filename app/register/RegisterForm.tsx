"use client";

import { useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { Heading } from "../components/Heading";
import { Input } from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import Link from "next/link";

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    console.log(data);
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
        onClick={() => {}}
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
