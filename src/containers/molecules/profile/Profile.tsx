import { MESSAGES } from '@/constants';
import { USER_PROFILE_OPTONS } from '@/constants/menuOptions/MenuOptions';
import ListItem from '@/containers/atoms/listItem/ListItem';
import { StoreContextState, StoreContext } from '@/contextStore/storeProvider';
import React, { useContext } from 'react';
export const ProfileStyle: React.CSSProperties = {
  width: 'fit-content',
  marginRight: '80px',
};
const Profile = () => {
  const store = useContext<StoreContextState>(StoreContext);
  const [user, setUser] = store.user;

  const menuOptions = USER_PROFILE_OPTONS.filter((option) => {
    if (option.value === MESSAGES.TENANTS && user?.tenantId === null) {
      return true;
    }
    if (option.value === MESSAGES.TENANTS && user?.tenantId !== null) {
      return false;
    }
    return true;
  });

  return (
    <div>
      {menuOptions.map((value, index) => {
        return <ListItem option={value} key={index} />;
      })}
    </div>
  );
};

export default Profile;
