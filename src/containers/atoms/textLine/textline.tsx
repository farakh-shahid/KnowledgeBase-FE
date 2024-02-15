import React from "react";
import style from "../../../styles/textLine.module.scss";

const Textline = () => {
  return (
    <div className={style.container}>
      <div className={style.line} />
      <p className={style.text}>or</p>
      <div className={style.line} />
    </div>
  );
};

export default Textline;
