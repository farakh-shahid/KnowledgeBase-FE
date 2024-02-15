import React from "react";
import styles from "@/styles/TopUser.module.scss";
import UserAvatar from "@/containers/atoms/userAvatar/UserAvatar";
import SubHeading from "@/containers/atoms/subHeading/SubHEading";
type Props = {};

const TopUser = (props: Props) => {
  return (
    <div className={styles.container}>
      <UserAvatar size={35} iconSize={20} avatar_url={""} onClick={() => {}} />
      <div className={styles.sub__container}>
        <div className={styles.user__detail}>
          <SubHeading value='Will Smith' />
          <p className={styles.description}>
            Journalist passionate about cutting edge technology, and new things
            comming to the world
          </p>
        </div>
        <button className={styles.button}>Follow</button>
      </div>
    </div>
  );
};

export default TopUser;
