import CoverImage from "./CoverImage";
import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";
import Author from "./Author";
import PostInteraction from "./PostInteraction";
import { toPersianDigits } from "@/utils/numberFormatter";
import type { Post } from "@/types/Post";

type PostListProps = { posts: Post[] };

export default async function PostList({ posts }: PostListProps) {
  return (
    !!posts && (
      <div className="grid grid-cols-12 gap-8">
        {posts?.map(
          ({
            _id,
            title,
            slug,
            author,
            isLiked,
            readingTime,
            isBookmarked,
            coverImageUrl,
            commentsCount,
          }) => (
            <div
              key={_id}
              className="col-span-12 rounded-lg border-secondary-300 p-2 sm:col-span-6 lg:col-span-4"
            >
              <CoverImage src={coverImageUrl} alt={title} slug={slug} />

              <Link href={`blogs/${slug}`}>
                <h2 className="mb-4 font-bold text-secondary-700">{title}</h2>
              </Link>

              <div className="mb-4 flex items-center justify-between">
                <Author src={author.avatarUrl} name={author.name} />
                <div className="flex items-center text-xs text-secondary-500">
                  <ClockIcon className="ml-1 size-4 stroke-secondary-500" />
                  <span className="ml-1">خواندن:</span>
                  <span className="ml-1 leading-3">
                    {toPersianDigits(readingTime)}
                  </span>
                </div>
              </div>

              <PostInteraction
                postId={_id}
                isLiked={isLiked}
                isBookmarked={isBookmarked}
                commentsCount={commentsCount}
              />
            </div>
          ),
        )}
      </div>
    )
  );
}
