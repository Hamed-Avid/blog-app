import Breadcrumbs from "@/ui/Breadcrumbs";
import CreatePostForm from "../_components/CreatePostForm";

export default function CreatePost() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "پست ها", href: "/profile/posts" },
          { label: "ایجاد پست", href: "/profile/posts/create", active: true },
        ]}
      />
      <CreatePostForm />
    </div>
  );
}
