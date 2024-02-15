import React, { useContext, useState } from 'react';
import styles from '@/styles/Question.module.scss';
import Chip from '@/containers/atoms/chip/Chip';
import UserDetail from '@/containers/molecules/userDetail/UserDetail';
import CardHeading from '@/containers/atoms/cardHeading/CardHeading';
import CardDescription from '@/containers/atoms/cardDescription/CardDescription';
import DateTime from '@/containers/atoms/date/Date';
import BookMark from '@/containers/atoms/bookMark/BookMark';
import CoveImage from '@/containers/atoms/coverImage/CoveImage';
import { QuestionProps } from '@/interfaces/questionProps';
import { useRouter } from 'next/navigation';
import { options } from '@/constants';
import { getTopicsByType, updateTopic } from '@/services/api/topicService';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
const Question = (props: QuestionProps) => {
  const {
    type,
    categories,
    tags,
    id,
    author,
    contents,
    createdAt,
    time_to_read,
    title,
    description,
    cover_image,
    bookmarked,
    picture,
  } = props;

  const store = useContext<StoreContextState>(StoreContext);
  const [topics, setTopics] = store.topics;
  const [isBookmark, setBookmark] = useState<boolean>(bookmarked);

  const date: Date = new Date(createdAt);
  const userName = `${author?.firstName} ${author?.lastName}`;
  const updateSingleTopic = async (body: any, id: string) => {
    try {
      setBookmark(!isBookmark);
      const updatedTopic = await updateTopic(body, id);
      if (updatedTopic.data) {
        const latest_topics = await getTopicsByType(type.toLowerCase(), 0);
        if (latest_topics.data)
          setTopics((prev) => ({
            ...prev,
            [type]: [...latest_topics.data],
          }));
        setBookmark(bookmarked);
      }
    } catch (error) {}
  };
  return (
    <div className={styles.card}>
      <div className={styles.card__left}>
        <UserDetail
          user_name={userName}
          time_published={date.toLocaleDateString('en-Us', options)}
          asker_avatar={author?.picture}
          isSeprator
        />
        <div onClick={props.onClick}>
          <CardHeading heading={title} />
          <CardDescription description={description} />
        </div>

        <div className={styles.bottom__container}>
          <div className={styles.category}>
            {tags?.map((category, index) => {
              return <Chip title={category} key={index} onClick={() => {}} />;
            })}
            <DateTime label={time_to_read} />
          </div>
          <BookMark
            isBookmarked={isBookmark}
            key={id}
            onClick={() => {
              updateSingleTopic({ bookmarked: !bookmarked }, id);
            }}
          />
        </div>
      </div>
      <div className={styles.card__right}>
        <CoveImage image_url={picture || ''} />
      </div>
    </div>
  );
};

export default Question;
