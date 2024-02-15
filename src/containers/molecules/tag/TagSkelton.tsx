import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "@/styles/Tag.module.scss";

const TagSkelton = () => {
  return (
    <div className={styles.tag__item}>
      <Skeleton width={30} height={30} />
      <Skeleton height={30} width={100} />
    </div>
  );
};

export default TagSkelton;
