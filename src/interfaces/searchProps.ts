enum TagType {
  CATEGORY = 'CATEGORY',
  FEATURE = 'FEATURE',
  TAG = 'TAG',
}

interface Topic {
  id: string;
  title: string;
  description: string;
  tags: string[];
  authorId: string;
  author: Author;
}

interface Author {
  id: string;
  email: string;
  firstName: string | '';
  lastName: string | '';
  picture: any | null;
}

interface MatchedTagQuestion {
  id: string;
  title: string | '';
  description: string | '';
  tags: string[];
  author: Author;
}

interface Tag {
  id: string;
  title: string;
  type: TagType;
}

export interface SearchProps {
  hasMore?: boolean;
  Topics: Topic[];
  matchedTagQuestion: MatchedTagQuestion[];
  tags: Tag[];
  publishersOfMatchedQuestion: Author[];
  people: Author[];
}
