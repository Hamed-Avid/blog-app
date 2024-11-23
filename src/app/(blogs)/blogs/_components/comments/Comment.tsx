import type { Comment } from "@/types/Comment";
import Avatar from "@/ui/Avatar";
import Button from "@/ui/Button";
import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";

type CommentProps = {
  comment: Comment | Comment["answers"][0];
  onAdd?: () => void;
};

export default function Comment({ comment, onAdd }: CommentProps) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between border-b border-b-secondary-200/60 pb-2">
        <div className="flex items-center">
          <Avatar
            height={34}
            width={34}
            alt={comment.user?.name || "-"}
            src={comment.user.avatarUrl || ""}
          />
          <div className="w-full text-sm text-secondary-600">
            <span className="mb-1 block font-bold">{comment.user.name}</span>
            <span className="block text-xs text-secondary-500">
              {comment.createdAt}
            </span>
          </div>
        </div>
        <div>
          {comment.openToComment && (
            <Button
              onClick={onAdd}
              variant="secondary"
              className="flex gap-x-1 rounded-lg bg-secondary-200 p-1 text-sm text-secondary-500"
            >
              <span className="ml-1">
                <ArrowUturnRightIcon className="w-4" />
              </span>
              <span>پاسخ</span>
            </Button>
          )}
        </div>
      </div>
      <p className="text-xs leading-loose text-secondary-700 lg:text-base lg:leading-8">
        {comment.content.text}
      </p>
    </>
  );
}
