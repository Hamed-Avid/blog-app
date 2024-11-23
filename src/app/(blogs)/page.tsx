import type { Metadata } from "next";
import Button from "@/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "خانه | وب اپلیکیشن بلاگ اپ",
};

export default async function Home() {
  return (
    <main>
      <h1 className="my-20 text-center text-2xl font-bold text-secondary-800 md:text-5xl">
        اپلیکیشن مدیریت بلاگ
      </h1>

      <p className="text-center text-lg leading-loose text-secondary-500">
        جایی که قراره بتونی یه اپلیکیشن بلاگ کامل رو مدیریت کنی!
        <br /> بتونی بلاگ بسازی, کامنت بگذاری و در پنلت همه اتفاقات رو رصد کنی!
      </p>

      <div className="mt-10 flex w-full justify-center gap-x-8">
        <Button variant="outline">
          <Link href="/blogs">مطالعه بلاگ ها</Link>
        </Button>
        <Button variant="primary">
          <Link href="/profile">مدیریت بلاگ ها</Link>
        </Button>
      </div>
    </main>
  );
}
