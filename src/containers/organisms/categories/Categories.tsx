import Chip from "@/containers/atoms/chip/Chip";
import React, { useContext } from "react";
import styles from "@/styles/Categories.module.scss";
import { StoreContext, StoreContextState } from "@/contextStore/storeProvider";
import { useRouter } from "next/router";
import ChipSkelton from "@/containers/skeltons/CHipSkelton";

const Categories = () => {
  const router = useRouter();
  const store = useContext<StoreContextState>(StoreContext);
  const [hotTopic] = store.hotTopics;

  return (
    <div className={styles.container}>
      <p className={styles.label}>Tags</p>
      <div className={styles.categories__container}>
        {hotTopic.tags.length === 0 ? (
          <>
            {Array.from(Array(5)).map((loader) => (
              <ChipSkelton key={loader} />
            ))}
          </>
        ) : hotTopic.tags.length !== 0 ? (
          hotTopic.tags.map((category) => (
            <Chip
              title={category.title}
              key={category.id}
              onClick={() => {
                router.push(`/tag/${category.title}`);
              }}
            />
          ))
        ) : (
          <p>Nothing to show here</p>
        )}
      </div>
    </div>
  );
};
export default Categories;
