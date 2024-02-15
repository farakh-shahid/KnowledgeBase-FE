import Header from '@/containers/organisms/header/Header';
import style from '@/styles/UserEdit.module.scss';
import UserProfile from '@/containers/molecules/userProfile';
import React from 'react';
import Button from '@/containers/atoms/button/Button';
import { colors } from '@/assets/colors';

const UserProfilePage = () => {
  return (
    <>
      <Header />
      <div className={style.background}>
        <div className={style.container}>
          <UserProfile />
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
