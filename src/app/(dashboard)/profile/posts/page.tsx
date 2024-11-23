import { Suspense } from "react";
import PostsTable from "./_components/PostsTable";
import Fallback from "@/ui/Fallback";
import Search from "@/ui/Search";
import { CreatePost } from "./_components/Buttons";
import queryString from "query-string";
import Pagination from "@/ui/Pagination";
import { cookies } from "next/headers";
import setCookieOnRequest from "@/utils/setCookieOnRequest";
import { getAllPostsApi } from "@/services/postService";

type PostsProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Posts({ searchParams }: PostsProps) {
  const query = queryString.stringify(await searchParams);
  const cookieStore = await cookies();
  const options = setCookieOnRequest(cookieStore);
  const { totalPages } = await getAllPostsApi(query, options);

  return (
    <>
      <div className="col-span-1 mb-12 grid items-center gap-8 text-secondary-700 lg:grid-cols-3">
        <h1 className="text-xl font-bold">پست ها</h1>
        <Search />
        <CreatePost />
      </div>

      <Suspense fallback={<Fallback />} key={query}>
        <PostsTable query={query} />
      </Suspense>

      {totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
