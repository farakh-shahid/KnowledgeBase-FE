import BookMark from "@/containers/atoms/bookMark/BookMark";
import DateTime from "@/containers/atoms/date/Date";
import styles from "@/styles/TopicPage.module.scss";
import { BreadCrumbsProps } from "@/interfaces/breadCrumbProps";

const BreadCrumbs = ({ createdAt, readTime, bookmarked }: BreadCrumbsProps) => {
  return (
    <div className={styles.bread__crumbs__container}>
      <div className={styles.bread__crumbs__left}>
        <DateTime label={createdAt} />
        {readTime} min read
      </div>
      <div className={styles.bread__crumbs__right}>
        <BookMark isBookmarked={bookmarked} onClick={() => {}} />
      </div>
    </div>
  );
};

export default BreadCrumbs;
