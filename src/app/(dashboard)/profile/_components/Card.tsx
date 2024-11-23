import {
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

type CardProps = {
  title: string;
  value: number | string;
  type: "comments" | "users" | "posts";
};

const iconMap = {
  comments: ChatBubbleBottomCenterTextIcon,
  users: UserGroupIcon,
  posts: DocumentIcon,
};

export function Card({ title, value, type }: CardProps) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-secondary-50 p-2 shadow-sm">
      <div className="flex p-4 text-secondary-600">
        <Icon className="size-5" />
        <h3 className="mr-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`truncate rounded-xl bg-secondary-0 px-4 py-8 text-center text-2xl text-secondary-500`}
      >
        {value}
      </p>
    </div>
  );
}
