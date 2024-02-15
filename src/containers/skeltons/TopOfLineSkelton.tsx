import React from "react";
import styles from "@/styles/TopOfLineCard.module.scss";
import UserDetailSkelton from "./UseDetailSkelton";
import CardDescriptionSkelton from "./CardDescriptionSkelton";

const TopOfLineCardSkelton = () => {
  return (
    <div className={styles.card}>
      <UserDetailSkelton right={false} />
      <CardDescriptionSkelton />
    </div>
  );
};

export default TopOfLineCardSkelton;
