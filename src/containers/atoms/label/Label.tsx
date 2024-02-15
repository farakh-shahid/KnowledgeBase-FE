import React from "react";
import styles from "../../../styles/label.module.scss";
import { LabelProps } from "@/interfaces/labelProps";

const Label = (props: LabelProps) => {
  return <p className={styles.label}>{props.label}</p>;
};
export default Label;
