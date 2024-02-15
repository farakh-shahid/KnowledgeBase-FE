import React from "react";
import styles from "@/styles/Question.module.scss";
import UserDetailSkelton from "./UseDetailSkelton";
import Skeleton from "react-loading-skeleton";
import CardDescriptionSkelton from "./CardDescriptionSkelton";

const TopicCardSkelton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__left}>
        <UserDetailSkelton />
        <div>
          <Skeleton className={styles.heading__loader} />
          <CardDescriptionSkelton />
        </div>

        <div className={styles.bottom__container}>
          <div className={styles.category}>
            <Skeleton width={80} height={30} />
            <Skeleton width={80} height={30} />
          </div>
          <Skeleton height={40} width={40} />
        </div>
      </div>
      <div className={styles.card__right}>
        <Skeleton height={120} width={120} />
      </div>
    </div>
  );
};

export default TopicCardSkelton;
