'use client';
import { TabGroupTypes } from '@/constants/tabGroup/TabGroupTypes';
import useRefreshTokens from '@/customHooks/useToken';
import { CategoriesProps } from '@/interfaces/categoriesProps';
import { HotTopicsProps } from '@/interfaces/hotTopics';
import { QuestionProps } from '@/interfaces/questionProps';
import { SearchProps } from '@/interfaces/searchProps';
import { UserProps } from '@/interfaces/userProps';
('use client');


import React, {
  createContext,
  MutableRefObject,
  useEffect,
  useState,
} from 'react';
export interface StoreContextState {
  user: [UserProps | null, React.Dispatch<React.SetStateAction<UserProps>>];
  labels: [
    CategoriesProps[],
    React.Dispatch<React.SetStateAction<CategoriesProps[]>>
  ];
  topics: [TabData, React.Dispatch<React.SetStateAction<TabData>>];
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  activeTab: [string, React.Dispatch<React.SetStateAction<string>>];
  searchOverlay: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  accessTokenRef: MutableRefObject<string>;
  refreshTokenRef: MutableRefObject<string>;
  resetStates: Function;
  setTokens: (
    accessToken: any,
    accessTokenExpiresAt: any,
    refreshToken: any
  ) => Promise<void>;
  cleanUpTokens: Function;
  searchResult: [
    SearchProps | null,
    React.Dispatch<React.SetStateAction<SearchProps>>
  ];
  searchTerms: [string, React.Dispatch<React.SetStateAction<string>>];
  loadingSearch: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  hotTopics: [
    HotTopicsProps,
    React.Dispatch<React.SetStateAction<HotTopicsProps>>
  ];
  tenantCheck: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
const TabsData: TabData = {
  Unanswered: [],
  Answered: [],
  Bookmarked: [],
};
const InitialHotTopics: HotTopicsProps = {
  topics: [],
  tags: [],
};
const StoreContextDefault: StoreContextState = {
  user: [null, () => {}],
  labels: [[], () => {}],
  topics: [TabsData, () => {}],
  loading: [false, () => {}],
  searchOverlay: [false, () => {}],
  accessTokenRef: { current: '' },
  refreshTokenRef: { current: '' },
  resetStates: Function,
  cleanUpTokens: Function,
  setTokens: () => Promise.resolve(),
  searchResult: [null, () => {}],
  searchTerms: ['', () => {}],
  loadingSearch: [true, () => {}],
  activeTab: [TabGroupTypes[0], () => {}],
  hotTopics: [InitialHotTopics, () => {}],
  tenantCheck: [false, () => {}],
};

export const StoreContext: any =
  createContext<StoreContextState>(StoreContextDefault);
interface TabData {
  Unanswered: QuestionProps[];
  Answered: QuestionProps[];
  Bookmarked: QuestionProps[];
}

export const StoreProvider: any = ({ children }: any) => {
  const [user, setUser] = useState<UserProps | undefined>(new UserProps());
  const [labels, setLabels] = useState<CategoriesProps[]>([]);
  const [topics, setTopics] = useState<TabData>(TabsData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOverlay, setIsOverlay] = useState(false);
  const [searchResults, setSearchResults] = React.useState<SearchProps>();
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [loadingSearchResult, setLoadingSearchResult] = useState<boolean>(true);
  const [active, setActive] = useState(TabGroupTypes[0]);
  const [hotTopic, setHotTopics] = useState<HotTopicsProps>(InitialHotTopics);
  const [tenantCheck, setTenantCheck] = useState<boolean>(false);
  // @ts-ignore
  const { accessTokenRef, refreshTokenRef, setTokens, cleanUpTokens } =
    useRefreshTokens(user?.email, setUser.bind(this, undefined));

  const resetStates = () => {
    setUser(new UserProps());
    setLabels([]);
    setTopics(TabsData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!user) resetStates();
  }, [user]);

  return (
    <StoreContext.Provider
      value={{
        user: [user, setUser],
        labels: [labels, setLabels],
        topics: [topics, setTopics],
        loading: [isLoading, setIsLoading],
        searchOverlay: [isOverlay, setIsOverlay],
        activeTab: [active, setActive],
        accessTokenRef,
        refreshTokenRef,
        resetStates,
        cleanUpTokens,
        setTokens,
        searchResult: [searchResults, setSearchResults],
        searchTerms: [searchTerm, setSearchTerm],
        loadingSearch: [loadingSearchResult, setLoadingSearchResult],
        hotTopics: [hotTopic, setHotTopics],
        tenantCheck: [tenantCheck, setTenantCheck],
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
