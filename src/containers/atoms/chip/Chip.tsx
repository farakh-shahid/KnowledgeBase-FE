import React from "react";
import styles from "@/styles/Chip.module.scss";
import { ChipProps } from "@/interfaces/chipProps";

const Chip = (props: ChipProps) => {
  return (
    <div className={styles.chip} onClick={props.onClick}>
      <p>{props.title}</p>
    </div>
  );
};

export default Chip;
