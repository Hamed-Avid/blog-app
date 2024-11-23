import { GetCategoriesApi } from "@/services/categoryService";
import type { Category } from "@/types/Category";
import Link from "next/link";

export default async function CategoryList() {
  const { categories } = await GetCategoriesApi();

  return (
    <ul>
      <li>
        <Link href="/blogs">همه</Link>
      </li>
      {categories.map(({ _id, slug, title }: Category) => (
        <li key={_id}>
          <Link href={`/blogs/category/${slug}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}
