import Header from '@/containers/organisms/header/Header';
import style from '@/styles/UserProfile.module.scss';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import logo from '@/assets/icons/man.png';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getProfileAvatar, MESSAGES } from '@/constants';
import { getUser, getUserDetailsByType } from '@/services/api/userService';
import {
  UserDetail,
  UserProfileInterface,
  BlogPost,
  Topic,
} from '@/interfaces/userProfile';
import Card from '@/containers/organisms/card/card';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/styles/tabGroup.module.scss';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import TagSkelton from '@/containers/molecules/tag/TagSkelton';
import { ButtonGroup } from '@/styles/styledComponets/ButtonGroup';
import { UserProfileTab } from '@/constants/tabGroup/TabGroupTypes';
import { Tab } from '@/styles/styledComponets/Tab';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import { colors } from '@/assets/colors';
import Divider from '@/containers/atoms/divider/Divider';
import { getFullUserName } from '@/utils';

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const store = React.useContext<StoreContextState>(StoreContext);
  const [user, setUser] = store.user;
  const [userInfo, setUserInfo] = useState<UserProfileInterface>();
  const [userDetailsByType, setUserDetailsByType] = useState<UserDetail>();
  const [dataList, setDataList] = useState<Topic[] | BlogPost[]>([]);
  const [active, setActive] = useState(UserProfileTab[0]);
  const [check, setCheck] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const userName = `${userInfo?.firstName} ${userInfo?.lastName}`;

  const getUserInfo = async () => {
    if (id) {
      try {
        const res = await getUser(id as string);
        setUserInfo(res.data);
      } catch (error) {
        toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getUserInfo();
    }
  }, [id]);

  const getUserInfoByType = async () => {
    try {
      const res = await getUserDetailsByType(id as string, active, 0);
      setUserDetailsByType(res.data);
      setLoading(false);
      if (res.data.count > 5) {
        setCheck(false);
        setHasMore(true);
      }
    } catch (error) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };

  const setData = () => {
    if (active === UserProfileTab[1]) {
      setDataList(userDetailsByType?.data?.topic as Topic[]);
    } else if (active === UserProfileTab[2]) {
      setDataList(userDetailsByType?.data?.Content as BlogPost[]);
    }
  };

  useEffect(() => {
    if (userDetailsByType) {
      setData();
    }
  }, [active, userDetailsByType]);

  useEffect(() => {
    setHasMore(false);
    if (id) {
      active === UserProfileTab[1] || active === UserProfileTab[2]
        ? getUserInfoByType()
        : getUserInfo();
    }
  }, [id, active]);

  const loadMoreData = useCallback(async () => {
    if (
      userDetailsByType &&
      dataList &&
      dataList?.length >= userDetailsByType?.count
    ) {
      setHasMore(false);
      return;
    }

    const res = await getUserDetailsByType(
      user?.id as string,
      active,
      dataList?.length
    );
    if (res.data) {
      if (active === UserProfileTab[1] && res.data.data?.topic) {
        setDataList((topics) => [...topics, ...res.data.data?.topic]);
        if (res.data.data.topic?.length < dataList?.length) {
          setHasMore(false);
          setCheck(false);
        }
      } else if (active === UserProfileTab[2] && res.data.data?.Content) {
        setDataList((content) => [...content, ...res.data.data?.Content]);
        if (res.data.data.Content?.length < dataList?.length) {
          setHasMore(false);
          setCheck(false);
        }
      }
    } else {
      setHasMore(false);
      setCheck(false);
    }
  }, [active, user?.id, dataList?.length]);

  return (
    <>
      <Header />

      <div className={style.main}>
        <ButtonGroup>
          {UserProfileTab.map((type) => (
            <Tab
              key={type}
              active={active === type}
              onClick={() => {
                setActive(type);
                type !== active ? setLoading(true) : setLoading(false);
              }}
            >
              {type}
            </Tab>
          ))}
        </ButtonGroup>

        {active === UserProfileTab[0] && (
          <>
            <div className={style.parent}>
              <div className={style.child}>
                {userInfo?.id === user?.id && (
                  <span onClick={() => router.push(`edit_profile/${user?.id}`)}>
                    <FontAwesomeIcon icon={faEdit} className={style.icon} />
                  </span>
                )}
              </div>
              <div className={style.rectangle}>
                <div>
                  <div className={style.user__details}>
                    <div className={style.profile__picture}>
                      <Image
                        src={
                          userInfo?.picture ||
                          getProfileAvatar(
                            getFullUserName(
                              userInfo?.firstName as string,
                              userInfo?.lastName as string
                            )
                          )
                        }
                        alt="G"
                        width={100}
                        height={100}
                        className={style.picture}
                      />
                    </div>
                    <div>
                      {userInfo?.firstName ? (
                        <h1 className={style.username}>{userName}</h1>
                      ) : (
                        <TagSkelton />
                      )}
                      <p className={style.slogan}>{'Collaborator & Editor'}</p>
                    </div>
                  </div>
                </div>
                <div className={style.bio}>
                  <p>
                    Hello! My name is {userName} working from Chile. I create
                    some
                    <br />
                    &#13;&#10; Ghost and Wordpress themes for differents
                    markets, also, i offer <br /> live support via our ticket
                    system.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {active !== UserProfileTab[0] && (
          <>
            <ThreeDots
              radius="9"
              color={colors.bg.Java}
              ariaLabel="three-dots-loading"
              wrapperClass={styles.loader}
              visible={loading}
            />
            <InfiniteScroll
              dataLength={dataList?.length}
              next={loadMoreData}
              hasMore={hasMore}
              height={840}
              loader={
                <TailSpin
                  wrapperClass={styles.loader}
                  width={40}
                  height={40}
                  color={colors.bg.Java}
                  visible={check}
                />
              }
              endMessage={
                userDetailsByType &&
                dataList?.length <= userDetailsByType?.count && (
                  <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                )
              }
            >
              <div className={style.card}>
                {dataList?.map((topic) => (
                  <>
                    <Divider />
                    <Card {...topic} key={topic.id} type={active} />
                  </>
                ))}
              </div>
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
