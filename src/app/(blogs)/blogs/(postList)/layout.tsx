import { Metadata } from "next";
import CategoryList from "../_components/CategoryList";
import { Suspense } from "react";
import Spinner from "@/ui/Spinner";
import Search from "@/ui/Search";
import Sort from "@/ui/Sort";

export const metadata: Metadata = {
  title: "بلاگ ها",
};

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="mb-12 grid grid-cols-1 items-center gap-8 text-secondary-700 lg:grid-cols-3">
        <h1 className="text-lg font-bold">لیست بلاگ ها</h1>
        <Search />
        <Sort />
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 space-y-4 text-secondary-500 lg:col-span-4 xl:col-span-3">
          <Suspense fallback={<Spinner />}>
            <CategoryList />
          </Suspense>
        </div>
        <div className="col-span-12 lg:col-span-8 xl:col-span-9">
          {children}
        </div>
      </div>
    </>
  );
}
