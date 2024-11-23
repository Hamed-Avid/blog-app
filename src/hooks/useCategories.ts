import { GetCategoriesApi } from "@/services/categoryService";
import type { Category } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () =>
  useQuery<{ categories: Category[] }>({
    queryKey: ["get-categories"],
    queryFn: (options) => GetCategoriesApi(options),
  });
