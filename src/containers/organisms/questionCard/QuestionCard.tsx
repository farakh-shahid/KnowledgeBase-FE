import QuestionCardSkelton from '@/containers/skeltons/questionCard/QuestionCardSkelton';
import BookMark from '@/containers/atoms/bookMark/BookMark';
import CardHeading from '@/containers/atoms/cardHeading/CardHeading';
import Chip from '@/containers/atoms/chip/Chip';
import DateTime from '@/containers/atoms/date/Date';
import Reactions from '@/containers/molecules/reactions/Reactions';
import { QuestionProps } from '@/interfaces/questionProps';
import styles from '@/styles/TopicPage.module.scss';
import { calulateReadTime, parseDate } from '@/utils/functions';
import { IMAGE_REGEX } from '@/constants';

export const QuestionCard = (props: {
  question: QuestionProps | undefined;
  like: boolean;
  toggleLike: React.MouseEventHandler<HTMLDivElement>;
  loading: boolean;
}) => {
  const {
    createdAt,
    description,
    tags,
    title,
    bookmarked,
    likes,
    contents,
    picture,
  } = props.question || {};
  const { readTime } = contents?.[0] || {};
  if (props.loading) return <QuestionCardSkelton />;

  const formatDescription = (description: string) => {
    const regex = IMAGE_REGEX;
    const formattedDescription = description.replace(regex, (match, p1) => {
      return `<img class="${styles.question__image}" src="${p1}"`;
    });
    return formattedDescription;
  };

  return (
    <>
      <div>
        <div className={styles.bread__crumbs__container}>
          <div className={styles.bread__crumbs__left}>
            <DateTime label={parseDate(createdAt)} />
            {readTime || calulateReadTime(description as string)} min read
          </div>
          <div className={styles.bread__crumbs__right}>
            <BookMark isBookmarked={bookmarked as boolean} onClick={() => {}} />
          </div>
        </div>
        <CardHeading heading={title ?? ''} />
        <p
          className={styles.question__heading}
          dangerouslySetInnerHTML={{
            __html: formatDescription(description as string),
          }}
        ></p>
        <p className={styles.question__heading}></p>
        <div className={styles.categories__container}>
          {tags?.map((value, index) => {
            return <Chip title={value} key={index} onClick={() => {}} />;
          })}
        </div>
        <Reactions
          like={props.like}
          toggleLike={props.toggleLike}
          count={likes?.length as number}
          isComment={false}
        />
      </div>
    </>
  );
};
