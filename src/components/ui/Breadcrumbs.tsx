import Link from "next/link";

type BreadcrumbsProps = {
  breadcrumbs: {
    href: string;
    label: string;
    active?: boolean;
  }[];
};

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 block">
      <ol className="flex gap-x-2 text-lg">
        {breadcrumbs.map(({ href, label, active }, index) => (
          <li
            key={href}
            aria-current={active}
            className={`${
              active ? "text-secondary-700" : "text-secondary-500"
            } flex gap-x-2`}
          >
            <Link href={href}>{label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
