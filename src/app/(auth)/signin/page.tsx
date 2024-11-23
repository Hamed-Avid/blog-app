"use client";

import { useAuth } from "@/context/AuthContext";
import { signinSchema } from "@/lib/FormDataSchema";
import Button from "@/ui/Button";
import TextField from "@/ui/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type SigninFormData = yup.InferType<typeof signinSchema>;

export default function Signin() {
  const { signin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: yupResolver(signinSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<SigninFormData> = async (values) => {
    await signin(values);
  };

  return (
    <>
      <h1 className="text-center font-bold">ورود</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <TextField<SigninFormData>
          label="ایمیل"
          name="email"
          type="email"
          register={register}
          errors={errors}
        />
        <TextField<SigninFormData>
          label="رمز عبور"
          name="password"
          type="password"
          register={register}
          errors={errors}
        />
        <Button type="submit" className="w-full">
          تایید
        </Button>
      </form>
      <Link href="/signup" className="mt-6 text-center text-secondary-500">
        ثبت نام نکرده اید؟
      </Link>
    </>
  );
}
