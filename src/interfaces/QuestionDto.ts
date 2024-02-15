import { AuthorProps } from './questionProps';

export interface QuestionDto {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  authorId?: string;
  asked?: string[];
  author?: AuthorProps;
  categories: string[];
  picture: string | undefined;
  tenantId?: string;
}
