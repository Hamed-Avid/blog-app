"use client";

import Button from "@/ui/Button";
import SubmitButton from "@/ui/SubmitButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useActionState, useEffect } from "react";
import { deletePostAction } from "../_actions/action";
import toast from "react-hot-toast";

type ConfirmDeleteProps = {
  onClose: () => void;
  postId: string;
};

type DeletePostFormState = { error?: string; message?: string };

const initialState: DeletePostFormState = {
  error: undefined,
  message: undefined,
};

export default function PostDeleteForm({
  onClose,
  postId,
}: ConfirmDeleteProps) {
  const [state, formAction, pending] = useActionState(
    deletePostAction,
    initialState,
  );

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      onClose();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, onClose]);

  return (
    <form action={() => formAction({ postId })}>
      <div className="flex items-center justify-between gap-x-16">
        <Button
          className="flex-1"
          variant="outline"
          onClick={onClose}
          type="button"
        >
          لغو
        </Button>
        <SubmitButton
          type="submit"
          variant="danger"
          disabled={pending}
          className="flex flex-1 items-center justify-center gap-x-2"
        >
          <TrashIcon className="size-5" />
          <span>حذف</span>
        </SubmitButton>
      </div>
    </form>
  );
}
