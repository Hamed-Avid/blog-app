import type { Post } from "@/types/Post";
import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import { toPersianDigits } from "@/utils/numberFormatter";
import truncateText from "@/utils/trancateText";
import { DeletePost, UpdatePost } from "./Buttons";

type PostRowProps = { post: Post; index: number };

const typesStyle: {
  [key: string]: {
    label: string;
    className: string;
  };
} = {
  free: {
    label: "رایگان",
    className: "badge--success",
  },
  premium: {
    label: "پولی",
    className: "badge--secondary",
  },
};

export default function PostRow({ post, index }: PostRowProps) {
  const { title, category, author, createdAt, type, _id } = post;
  return (
    <Table.Row>
      <td>{toPersianDigits(++index)}</td>
      <td>{truncateText(title, 25)}</td>
      <td>{category.title}</td>
      <td>{author.name}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>
        <span className={`badge ${typesStyle[type].className}`}>
          {typesStyle[type].label}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-3">
          <UpdatePost postId={_id} />
          <DeletePost postId={_id} />
        </div>
      </td>
    </Table.Row>
  );
}
