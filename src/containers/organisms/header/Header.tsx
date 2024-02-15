import React, { useContext, useRef, useState } from 'react';
import styles from '@/styles/Header.module.scss';
import Image from 'next/image';
import logo from '@/assets/icons/kb-logo.png';
import Ask from '@/containers/atoms/ask/Ask';
import UserAvatar from '@/containers/atoms/userAvatar/UserAvatar';
import Search from '@/containers/atoms/search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import PopUpMenu from '../popUp/PopUpMenu';
import { HeaderProps } from '@/interfaces/HeaderProp';
import Profile, { ProfileStyle } from '@/containers/molecules/profile/Profile';
import Title from '@/containers/atoms/title/Title';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import { getProfileAvatar } from '@/constants';
import { getFullUserName } from '@/utils';
import { useRouter } from 'next/router';

const Header = (props: HeaderProps) => {
  const router = useRouter();
  const store = useContext<StoreContextState>(StoreContext);
  const [user] = store.user;
  const SearchRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLButtonElement>(null);
  const [profileMenu, setProfileMenu] = useState<boolean>(false);
  const [isOverlay, setIsOverlay] = store.searchOverlay;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left_grid_item}>
          <div className={styles.header_left}>
            <Image src={logo} alt="Logo" width={60}></Image>
            {!props.showInputSearch && (
              <div className={styles.popUp__container}>
                <Search setSearchMenu={setIsOverlay} parentRef={SearchRef} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.right_grid_item}>
          <div className={styles.header_right}>
            <div className={styles.hamburger}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={() => {
                  setIsOverlay(true);
                }}
              />
            </div>
            {!props.showInputSearch && (
              <Link href="/ask_question" className={styles.link}>
                <Ask />
              </Link>
            )}
            {!props.showInputSearch && (
              <div className={styles.popUp__container}>
                <UserAvatar
                  size={40}
                  onClick={() => {
                    setProfileMenu(!profileMenu);
                  }}
                  iconSize={25}
                  avatar_url={
                    user?.picture ||
                    getProfileAvatar(
                      getFullUserName(
                        user?.firstName as string,
                        user?.lastName as string
                      )
                    )
                  }
                  avatar_ref={profileRef}
                />
                {profileMenu && (
                  <PopUpMenu
                    setVisible={setProfileMenu}
                    renderItem={<Profile />}
                    style={ProfileStyle}
                    parentRef={profileRef}
                  />
                )}
              </div>
            )}
            {props.showInputSearch && (
              <button disabled className={styles.button__simple}>
                Preview
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
