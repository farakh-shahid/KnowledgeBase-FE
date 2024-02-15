import { MouseEventHandler } from 'react';

export interface AuthorProps {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
}
export interface ContentProps {
  id: string;
  description: string;
  author: AuthorProps;
  readTime: string;
  createdAt: string;
}
export interface QuestionProps {
  id: string;
  type: string;
  author: AuthorProps;
  contents: ContentProps[];
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  createdAt: string;
  time_to_read: string;
  bookmarked: boolean;
  cover_image: string;
  count: number;
  likes: string[];
  onClick: MouseEventHandler<HTMLDivElement>;
  picture?: string;
}
