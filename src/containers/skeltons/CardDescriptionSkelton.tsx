import React from "react";
import styles from "@/styles/CardDescription.module.scss";
import Skeleton from "react-loading-skeleton";

const CardDescriptionSkelton = () => {
  return (
    <div className={styles.description__conatiner}>
      <Skeleton className={styles.loader} />
    </div>
  );
};

export default CardDescriptionSkelton;
