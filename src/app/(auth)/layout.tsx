import Header from "@/components/Header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-20 flex items-center justify-center">
        <div className="w-full max-w-md p-2">{children}</div>
      </div>
    </>
  );
}
