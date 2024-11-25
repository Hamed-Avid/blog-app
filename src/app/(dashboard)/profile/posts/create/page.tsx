import Breadcrumbs from "@/ui/Breadcrumbs";
import PostForm from "../_components/PostForm";

export default async function CreatePost() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "پست ها", href: "/profile/posts" },
          { label: "ایجاد پست", href: "/profile/posts/create", active: true },
        ]}
      />
      <PostForm />
    </>
  );
}
