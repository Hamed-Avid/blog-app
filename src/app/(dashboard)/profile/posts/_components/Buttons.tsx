"use client";

import { useDeletePost } from "@/hooks/usePosts";
import ButtonIcon from "@/ui/ButtonIcon";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Modal from "@/ui/Modal";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ButtonProps = { postId: string; title: string };

export function DeletePost({ postId, title }: ButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDeleting, deletePostAsync } = useDeletePost();

  const toggleHandler = () => setIsOpen(!isOpen);
  const router = useRouter();

  return (
    <>
      <ButtonIcon variant="outline" onClick={toggleHandler}>
        <TrashIcon className="stroke-error" />
      </ButtonIcon>
      <Modal title={`حدف ${title}`} isOpen={isOpen} onClose={toggleHandler}>
        <ConfirmDelete
          resourceName={title}
          onClose={toggleHandler}
          disabled={isDeleting}
          onConfirm={(e) => {
            e.preventDefault();
            deletePostAsync(
              { postId },
              {
                onSuccess: () => {
                  toggleHandler();
                  router.refresh();
                },
              },
            );
          }}
        />
      </Modal>
    </>
  );
}

export function UpdatePost({ postId }: Omit<ButtonProps, "title">) {
  return (
    <Link href={`/profile/posts/${postId}/update`}>
      <ButtonIcon variant="outline">
        <PencilIcon className="stroke-warning" />
      </ButtonIcon>
    </Link>
  );
}

export function CreatePost() {
  return (
    <Link
      href="/profile/posts/create"
      className="flex items-center gap-x-4 justify-self-end rounded-lg bg-primary-900 px-4 py-3 text-sm font-medium text-secondary-0 transition-colors hover:bg-primary-700"
    >
      <span className="hidden md:block">ایجاد پست</span>
      <PlusIcon className="w-5" />
    </Link>
  );
}
