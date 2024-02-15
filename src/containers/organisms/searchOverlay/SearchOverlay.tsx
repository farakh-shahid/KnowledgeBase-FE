import React, { useCallback, useContext, useEffect } from 'react';
import styles from '@/styles/SearchOverlay.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faTag,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import Divider from '@/containers/atoms/divider/Divider';
import SearchItem from '../searchItem/SearchItem';
import Tag from '@/containers/molecules/tag/Tag';
import InputField from '@/containers/atoms/inputField/InputField';
import { CATEGORY, getProfileAvatar, MESSAGES, TAG } from '@/constants';
import SearchSkeltonPage from '../searchSkelton/SearchSkelton';

import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchType } from '@/constants/tabGroup/TabGroupTypes';

const SearchOverlay = () => {
  const store = useContext<StoreContextState>(StoreContext);
  const [, setIsOverlay] = store.searchOverlay;
  const [searchTerm, setSearchTerm] = store.searchTerms;
  const [searchResults, setSearchResults] = store.searchResult;
  const [showAll, setShowAll] = React.useState(false);
  const [loadingSearch] = store.loadingSearch;
  const [hasMore, setHasMore] = React.useState(true);
  const [showTags, setShowTags] = React.useState(true);
  const [showCategories, setShowCategories] = React.useState(true);

  const displayedPublishers = searchResults?.publishersOfMatchedQuestion?.slice(
    0,
    showAll ? undefined : 2
  );
  const displayedPeople = searchResults?.people?.slice(
    0,
    showAll ? undefined : 3
  );

  const handleClose = () => {
    setIsOverlay(false);
  };

  const loadMorePeople = useCallback(async () => {
    try {
      const newPeople = searchResults?.people || [];
      const newPublishers = searchResults?.publishersOfMatchedQuestion || [];
      const filteredNewPeople = newPeople.filter(
        (person: { id: string }) =>
          !searchResults?.people.some((p) => p.id === person.id)
      );
      const filteredNewPublishers = newPublishers.filter(
        (publisher: { id: string }) =>
          !searchResults?.publishersOfMatchedQuestion.some(
            (p) => p.id === publisher.id
          )
      );

      setSearchResults((prevSearchResults) => ({
        ...prevSearchResults,
        people: [...prevSearchResults.people, ...filteredNewPeople],
        publishersOfMatchedQuestion: [
          ...prevSearchResults.publishersOfMatchedQuestion,
          ...filteredNewPublishers,
        ],
        hasMore:
          filteredNewPeople.length > 0 || filteredNewPublishers.length > 0,
      }));
    } catch (error) {}
  }, [searchResults, setSearchResults]);

  const result = {
    Topics: [],
    matchedTagQuestion: [],
    tags: [],
    publishersOfMatchedQuestion: [],
    people: [],
    hasMore: true,
  };

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults(result);
      setIsOverlay(false);
    }
  }, [searchTerm]);

  return (
    <>
      {loadingSearch && (
        <>
          <SearchSkeltonPage />
        </>
      )}

      {!loadingSearch &&
        searchResults &&
        Object.values(searchResults).every((arr) => arr.length === 0) && (
          <>
            <div className={styles.container}>
              <div className={styles.header}>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={handleClose}
                  className={styles.icon}
                />
              </div>
              <div className={styles.result__no}>
                <h1 className={styles.no__record}>
                  {' '}
                  No Results Matched For
                  <span className={styles.no__matching}> {searchTerm}</span>
                </h1>
              </div>
            </div>
          </>
        )}

      {!loadingSearch &&
        searchResults &&
        Object.values(searchResults).some((arr) => arr.length > 0) && (
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
                  <div className={''}>
                    <h1 className={styles.no__record}>
                      Results for
                      <span className={styles.seacrh__term}> {searchTerm}</span>
                    </h1>
                  </div>
                  <p className={styles.label}>Topics</p>
                  {searchResults?.matchedTagQuestion &&
                    searchResults?.matchedTagQuestion.map((topic) => {
                      const userName = `${topic?.author?.firstName} ${topic?.author?.lastName}`;
                      return (
                        <SearchItem
                          key={topic.id}
                          id={topic.id}
                          title={topic.title}
                          user_avatar={
                            topic?.author?.picture || getProfileAvatar(userName)
                          }
                          type={SearchType[1]}
                        />
                      );
                    })}

                  {searchResults && searchResults?.Topics.length === 0 ? (
                    <>
                      <div className={styles.no__data}>
                        <p className={styles.no__data__found}>
                          No Topics Found
                        </p>
                      </div>
                    </>
                  ) : (
                    searchResults?.Topics.map((topic) => {
                      const userName = `${topic?.author?.firstName} ${topic?.author?.lastName}`;
                      return (
                        <SearchItem
                          key={topic.id}
                          id={topic.id}
                          title={topic.title}
                          user_avatar={
                            topic?.author?.picture || getProfileAvatar(userName)
                          }
                          type={SearchType[1]}
                        />
                      );
                    })
                  )}
                </div>

                <div className={styles.search__right}>
                  <InfiniteScroll
                    dataLength={
                      searchResults.publishersOfMatchedQuestion.length
                    }
                    next={loadMorePeople}
                    hasMore={hasMore}
                    loader={''}
                    endMessage={''}
                    height={searchResults.people.length > 1 ? 250 : 150}
                  >
                    <div className={styles.see__all__button}>
                      <p className={styles.label}>Publishers</p>
                      {((searchResults?.publishersOfMatchedQuestion?.length ||
                        0) > 2 ||
                        (searchResults?.people?.length || 0) > 2) && (
                        <p
                          className={styles.see__all}
                          onClick={() => {
                            setShowAll(!showAll);
                          }}
                        >
                          {showAll ? MESSAGES.SEE_LESS : MESSAGES.SEE_ALL}
                        </p>
                      )}
                    </div>

                    <div className={styles.display__users}>
                      {displayedPublishers?.map((user) => {
                        const userName = `${user?.firstName} ${user?.lastName}`;
                        return (
                          <SearchItem
                            key={user?.id}
                            id={user?.id}
                            title={userName}
                            user_avatar={
                              user?.picture || getProfileAvatar(userName)
                            }
                            type={SearchType[0]}
                          />
                        );
                      })}

                      {displayedPeople?.map((user) => {
                        const userName = `${user?.firstName} ${user?.lastName}`;
                        return (
                          <SearchItem
                            key={user?.id}
                            id={user?.id}
                            title={userName}
                            user_avatar={
                              user?.picture || getProfileAvatar(userName)
                            }
                            type={SearchType[0]}
                          />
                        );
                      })}
                    </div>
                  </InfiniteScroll>

                  <Divider />
                  <div className={styles.tag}>
                    <div className={styles.tag__header}>
                      {searchResults?.tags.length > 0 && (
                        <div
                          className={styles.tags__header}
                          onClick={() => setShowCategories(!showCategories)}
                        >
                          {showCategories ? (
                            <FontAwesomeIcon icon={faCaretDown} />
                          ) : (
                            <FontAwesomeIcon icon={faCaretUp} />
                          )}
                        </div>
                      )}
                    </div>
                    <p className={styles.label}>Categories</p>
                  </div>
                  <div className={styles.categories__container}>
                    {searchResults?.tags.length === 0 ? (
                      <>
                        <p className={styles.no__publisher}>
                          No Categories Matched
                        </p>
                      </>
                    ) : (
                      <>
                        {showCategories && (
                          <div className={styles.tags__list}>
                            {searchResults?.tags
                              .filter((tag) => tag.type === CATEGORY)
                              .map((tag) => (
                                <Tag
                                  title={tag.title}
                                  icon={faTag}
                                  key={tag.id}
                                />
                              ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <Divider />
                  <div className={styles.tag}>
                    <div className={styles.tag__header}>
                      {searchResults?.tags.length > 0 && (
                        <div
                          className={styles.tags__header}
                          onClick={() => setShowTags(!showTags)}
                        >
                          {showTags ? (
                            <FontAwesomeIcon icon={faCaretDown} />
                          ) : (
                            <FontAwesomeIcon icon={faCaretUp} />
                          )}
                        </div>
                      )}
                    </div>
                    <p className={styles.label}>Tags</p>
                  </div>

                  <div className={styles.categories__container}>
                    {searchResults?.tags.length === 0 ? (
                      <>
                        <p className={styles.no__publisher}>No Tags Matched</p>
                      </>
                    ) : (
                      <>
                        {showTags && (
                          <div className={styles.tags__list}>
                            {searchResults?.tags
                              .filter((tag) => tag.type === TAG)
                              .map((tag) => (
                                <Tag
                                  title={tag.title}
                                  icon={faTag}
                                  key={tag.id}
                                />
                              ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default SearchOverlay;
