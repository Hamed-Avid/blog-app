import {
  createPostApi,
  deletePostApi,
  updatePostApi,
} from "@/services/postService";
import type { CustomError } from "@/types/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutateAsync: createPostAsync } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      const err = error as CustomError;
      toast.error(err?.response?.data?.message || "An error occurred");
    },
  });

  return { isCreating, createPostAsync };
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutateAsync: updatePostAsync } = useMutation({
    mutationFn: ({ postId, data }: { postId: string; data: FormData }) =>
      updatePostApi(postId, data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      const err = error as CustomError;
      toast.error(err?.response?.data?.message || "An error occurred");
    },
  });

  return { isUpdating, updatePostAsync };
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutateAsync: deletePostAsync } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      const err = error as CustomError;
      toast.error(err?.response?.data?.message || "An error occurred");
    },
  });

  return { isDeleting, deletePostAsync };
}
