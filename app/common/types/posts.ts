export type PostCardType = {
    id: string,
    title: string,
    createdAt: Date,
    owner: {
      id: string,
      name: string | null,
    };
    likes: {
      user: {
        email: string | null;
      };
      userId: string;
    }[],
    _count: {
      likes: number,
    };
}

export type GetPostType = {
    id: string,
    title: string;
    description: string,
    userId: string,
    owner: {
      name: string | null,
      email: string | null,
    }
    createdAt: Date,
    updatedAt: Date,
} | null

export type AddPostType = {
  title: string;
  description: string,
  userId: string,
  createdAt?: Date,
  updatedAt?: Date,
} 

export type Posts = PostCardType[]
