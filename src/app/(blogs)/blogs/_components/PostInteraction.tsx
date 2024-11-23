"use client";

import { bookmarkPostApi, likePostApi } from "@/services/postService";
import type { CustomError } from "@/types/Api";
import ButtonIcon from "@/ui/ButtonIcon";
import { toPersianDigits } from "@/utils/numberFormatter";
import {
  BookOpenIcon,
  ChatBubbleLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  BookOpenIcon as SolidBookOpenIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type PostInteractionProp = {
  postId: string;
  isLiked: boolean;
  isBookmarked: boolean;
  commentsCount: number;
};

export default function PostInteraction({
  postId,
  isLiked,
  isBookmarked,
  commentsCount,
}: PostInteractionProp) {
  const router = useRouter();

  const likeHandler = async () => {
    try {
      const { message } = await likePostApi(postId);
      toast.success(message);
      router.refresh();
    } catch (error) {
      const err = error as CustomError;
      toast.error(err?.response?.data?.message || "An error occurred");
    }
  };

  const bookmarkHandler = async () => {
    try {
      const { message } = await bookmarkPostApi(postId);
      toast.success(message);
      router.refresh();
    } catch (error) {
      const err = error as CustomError;
      toast.error(err?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <ButtonIcon variant="secondary">
        <ChatBubbleLeftEllipsisIcon />
        <span>{toPersianDigits(commentsCount)}</span>
      </ButtonIcon>
      <ButtonIcon variant="red" onClick={likeHandler}>
        {isLiked ? <SolidHeartIcon /> : <HeartIcon />}
      </ButtonIcon>
      <ButtonIcon variant="primary" onClick={bookmarkHandler}>
        {isBookmarked ? <SolidBookOpenIcon /> : <BookOpenIcon />}
      </ButtonIcon>
    </div>
  );
}
