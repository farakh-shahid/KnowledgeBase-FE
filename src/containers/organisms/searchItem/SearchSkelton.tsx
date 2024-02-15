import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "@/styles/SearchItem.module.scss";
type Props = {};

const SearchSkelton = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Skeleton circle width={40} height={40} />
        <Skeleton className={styles.title__loader} width={200} height={30} />
      </div>
      <Skeleton width={24} height={24} className={styles.open__icon} />
    </div>
  );
};

export default SearchSkelton;
