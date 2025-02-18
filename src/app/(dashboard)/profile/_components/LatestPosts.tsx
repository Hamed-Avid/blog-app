import PostsTable from "../posts/_components/PostsTable";

export default async function LatestPosts() {
  return <PostsTable query="sort=latest&limit=5" />;
}
