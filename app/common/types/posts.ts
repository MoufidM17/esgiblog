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

export type PostType = {
    title: string;
    description: string,
    owner: {
      name: string | null,
    }
    createdAt: Date,
    updatedAt: Date,
} | null

export type Posts = PostCardType[]
