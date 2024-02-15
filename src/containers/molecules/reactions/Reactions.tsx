import React from 'react';
import styles from '@/styles/TopicPage.module.scss';

type Props = {
  like: boolean;
  toggleLike: React.MouseEventHandler<HTMLDivElement>;
  count: number;
  isComment?: boolean;
};

const Reactions = (props: Props) => {
  return (
    <div className={styles.bottom__container}>
      <div className={styles.bottom__left}>
        <div onClick={props.toggleLike}>
          {!props.like ? (
            <span className={styles.like__outlined}></span>
          ) : (
            <span className={styles.like__filled}></span>
          )}{' '}
          <span className={styles.reactions__count}>{props.count}</span>
        </div>
        {props.isComment && <span className={styles.comment__outlined}></span>}
      </div>
      <div className={styles.bottom__right}></div>
    </div>
  );
};

export default Reactions;
