import { getAllPostsApi } from "@/services/postService";
import Spinner from "@/ui/Spinner";
import setCookieOnRequest from "@/utils/setCookieOnRequest";
import { cookies } from "next/headers";
import queryString from "query-string";
import { Suspense } from "react";
import PostList from "../../../_components/PostList";

type CategoryProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function category({
  params,
  searchParams,
}: CategoryProps) {
  const { slug } = await params;
  const queries =
    queryString.stringify(await searchParams) + `&categorySlug=${slug}`;
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
          <span>&quot;{search}&quot;</span>
        </p>
      )}

      {posts.length === 0 && !search ? (
        <p className="text-lg text-secondary-600">
          پستی در این دسته بندی پیدا نشد
        </p>
      ) : (
        <Suspense fallback={<Spinner />}>
          <PostList posts={posts} />
        </Suspense>
      )}
    </>
  );
}
