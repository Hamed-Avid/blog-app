"use client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function NotFound() {
  return (
    <div className="h-screen">
      <div className="container xl:max-w-screen-xl">
        <div className="flex justify-center pt-10">
          <div>
            <h1 className="text-xl font-bold text-red-700 mb-8">
              پستی که دنبالش بودید، پیدا نشد
            </h1>
            <Link
              href="/blogs"
              className="flex items-center gap-x-2 text-secondary-500"
            >
              <ArrowRightIcon className="size-6 text-primary-900" />
              <span>برگشت</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
