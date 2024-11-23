export type Post = {
  _id: string;
  title: string;
  slug: string;
  category: {
    _id: string;
    title: string;
    slug: string;
  };
  type: string;
  briefText: string;
  text: string;
  coverImage: string;
  readingTime: number;
  tags: never[];
  author: {
    _id: string;
    name: string;
    avatar: string;
    avatarUrl: string;
  };
  related: Post[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  coverImageUrl: string;
  id: string;
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: never[];
  commentsCount: number;
};
