"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, ChangeEvent } from "react";

type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  {
    label: "جدید ترین",
    value: "latest",
  },
  {
    label: "قدیمی ترین",
    value: "earliest",
  },
  {
    label: "محبوبیت",
    value: "popular",
  },
  {
    label: " کوتاه ترین",
    value: "time_desc",
  },
  {
    label: "طولانی ترین",
    value: "time_asc",
  },
];

export default function Sort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [sort, setSort] = useState<string>(
    searchParams.get("sort") || "latest",
  );

  const createQueryString = useCallback(
    (name: string, value: string): string => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const sortHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    router.push(pathname + "?" + createQueryString("sort", e.target.value));
  };

  return (
    <select
      title="sort"
      value={sort}
      onChange={sortHandler}
      className="textField__input bg-secondary-0 py-2.5 text-xs"
    >
      {sortOptions.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
