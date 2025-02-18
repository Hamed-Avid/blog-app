"use server";

import { createCommentApi } from "@/services/commentService";
import { deletePostApi } from "@/services/postService";
import type { CustomError } from "@/types/Api";
import setCookieOnRequest from "@/utils/setCookieOnRequest";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type DeletePostActionParams = {
  postId: string;
};

type DeletePostActionState = {
  message?: string;
  error?: string;
};

export async function deletePostAction(
  prevState: DeletePostActionState,
  { postId }: DeletePostActionParams,
): Promise<DeletePostActionState> {
  const cookieStore = await cookies();
  const options = setCookieOnRequest(cookieStore);

  try {
    const { message } = await deletePostApi({ postId, options });
    revalidatePath("/profile/posts");
    return { message };
  } catch (error) {
    const err = error as CustomError;
    const errorMessage = err?.response?.data?.message || "An error occurred";
    return { error: errorMessage };
  }
}
