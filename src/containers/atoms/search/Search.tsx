import React, { useContext, useEffect } from 'react';
import styles from '@/styles/search.module.scss';
import { colors } from '@/assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { INPUT_TYPES, MESSAGES, PLACEHOLDER } from '@/constants';
import { search } from '@/services/api/topicService';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import { toast } from 'react-toastify';

const Search = ({
  setSearchMenu,
  parentRef,
}: {
  setSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
  parentRef: React.RefObject<HTMLInputElement>;
}) => {
  const store = useContext<StoreContextState>(StoreContext);
  const [searchResults, setSearchResults] = store.searchResult;
  const [searchTerm, setSearchTerm] = store.searchTerms;
  const [loadingSearch, setLoadingSearchResult] = store.loadingSearch;
  const [setIsOverlay] = store.searchOverlay;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingSearchResult(true);
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      setSearchMenu(true);
      try {
        const res = await search(searchTerm);
        if (res.data) {
          setSearchResults(res.data);
          setLoadingSearchResult(false);
        }
      } catch (error) {
        toast(MESSAGES.ERROR_SEARCHING);
      }
    }
  };

  return (
    <div className={styles.input__wrap}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        width={20}
        color={colors.common.grey}
      />
      <input
        placeholder={PLACEHOLDER.SEARCH}
        type={INPUT_TYPES.TEXT}
        className={styles.field}
        value={searchTerm}
        onChange={(event) => handleInputChange(event)}
        onKeyDown={(event) => handleKeyPress(event)}
        data-testid="search"
        ref={parentRef}
      />
    </div>
  );
};

export default Search;
