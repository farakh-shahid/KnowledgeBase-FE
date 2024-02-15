export interface Author {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string | null;
}

export interface TopicInterface {
  topic: TopicInterface[];
  id?: string;
  title?: string;
  description?: string;
  asked?: string[];
  authorId?: string;
  tags?: string[];
  categories?: string[];
  bookmarked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  author?: Author;
  likes?: string[];
  type?: any;
}

export interface ContentInterface {
  id: string;
  topicId: string;
  description: string;
  authorId: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
  topic: TopicInterface;
  type?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  author?: Author;
}

export interface UserProfileInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string | null;
  role: string | null;
  topic: TopicInterface[];
  content: ContentInterface[];
  count?: number | undefined;
  data?: TopicInterface[] | ContentInterface[];
}

export interface UserDetail {
  count: number;
  data?: {
    topic?: Topic[];
    Content?: BlogPost[];
  };
  // other properties
}

export interface Topic {
  topic?: TopicInterface;
  type?: string;
  count: number;
  id: string;
  title: string;
  description: string;
  asked: string[];
  authorId: string;
  tags: string[];
  categories: string[];
  bookmarked: boolean;
  likes: string[];
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string | null;
  };
}
export interface BlogPost {
  type?: string;
  author?: Author;
  id: string;
  topicId: string;
  authorId: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  likes: string[];
  bookmarked: boolean;
  createdAt: string;
  updatedAt: string;
  readTime: number;
  topic: {
    id: string;
    title: string;
    description: string;
    asked: string[];
    authorId: string;
    tags: string[];
    categories: string[];
    bookmarked: boolean;
    likes: string[];
    createdAt: string;
    updatedAt: string;
    author: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      picture: string | null;
    };
  };
}
