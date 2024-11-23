import type { Post } from "@/types/Post";
import CoverImage from "./CoverImage";
import Author from "./Author";

type RelatedPostProps = {
  posts: Pick<Post, "_id" | "title" | "slug" | "coverImageUrl" | "author">[];
};

export default function RelatedPost({ posts }: RelatedPostProps) {
  return (
    <div className="mb-10">
      <p className="mb-4 text-xl">پست های مرتبط</p>
      <div className="grid grid-cols-6 gap-4">
        {posts.map(({ _id, title, slug, coverImageUrl, author }) => (
          <div key={_id} className="col-span-6 md:col-span-3 lg:col-span-2">
            <CoverImage alt={title} slug={slug} src={coverImageUrl} />
            <div className="flex items-center justify-between">
              <p className="w-28 truncate">{title}</p>
              <Author src={author.avatarUrl} name={author.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
