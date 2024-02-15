import React from "react";
import styles from "@/styles/CardHeading.module.scss";
import { CardHeadingProps } from "@/interfaces/cardHeadingProps";

const CardHeading = (props: CardHeadingProps) => {
  return (
    <div className={styles.heading__container}>
      <p className={styles.heading}>{props.heading}</p>
    </div>
  );
};

export default CardHeading;
