import React, { useContext, useEffect, useState } from 'react';
import styles from '@/styles/LandingPage.module.scss';
import Header from '@/containers/organisms/header/Header';
import TabGroup from '@/containers/organisms/tabGroup/TabGroup';
import 'react-toastify/dist/ReactToastify.css';
import RightPanel from '@/containers/organisms/rightPanel/RightPanel';
import SearchOverlay from '@/containers/organisms/searchOverlay/SearchOverlay';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';

const LandingPage = () => {
  const store = useContext<StoreContextState>(StoreContext);
  const [isOverlay] = store.searchOverlay;

  return (
    <div>
      <Header />
      <div className={`${styles.grid__container}`}>
        {isOverlay && <SearchOverlay />}
        <div
          className={
            isOverlay
              ? `${styles.grid__left__panel} ${styles.noScroll}`
              : `${styles.grid__left__panel}`
          }
        >
          <TabGroup />
        </div>
        <div className={styles.grid__right__panel}>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
