import { ButtonGroup } from "@/styles/styledComponets/ButtonGroup";
import { Tab } from "@/styles/styledComponets/Tab";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext, StoreContextState } from "@/contextStore/storeProvider";
import { getTopicsByType } from "@/services/api/topicService";
import Question from "../question/Question";
import InfiniteScroll from "react-infinite-scroll-component";
import TabGroupSkelton from "@/containers/skeltons/TabGroupSkelton";
import { useRouter } from "next/router";
import TopicCardSkelton from "@/containers/skeltons/TopicCardSkelton";
import styles from "@/styles/tabGroup.module.scss";
const TabGroup = () => {
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const store = useContext<StoreContextState>(StoreContext);
  const [active, setActive] = store.activeTab;
  const [isLoading, setIsLoading] = store.loading;
  const [topics, setTopics] = store.topics;
  const currentType = active as keyof typeof topics;
  const fetchTopicsByType = async (type: string) => {
    try {
      setIsLoading(true);
      const res = await getTopicsByType(type, 0);
      if (res.data) {
        setTopics((prev) => ({
          ...prev,
          [currentType]: [...res.data],
        }));
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const fetchMoreTopicsByType = async () => {
    const currentType = active as keyof typeof topics;
    if (topics[currentType].length >= topics[currentType][0]?.count) {
      setHasMore(false);
    }
    try {
      const res = await getTopicsByType(
        active.toLowerCase(),
        topics[currentType].length
      );
      if (res.data) {
        setTopics((prev) => ({
          ...prev,
          [currentType]: [...prev[currentType], ...res.data],
        }));
      }
    } catch (error) {}
  };

  useEffect(() => {
    setHasMore(true);
    setTimeout(() => {
      if (topics[active as keyof typeof topics].length > 0)
        setTopics({ ...topics });
      else {
        fetchTopicsByType(active.toLowerCase());
      }
    }, 100);
  }, [active, setActive]);

  useEffect(() => {
    setTimeout(() => {
      if (topics[active as keyof typeof topics].length > 0)
        setTopics({ ...topics });
      else {
        fetchTopicsByType(active.toLowerCase());
      }
    }, 100);
  }, []);

  return (
    <>
      <ButtonGroup>
        {Object.keys(topics).map((type) => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => {
              setActive(type);
            }}
          >
            {type}
          </Tab>
        ))}
      </ButtonGroup>
      {!isLoading ? (
        <InfiniteScroll
          dataLength={topics[active as keyof typeof topics]?.length}
          next={fetchMoreTopicsByType}
          hasMore={hasMore}
          height={840}
          loader={<TopicCardSkelton />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {topics[active as keyof typeof topics].length === 0 ? (
            <div className={styles.no__data}>
              <p>Nothing to display!</p>
            </div>
          ) : (
            topics[active as keyof typeof topics].map((topic) => {
              return (
                <Question
                  {...topic}
                  key={topic.id}
                  type={active}
                  onClick={() => {
                    setActive(active);
                    router.push(`/topic/${topic.id}`);
                  }}
                />
              );
            })
          )}
        </InfiniteScroll>
      ) : (
        <TabGroupSkelton />
      )}
    </>
  );
};

export default TabGroup;
