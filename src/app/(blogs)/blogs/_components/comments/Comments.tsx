"use client";

import { useState } from "react";
import Comment from "./Comment";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Button from "@/ui/Button";
import CommentForm from "./CommentForm";
import { useAuth } from "@/context/AuthContext";
import type { Comment as CommentType } from "@/types/Comment";
import Modal from "@/ui/Modal";
import { useRouter } from "next/navigation";

type CommentsProps = {
  comments: CommentType[];
  postId: string;
};

type Parent = { _id: string; user: { name: string } };

export default function Comments({ comments, postId }: CommentsProps) {
  const { user } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [parent, setParent] = useState<Parent | null>(null);
  const router = useRouter();

  const addHandler = (parent: Parent | null) => {
    if (!user) {
      router.push("/signin");
      return;
    }
    setParent(parent);
    setOpen(true);
  };

  return (
    <div className="mb-10">
      <Modal
        title={parent ? "پاسخ به نظر" : "نظر جدید"}
        description={parent ? parent.user.name : "نظر خود را وارد کنید"}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <CommentForm
          postId={postId}
          parentId={parent ? parent._id : null}
          onClose={() => setOpen(false)}
        />
      </Modal>
      <div className="mb-8 flex flex-col items-center justify-between gap-y-3 lg:flex-row">
        <h2 className="text-2xl font-bold text-secondary-800">نظرات</h2>
        <Button
          onClick={() => addHandler(null)}
          variant="outline"
          className="flex items-center py-2"
        >
          <QuestionMarkCircleIcon className="ml-2 w-4" />
          <span>ثبت نظر جدید</span>
        </Button>
      </div>
      <div className="post-comments space-y-8 rounded-xl bg-secondary-0 px-3 py-6 lg:px-6">
        {comments.length > 0 ? (
          comments.map((comment) => {
            return (
              <div key={comment._id}>
                <div className="mb-3 rounded-xl border border-secondary-200 p-2 sm:p-4">
                  <Comment
                    comment={comment}
                    onAdd={() => addHandler(comment)}
                  />
                </div>
                <div className="post-comments__answer mr-2 space-y-3 sm:mr-8">
                  {comment.answers.map((item, index) => {
                    return (
                      <div key={item._id} className="relative">
                        <div
                          className={classNames(
                            "answer-item rounded-xl border border-secondary-100 bg-secondary-50/80 p-2 sm:p-4",
                            {
                              "last-item": index + 1 === comment.answers.length,
                            },
                          )}
                        >
                          <Comment key={item._id} comment={item} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-secondary-500">برای این پست نظری ثبت نشده است</p>
        )}
      </div>
    </div>
  );
}
