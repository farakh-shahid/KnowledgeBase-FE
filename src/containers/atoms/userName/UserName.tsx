import React from "react";
import styles from "@/styles/UserName.module.scss";
import { UserNameProps } from "@/interfaces/userNameProps";

const UserName = (props: UserNameProps) => {
  return (
    <div className={styles.user__name}>
      {props.isSeprator ? (
        <p>{props.user_name} &#x2022;</p>
      ) : (
        <p>{props.user_name}</p>
      )}
    </div>
  );
};

export default UserName;
