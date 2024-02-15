import React, { useContext, useEffect } from "react";
import Categories from "../categories/Categories";
import TopOfLine from "../topOfLine/TopOfLine";
import styles from "@/styles/RightPanel.module.scss";
import Divider from "@/containers/atoms/divider/Divider";
import ReadingList from "@/containers/molecules/readingList/ReadingList";
import { getHotTopics } from "@/services/api/topicService";
import { StoreContext, StoreContextState } from "@/contextStore/storeProvider";

const RightPanel = () => {
  const store = useContext<StoreContextState>(StoreContext);
  const [, setHotTopics] = store.hotTopics;
  useEffect(() => {
    const fetchHotTopics = async () => {
      try {
        const res = await getHotTopics();
        if (res.data) setHotTopics(res.data);
      } catch (error) {}
    };
    fetchHotTopics();
  }, []);
  return (
    <div className={styles.container}>
      <TopOfLine title='Top of the line' />
      <Divider />
      <Categories />
      <ReadingList />
    </div>
  );
};

export default RightPanel;
