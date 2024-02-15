import React from 'react';
import UserDetail from '../userDetail/UserDetail';
import styles from '@/styles/TopOfLineCard.module.scss';
import { QuestionDto } from '@/interfaces/QuestionDto';
import { useRouter } from 'next/router';

const TopOfLineCard = (props: QuestionDto) => {
  const router = useRouter();
  const { id, title, author } = props;

  const user_name = `${author?.firstName} ${author?.lastName}`;
  const titleWords = title.split(' ');
  const truncatedTitle = titleWords.slice(0, 10).join(' ');
  return (
    <div className={styles.card}>
      <UserDetail
        id={author?.id}
        user_name={user_name}
        asker_avatar={author?.picture}
        isSeprator={false}
      />
      <p
        className={styles.title}
        onClick={() => {
          router.push(`/topic/${id}`);
        }}
      >
        {truncatedTitle}
      </p>
    </div>
  );
};

export default TopOfLineCard;
