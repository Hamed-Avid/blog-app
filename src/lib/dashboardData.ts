import setCookieOnRequest from "@/utils/setCookieOnRequest";
import { cookies } from "next/headers";
import type { CustomError } from "@/types/Api";
import { getAllUsersApi } from "@/services/authService";
import { getAllCommentsApi } from "@/services/commentService";
import { getAllPostsApi } from "@/services/postService";

export async function fetchCardData() {
  const cookieStore = await cookies();
  const options = setCookieOnRequest(cookieStore);

  try {
    const data = await Promise.all([
      getAllUsersApi(options),
      getAllCommentsApi(options),
      getAllPostsApi("", options),
    ]);

    const numOfUsers = data[0].users.length ?? 0;
    const numOfComments = data[1].commentsCount ?? 0;
    const numOfPosts = data[2].posts.length ?? 0;

    return { numOfUsers, numOfPosts, numOfComments };
  } catch (error) {
    throw new Error("خطا در بارگذاری اطلاعات");
    const err = error as CustomError;
    console.log(err?.response?.data?.message || "An error occurred");
  }
}
