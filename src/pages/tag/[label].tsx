import Header from "@/containers/organisms/header/Header";
import { ButtonGroup } from "@/styles/styledComponets/ButtonGroup";
import { Tab } from "@/styles/styledComponets/Tab";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styles from "@/styles/TagPage.module.scss";
import { StoreContext, StoreContextState } from "@/contextStore/storeProvider";
import SubHeading from "@/containers/atoms/subHeading/SubHEading";
import Chip from "@/containers/atoms/chip/Chip";
import TopUser from "@/containers/organisms/topUser/TopUser";
const Category = () => {
  const TYPES = ["Trending", "Latest", "Best"];
  const router = useRouter();
  const label = router.query.label as string;
  const store = useContext<StoreContextState>(StoreContext);
  const [active, setActive] = useState(TYPES[0]);
  const [hotTopic] = store.hotTopics;

  return (
    <>
      <Header />
      <div className='grid__container'>
        <div className='grid__left__panel'>
          <div className={styles.heading}>
            <FontAwesomeIcon icon={faTag} className={styles.tag__icon} />
            <p className={styles.title}>
              {label?.charAt(0).toUpperCase() + label?.slice(1)}
            </p>
          </div>
          <ButtonGroup>
            {TYPES.map((type) => (
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
        </div>
        <div className='grid__right__panel'>
          <div className={styles.rightPanel}>
            <SubHeading value='Related Topics' />
            <div className={styles.related__topics}>
              {hotTopic.tags.map((label) => {
                return (
                  <Chip title={label.title} key={label.id} onClick={() => {}} />
                );
              })}
            </div>
            <SubHeading value='Top Writers' />
            <div className={styles.top__writers}>
              <TopUser />
              <TopUser />
              <TopUser />
              <p className={styles.see__more}>See more</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
