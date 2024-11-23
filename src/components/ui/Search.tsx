"use client";

import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateQueryParams = useCallback(
    (search: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (search) {
        newParams.set("search", search);
      } else {
        newParams.delete("search");
      }
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      updateQueryParams(search);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [search, updateQueryParams]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateQueryParams(search);
  };

  const clearHandler = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("search");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    setSearch("");
  };

  return (
    <form onSubmit={submitHandler} className="relative">
      <input
        type="text"
        name="search"
        autoComplete="off"
        placeholder="جستجو ..."
        className={`textField__input bg-secondary-0 py-3 text-xs ${search ? "pr-10" : ""}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search"
      />
      {search && (
        <button
          type="button"
          onClick={clearHandler}
          aria-label="clear"
          className="absolute right-0 top-0 mr-3 h-full"
        >
          <XCircleIcon className="h-4 text-secondary-400" />
        </button>
      )}

      <button
        type="submit"
        aria-label="search"
        className="absolute left-0 top-0 ml-3 flex h-full items-center"
      >
        <MagnifyingGlassIcon className="h-4 text-secondary-400" />
      </button>
    </form>
  );
}
