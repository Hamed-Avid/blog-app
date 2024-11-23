"use client";

import ButtonIcon from "@/ui/ButtonIcon";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type ButtonProps = { postId: string };

export function DeletePost({ postId }: ButtonProps) {
  return (
    <ButtonIcon variant="outline" onClick={() => console.log(postId)}>
      <TrashIcon className="stroke-error" />
    </ButtonIcon>
  );
}

export function UpdatePost({ postId }: ButtonProps) {
  return (
    <Link href={`/profile/posts/${postId}/edit`}>
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
