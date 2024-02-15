import TopOfLineCard from "@/containers/molecules/toOfLineCard/TopOfLineCard";
import React, { useContext } from "react";
import styles from "@/styles/TopOfLineCard.module.scss";
import { StoreContext, StoreContextState } from "@/contextStore/storeProvider";
import TopOfLineCardSkelton from "@/containers/skeltons/TopOfLineSkelton";

type Props = {
  title: string;
};

const TopOfLine = (props: Props) => {
  const store = useContext<StoreContextState>(StoreContext);
  const [hotTopic] = store.hotTopics;
  return (
    <div className={styles.container}>
      <p className={styles.heading}>{props.title}</p>
      {hotTopic.topics.length === 0 ? (
        <>
          {Array.from(Array(3)).map((loader) => (
            <TopOfLineCardSkelton key={loader} />
          ))}
        </>
      ) : (
        <div>
          {hotTopic.topics.map((topic, index) => (
            <TopOfLineCard {...topic} key={index} />
          ))}
          {hotTopic.topics.length !== 0 && (
            <p className={styles.see__list}>See the full list</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TopOfLine;
