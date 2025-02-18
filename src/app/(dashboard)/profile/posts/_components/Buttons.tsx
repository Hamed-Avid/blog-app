"use client";

import ButtonIcon from "@/ui/ButtonIcon";
import Modal from "@/ui/Modal";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import PostDeleteForm from "./PostDeleteForm";

type ButtonProps = { postId: string; title: string };

export function DeletePost({ postId, title }: ButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => setIsOpen(!isOpen);

  return (
    <>
      <ButtonIcon variant="outline" onClick={toggleHandler}>
        <TrashIcon className="stroke-error" />
      </ButtonIcon>
      <Modal title={`حدف ${title}`} isOpen={isOpen} onClose={toggleHandler}>
        <h2 className="mb-8 text-base font-bold text-secondary-700">
          آیا از حذف {title} مطمین هستید؟
        </h2>
        <PostDeleteForm onClose={toggleHandler} postId={postId} />
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
