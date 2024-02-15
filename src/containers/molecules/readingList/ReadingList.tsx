import React from "react";
import styles from "@/styles/ReadingList.module.scss";
type Props = {};

const ReadingList = (props: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.label}>Reading list</p>
      <div className={styles.categories__container}>
        <p>
          Click the <span className={styles.bookmark__outlined}></span> on any
          story to easily add it to your reading list or a custom list that you
          can share.
        </p>
      </div>
    </div>
  );
};

export default ReadingList;
