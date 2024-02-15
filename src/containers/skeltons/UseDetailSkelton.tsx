import React from "react";
import styles from "@/styles/UserDetails.module.scss";
import Skeleton from "react-loading-skeleton";

const UserDetailSkelton = ({ right }: { right?: boolean }) => {
  return (
    <div className={styles.user__detail}>
      <Skeleton circle width={30} height={30} />
      <Skeleton width={100} height={20} />
      {right && <Skeleton width={70} height={20} />}
    </div>
  );
};

export default UserDetailSkelton;
