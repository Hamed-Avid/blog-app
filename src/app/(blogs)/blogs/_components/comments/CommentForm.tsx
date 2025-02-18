"use client";

import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TextAreaFiled from "@/ui/TextAreaField";
import SubmitButton from "@/ui/SubmitButton";
import { createCommentAction } from "@/pages/(blogs)/blogs/_actions/actions";

type CommentFormProps = {
  postId: string;
  parentId: string | null;
  onClose: () => void;
};

type CommentFormState = { error?: string; message?: string };

const initialState: CommentFormState = { error: undefined, message: undefined };

export default function CommentForm({
  postId,
  parentId,
  onClose,
}: CommentFormProps) {
  const [text, setText] = useState("");
  const [state, formAction, pending] = useActionState(
    createCommentAction,
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
    <div>
      <div className="mt-4 flex justify-center">
        <div className="w-full max-w-md">
          <form
            className="space-y-7"
            action={async (formData) =>
              await formAction({ formData, postId, parentId })
            }
          >
            <TextAreaFiled
              name="text"
              label="متن نظر"
              value={text}
              isRequired
              onChange={(e) => setText(e.target.value)}
            />

            <SubmitButton type="submit" className="w-full" disabled={pending}>
              {parentId ? "ثبت پاسخ" : "ثبت نظر"}
            </SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}
