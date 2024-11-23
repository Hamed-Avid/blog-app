"use client";

import { useAuth } from "@/context/AuthContext";
import { signupSchema } from "@/lib/FormDataSchema";
import Button from "@/ui/Button";
import TextField from "@/ui/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type SignupFormData = yup.InferType<typeof signupSchema>;

export default function Signup() {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (values) => {
    await signup(values);
  };

  return (
    <>
      <h1 className="text-center font-bold">ثبت نام</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <TextField<SignupFormData>
          label="نام و نام خانوادگی"
          name="name"
          register={register}
          errors={errors}
        />
        <TextField<SignupFormData>
          label="ایمیل"
          name="email"
          type="email"
          register={register}
          errors={errors}
        />
        <TextField<SignupFormData>
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
      <Link href="/signin" className="mt-6 text-center text-secondary-500">
        ثبت نام کرده اید؟
      </Link>
    </>
  );
}
