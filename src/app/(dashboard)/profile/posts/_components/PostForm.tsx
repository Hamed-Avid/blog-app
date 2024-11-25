"use client";

import { useGetCategories } from "@/hooks/useCategories";
import { useCreatePost, useUpdatePost } from "@/hooks/usePosts";
import { postSchema } from "@/lib/FormDataSchema";
import type { Post } from "@/types/Post";
import Button from "@/ui/Button";
import SelectField from "@/ui/SelectField";
import SvgComponent from "@/ui/SvgComponent";
import TextField from "@/ui/TextField";
import UploadFile from "@/ui/UploadFile";
import { imageUrlToFile } from "@/utils/fileFormatter";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type PostFormProps = { post?: Post };

type PostFormData = yup.InferType<typeof postSchema>;

export default function PostForm({ post }: PostFormProps) {
  const defaultValues = {
    title: post?.title || "",
    text: post?.text || "",
    slug: post?.slug || "",
    briefText: post?.briefText || "",
    readingTime: post?.readingTime || undefined,
    category: post?.category?._id || "",
    coverImage: post?.coverImage || "",
  };

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: yupResolver(postSchema),
    mode: "onTouched",
    defaultValues,
  });

  useEffect(() => {
    if (post?.coverImageUrl) {
      const fetchCoverImage = async () => {
        const file = await imageUrlToFile(post.coverImageUrl);
        setValue("coverImage", file);
      };
      fetchCoverImage();
    }
  }, [post, setValue]);

  const { data } = useGetCategories();
  const router = useRouter();
  const { isCreating, createPostAsync } = useCreatePost();
  const { isUpdating, updatePostAsync } = useUpdatePost();

  const transformedCategories = data?.categories.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "coverImage") {
        formData.append(key, data.coverImage as File);
      } else {
        formData.append(key, data[key as keyof PostFormData] as string);
      }
    }

    if (post) {
      await updatePostAsync(
        { postId: post._id, data: formData },
        { onSuccess: () => router.push("/profile/posts") },
      );
    } else {
      await createPostAsync(formData, {
        onSuccess: () => router.push("/profile/posts"),
      });
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
        prevCoverImageUrl={post?.coverImageUrl}
        errorMessage="کاور پست الزامی است"
      />

      <Button type="submit">
        {isCreating || isUpdating ? <SvgComponent /> : "تایید"}
      </Button>
    </form>
  );
}
