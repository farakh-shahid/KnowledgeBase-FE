import React, { useEffect, useState } from 'react';
import styles from '@/styles/usersPage.module.scss';
import Button from '@/containers/atoms/button/Button';
import { LABELS, MESSAGES } from '@/constants';
import { colors } from '@/assets/colors';
import { useRouter } from 'next/router';
import UserTable from '@/containers/organisms/userTable/userTable';
import Header from '@/containers/organisms/header/Header';
import { getAllUsers } from '@/services/api/userService';
import { toast } from 'react-toastify';
import { UserResponse } from '@/interfaces/usersDataProps';

const UsersPage = () => {
  const [userData, setUserData] = useState<UserResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUsers = async () => {
    try {
      const response = await getAllUsers(0);
      if (response.data) {
        setUserData(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const router = useRouter();
  return (
    <>
      <Header />
      <div className={styles.container__main}>
        <div className={styles.circle}></div>
        <div className={styles.container}>
          <div className={styles.container__heading}>
            <h3>Manage Users</h3>
          </div>
          <div className={styles.container__button}>
            <Button
              label={LABELS.INVITE_USERS}
              backgroundColor={colors.bg.Tarawera}
              color={colors.bg.white}
              width="100px"
              fontSize="1rem"
              onClick={() => {
                router.push('/invite');
              }}
            />
          </div>
        </div>
        <div className={styles.circle2}></div>
      </div>
      <div className={styles.user__table}>
        <UserTable isLoading={isLoading} userData={userData as UserResponse} />
      </div>
    </>
  );
};

export default UsersPage;
