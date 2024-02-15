import React, { useContext } from 'react';
import styles from '@/styles/Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { listItemProps } from '@/interfaces/listItemProps';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import { UserProps } from '@/interfaces/userProps';
import { useRouter } from 'next/router';
const ListItem = (props: listItemProps) => {
  const router = useRouter();
  const store = useContext<StoreContextState>(StoreContext);
  const [user, setUser] = store.user;
  const cleanUpTokens = store.cleanUpTokens;

  const handleAction = (action: string) => {
    if (action === 'Logout') {
      cleanUpTokens();
      setUser(new UserProps());
      router.replace('/login');
    }
    if (action === 'Invite') {
      router.push('/invite');
    }
    if (action === 'Profile') {
      router.push(`/profile/${user?.id}`);
    }
    if (action === 'Role') {
      router.push(`/role`);
    }

    if (action === 'Users') {
      router.push(`/users`);
    }
    if (user?.tenantId === null && action === 'Tenants') {
      router.push(`/tenants`);
    }
  };

  return (
    <div className={styles.list__item__conatiner}>
      {props.option.icon && (
        <FontAwesomeIcon
          icon={props.option?.icon}
          width={20}
          height={20}
          className={styles.icon}
        />
      )}
      <p
        key={props.option.id}
        className={styles.list__item}
        onClick={() => handleAction(props.option.value)}
      >

        {props.option.value}
      </p>
    </div>
  );
};

export default ListItem;
