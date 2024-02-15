import React from "react";
import styles from "@/styles/TopicPage.module.scss";
import Skeleton from "react-loading-skeleton";
import Divider from "@/containers/atoms/divider/Divider";

const QuestionCardSkelton = () => {
  return (
    <div>
      <div className={styles.bread__crumbs__container}>
        <div className={styles.bread__crumbs__left}>
          <Skeleton width={100} height={30} />
          <Skeleton width={100} height={30} />
        </div>
        <div className={styles.bread__crumbs__right}>
          <Skeleton width={40} height={40} />
        </div>
      </div>
      <Skeleton className={styles.title__loader} />
      <Skeleton className={styles.description__loader} />
      <Skeleton className={styles.description__loader} />
      <div className={styles.categories__container}>
        <Skeleton width={60} height={30} />
        <Skeleton width={60} height={30} />
      </div>
      <Divider />
      <Skeleton className={styles.detailed__review__loader} />
      <Divider />

      <Skeleton className={styles.detailed__review__loader} />
      <Skeleton className={styles.quill__loader} />
      <Skeleton className={styles.quill__container__loader} />
      <div className={styles.feedback__contaier}>
        <Skeleton className={styles.button__outlined__loader} />
        <Skeleton className={styles.terms__loader} />
      </div>
    </div>
  );
};

export default QuestionCardSkelton;
