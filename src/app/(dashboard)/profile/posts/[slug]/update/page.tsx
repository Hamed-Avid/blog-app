import Breadcrumbs from "@/ui/Breadcrumbs";
import { getPostByIdApi } from "@/services/postService";
import { notFound } from "next/navigation";
import PostForm from "../../_components/PostForm";

type UpdatePostProps = {
  params: Promise<{ slug: string }>;
};

export default async function UpdatePost({ params }: UpdatePostProps) {
  const { slug } = await params;
  const { post } = await getPostByIdApi(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "پست ها", href: "/profile/posts" },
          {
            label: "ویرایش پست",
            href: `/profile/posts/${slug}/update`,
            active: true,
          },
        ]}
      />
      <PostForm post={post} />
    </>
  );
}
