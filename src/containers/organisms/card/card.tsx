import React from 'react';
import styles from '@/styles/UserProfile.module.scss';
import { BlogPost, Topic } from '@/interfaces/userProfile';
import UserDetail from '@/containers/molecules/userDetail/UserDetail';
import { useRouter } from 'next/router';
import CardHeading from '@/containers/atoms/cardHeading/CardHeading';
import CardDescription from '@/containers/atoms/cardDescription/CardDescription';
import { options } from '@/constants';
import { UserProfileTab } from '@/constants/tabGroup/TabGroupTypes';

const Card = ({
  id,
  title,
  description,
  createdAt,
  type,
  topic,
  author,
}: BlogPost | Topic) => {
  const router = useRouter();

  const date: Date = new Date(
    type === UserProfileTab[1] ? createdAt || '' : topic?.createdAt || ''
  );
  const userName =
    type === UserProfileTab[1]
      ? `${author?.firstName} ${author?.lastName}`
      : `${topic?.author?.firstName} ${topic?.author?.lastName}`;

  return (
    <React.Fragment>
      <div className={styles.rectange__card}>
        <div className="">
          <UserDetail
            user_name={userName}
            time_published={`${date.toLocaleDateString('en-Us', options)}`}
            asker_avatar={''}
            isSeprator
          />
        </div>
        <div
          onClick={() => {
            router.push(`/topic/${id}`);
          }}
        >
          <CardHeading
            heading={
              type && type === UserProfileTab[1]
                ? title || ''
                : topic?.title || ''
            }
          />
          <CardDescription
            description={
              type && type === UserProfileTab[1]
                ? description || ''
                : topic?.description || ''
            }
          />
        </div>
        <div></div>
      </div>
    </React.Fragment>
  );
};

export default Card;
