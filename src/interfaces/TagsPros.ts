import { TagProps } from "./tagProps";

export interface TagsProps {
  tags: TagProps[];
  setTags: React.Dispatch<React.SetStateAction<TagProps[]>>;
}
