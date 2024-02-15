import { TabGroupTypes } from "@/constants/tabGroup/TabGroupTypes";
import { ButtonGroup } from "@/styles/styledComponets/ButtonGroup";
import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "@/styles/tabGroup.module.scss";
import TopicCardSkelton from "./TopicCardSkelton";

const TabGroupSkelton = () => {
  return (
    <div>
      <TopicCardSkelton />
      <TopicCardSkelton />
      <TopicCardSkelton />
      <TopicCardSkelton />
    </div>
  );
};

export default TabGroupSkelton;
