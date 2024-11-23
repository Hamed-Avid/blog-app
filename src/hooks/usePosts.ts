import { createPostApi } from "@/services/postService";
import type { CustomError } from "@/types/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutateAsync: createPostAsync } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-posts"] });
    },
    onError: (error) => {
      const err = error as CustomError;
      toast.error(err?.response?.data?.message || "An error occurred");
    },
  });

  return { isCreating, createPostAsync };
}
