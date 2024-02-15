import React from "react";
import styles from "@/styles/SubHeading.module.scss";
const SubHeading = ({ value }: { value: string }) => {
  return <p className={styles.label}>{value}</p>;
};

export default SubHeading;
