"use server";

import { createCommentApi } from "@/services/commentService";
import type { CustomError } from "@/types/Api";
import setCookieOnRequest from "@/utils/setCookieOnRequest";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type CreateCommentActionParams = {
  postId: string;
  parentId: string | null;
  formData: FormData;
};

type CreateCommentActionState = {
  message?: string;
  error?: string;
};

export async function createCommentAction(
  prevState: CreateCommentActionState,
  { postId, parentId, formData }: CreateCommentActionParams,
): Promise<CreateCommentActionState> {
  const cookieStore = await cookies();
  const options = setCookieOnRequest(cookieStore);
  const rowFormData = {
    postId,
    parentId,
    text: formData.get("text"),
  };

  try {
    const { message } = await createCommentApi(rowFormData, options);
    revalidatePath("/blogs/[slug]");
    return { message };
  } catch (error) {
    const err = error as CustomError;
    const errorMessage = err?.response?.data?.message || "An error occurred";
    return { error: errorMessage };
  }
}
