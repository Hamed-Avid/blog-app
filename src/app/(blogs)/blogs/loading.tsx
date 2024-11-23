import Spinner from "@/ui/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span className="text-lg text-secondary-500">
        در حال بارگذاری اطلاعات
      </span>
      <Spinner />
    </div>
  );
}
