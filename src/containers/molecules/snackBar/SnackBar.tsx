import React from "react";
import Styles from "@/styles/SnackBar.module.scss";
type Props = {
  isActive: boolean;
  message: string | undefined;
};

const SnackBar = (props: Props) => {
  const { isActive, message } = props;
  return (
    <div
      className={
        isActive
          ? [Styles.snackbar, Styles.fadeIn].join(" ")
          : [Styles.snackbar, Styles.fadeOut].join(" ")
      }
    >
      {message}
    </div>
  );
};

export default SnackBar;
