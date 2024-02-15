import React, { useState } from "react";
import styles from "@/styles/BookMark.module.scss";
import { BookMarkProps } from "@/interfaces/bookmarProps";

const BookMark = (props: BookMarkProps) => {
  return (
    <span
      className={
        props.isBookmarked
          ? `${styles.bookmark__contained} `
          : `${styles.bookmark__outlined} `
      }
      onClick={props.onClick}
    ></span>
  );
};

export default BookMark;
