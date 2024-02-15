import Reactions from '@/containers/molecules/reactions/Reactions';
import UserDetail from '@/containers/molecules/userDetail/UserDetail';
import { ContentProps } from '@/interfaces/questionProps';
import { parseDate } from '@/utils/functions';
import styles from '@/styles/TopicPage.module.scss';
import { IMAGE_REGEX } from '@/constants';

export const Answer = (props: ContentProps) => {
  const userName = `${props.author?.firstName} ${props.author?.lastName}`;
  const formatDescription = (description: string) => {
    const regex = IMAGE_REGEX;
    const formattedDescription = description.replace(regex, (match, p1) => {
      return `<img class="${styles.question__image}" src="${p1}"`;
    });
    return formattedDescription;
  };
  return (
    <div className={styles.answer__card}>
      <UserDetail
        user_name={userName}
        time_published={parseDate(props.createdAt)}
        asker_avatar={props.author?.picture}
        isSeprator
      />
      <p
        className={styles.question__heading}
        dangerouslySetInnerHTML={{
          __html: formatDescription(props.description as string),
        }}
      ></p>
      {/* <Reactions /> */}
      {/* will use this after content api update */}
    </div>
  );
};
