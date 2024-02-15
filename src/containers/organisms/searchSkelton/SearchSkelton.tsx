import React, { useContext, useEffect } from 'react';
import styles from '@/styles/SearchOverlay.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import Divider from '@/containers/atoms/divider/Divider';
import SearchSkelton from '../searchItem/SearchSkelton';
import InputField from '@/containers/atoms/inputField/InputField';
import TagSkelton from '@/containers/molecules/tag/TagSkelton';

const SearchSkeltonPage = () => {
  const store = useContext<StoreContextState>(StoreContext);

  const [, setIsOverlay] = store.searchOverlay;
  const [searchTerm] = store.searchTerms;

  const handleClose = () => {
    setIsOverlay(false);
  };

  return (
    <>
      <>
        <div className={styles.container}>
          <div className={styles.header}>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={handleClose}
              className={styles.icon}
            />
          </div>
          <div className={styles.searchBody}>
            <div className={styles.search__left}>
              <div className={styles.search}>
                <InputField placeholder="Type to search" type="text" />
              </div>
              <p className={styles.label}>Topics</p>
              {searchTerm.length !== 0 && (
                <>
                  <SearchSkelton />
                  <SearchSkelton />
                </>
              )}
            </div>
            <div className={styles.search__right}>
              <p className={styles.label}>Publishers</p>
              <div>
                {searchTerm.length !== 0 && (
                  <>
                    <SearchSkelton />
                    <SearchSkelton />
                  </>
                )}
              </div>
              <Divider />
              <p className={styles.label}>Categories</p>
              <div className={styles.categories__container}>
                {searchTerm.length !== 0 && (
                  <>
                    <TagSkelton />
                    <TagSkelton />
                  </>
                )}
              </div>
              <Divider />
              <p className={styles.label}>Tags</p>
              <div className={styles.categories__container}>
                {searchTerm.length !== 0 && (
                  <>
                    <TagSkelton />
                    <TagSkelton />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default SearchSkeltonPage;
