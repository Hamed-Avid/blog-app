import type { Metadata } from "next";
import SideBar from "./profile/_components/SideBar";
import Header from "./profile/_components/Header";


export const metadata: Metadata = {
  title: "پروفایل",
};

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-secondary-0">
      <div className="grid h-screen grid-cols-12">
        <aside className="col-span-12 hidden lg:col-span-3 lg:block xl:col-span-2">
          <SideBar/>
        </aside>
        <div className="col-span-12 flex h-screen flex-col lg:col-span-9 xl:col-span-10">
          <Header />
          <main className="flex-1 overflow-y-auto rounded-tr-3xl bg-secondary-100 p-4 md:p-6 lg:p-10">
            <div className="xl:max-w-screen-xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
