import { Suspense } from "react";
import PostList from "../_components/PostList";
import Spinner from "@/ui/Spinner";
import { cookies } from "next/headers";
import setCookieOnRequest from "@/utils/setCookieOnRequest";
import { getAllPostsApi } from "@/services/postService";
import queryString from "query-string";

type BlogsProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Blogs({ searchParams }: BlogsProps) {
  const queries = queryString.stringify(await searchParams);
  const cookieStore = await cookies();
  const options = setCookieOnRequest(cookieStore);
  const { posts } = await getAllPostsApi(queries, options);
  const { search } = await searchParams;

  return (
    <>
      {search && (
        <p className="mb-4 text-secondary-700">
          {posts.length > 0
            ? `نشان دادن ${posts.length} نتیجه برای `
            : "پستی با این مشخصات یافت نشد "}
          <span className="">&quot;{search}&quot;</span>
        </p>
      )}
      <Suspense fallback={<Spinner />}>
        <PostList posts={posts} />
      </Suspense>
    </>
  );
}
