import React from "react";
import styles from "@/styles/Chip.module.scss";
import Skeleton from "react-loading-skeleton";

const ChipSkelton = () => {
  return (
    <div>
      <Skeleton width={100} height={25} />
    </div>
  );
};

export default ChipSkelton;
