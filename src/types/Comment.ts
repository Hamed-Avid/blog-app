export type Comment = {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar: string | null;
    avatarUrl: string | null;
  };
  content: {
    text: string;
  };
  status: 0 | 1 | 2;
  openToComment: boolean;
  createdAt: string;
  answers: {
    content: {
      text: string;
    };
    status: number;
    openToComment: boolean;
    createdAt: string;
    _id: string;
    user: {
      _id: string;
      name: string;
      avatar: string;
      avatarUrl: string;
    };
  }[];
};
