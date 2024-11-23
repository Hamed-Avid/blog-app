import PostsTable from "../posts/_components/PostsTable";

export default function LatestPosts() {
  const query = "sort=latest&limit=5";

  return <PostsTable query={query} />;
}
