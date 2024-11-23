import { getAllPostsApi } from "@/services/postService";
import type { Post } from "@/types/Post";
import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import setCookieOnRequest from "@/utils/setCookieOnRequest";
import { cookies } from "next/headers";
import PostRow from "./PostRow";

type PostsTableProps = { query?: string };

export default async function PostsTable({ query = "" }: PostsTableProps) {
  const cookieStore = await cookies();
  const options = setCookieOnRequest(cookieStore);
  const { posts } = await getAllPostsApi(query, options);

  if (!posts.length) return <Empty resourceName="پستی" />;

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>عنوان</th>
        <th>دسته بندی</th>
        <th>نویسنده</th>
        <th>تاریخ ایجاد</th>
        <th>نوع</th>
        <th>عملیات</th>
      </Table.Header>
      <Table.Body>
        {posts.map((post: Post, index: number) => (
          <PostRow key={post._id} post={post} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}
