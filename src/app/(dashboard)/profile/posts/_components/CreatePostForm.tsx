"use client";

import { useGetCategories } from "@/hooks/useCategories";
import { useCreatePost } from "@/hooks/usePosts";
import { postSchema } from "@/lib/FormDataSchema";
import type { CustomError } from "@/types/Api";
import Button from "@/ui/Button";
import SelectField from "@/ui/SelectField";
import SvgComponent from "@/ui/SvgComponent";
import TextField from "@/ui/TextField";
import UploadFile from "@/ui/UploadFile";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type PostFormData = yup.InferType<typeof postSchema>;

export default function CreatePostForm() {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(postSchema) });
  const { data } = useGetCategories();
  const router = useRouter();
  const { isCreating, createPostAsync } = useCreatePost();
  const transformedCategories = data?.categories.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key as keyof PostFormData] as string);
      }
      await createPostAsync(formData, {
        onSuccess: () => router.push("/profile/posts"),
      });
    } catch (error) {
      const err = error as CustomError;
      const errorMessage = err?.response?.data?.message || "An error occurred";
      return { error: errorMessage };
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <TextField<PostFormData>
        label="عنوان"
        name="title"
        register={register}
        errors={errors}
        isRequired
      />
      <TextField<PostFormData>
        label="متن کوتاه"
        name="briefText"
        register={register}
        errors={errors}
        isRequired
      />
      <TextField<PostFormData>
        label="متن"
        name="text"
        register={register}
        errors={errors}
        isRequired
      />
      <TextField<PostFormData>
        label="اسلاگ"
        name="slug"
        register={register}
        errors={errors}
        isRequired
      />
      <TextField<PostFormData>
        type="number"
        label="زمان مطالعه"
        name="readingTime"
        register={register}
        errors={errors}
        isRequired
      />
      <SelectField<PostFormData>
        label="دسته بندی"
        name="category"
        register={register}
        errors={errors}
        options={transformedCategories || []}
        placeholder="انتخاب"
        isRequired
      />
      <UploadFile<PostFormData>
        control={control}
        name="coverImage"
        errors={errors}
        setValue={setValue}
        errorMessage="کاور پست الزامی است"
      />

      <Button type="submit">{isCreating ? <SvgComponent /> : "تایید"}</Button>
    </form>
  );
}
