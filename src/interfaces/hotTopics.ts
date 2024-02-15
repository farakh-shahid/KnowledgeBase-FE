import { QuestionDto } from "./QuestionDto";
import { TagProps } from "./tagProps";

export interface HotTopicsProps {
  topics: QuestionDto[];
  tags: TagProps[];
}
