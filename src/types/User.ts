export type User = {
  _id: string;
  name: string;
  email: string;
  bookmarkedPosts: [];
  likedPosts: [];
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  avatarUrl: string | null;
};
