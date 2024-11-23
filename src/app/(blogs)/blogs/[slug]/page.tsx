import { getPostBySlugApi, getAllPostsApi } from "@/services/postService";
import type { Post } from "@/types/Post";
import Image from "next/image";
import { notFound } from "next/navigation";
import RelatedPost from "../_components/RelatedPost";
import Comments from "../_components/comments/Comments";

type PostProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { posts } = await getAllPostsApi();
  return posts.map(({ slug }: Post) => ({ slug }));
}

export async function generateMetadata({ params }: PostProps) {
  const { slug } = await params;
  const { post } = await getPostBySlugApi(slug);

  return {
    title: `پست ${post.title}`,
  };
}

export default async function Post({ params }: PostProps) {
  const { slug } = await params;
  const data = await getPostBySlugApi(slug);
  const { post } = (data as { post: Post }) || {};
  if (!post) notFound();

  return (
    <section className="mx-auto max-w-screen-md text-secondary-600">
      <h1 className="mb-8 text-2xl font-bold text-secondary-700">
        {post.title}
      </h1>
      <p className="mb-4">{post.briefText}</p>
      <p className="mb-8">{post.text}</p>
      <div className="relative mb-10 aspect-video overflow-hidden rounded-lg">
        <Image
          className="object-cover object-center transition-all duration-300 ease-out hover:scale-110"
          fill
          priority
          alt={post.title}
          src={post.coverImageUrl}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {post.related.length > 0 ? <RelatedPost posts={post.related} /> : null}
      <Comments postId={post._id} comments={post.comments} />
    </section>
  );
}
