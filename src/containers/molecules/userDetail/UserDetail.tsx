import DateTime from '@/containers/atoms/date/Date';
import UserName from '@/containers/atoms/userName/UserName';
import React from 'react';
import styles from '@/styles/UserDetails.module.scss';
import UserAvatar from '@/containers/atoms/userAvatar/UserAvatar';
import { UserDetailProps } from '@/interfaces/userDetailProps';
import { useRouter } from 'next/router';
import { capitalizeName } from '@/utils/functions';

const UserDetail = (props: UserDetailProps) => {
  const userFullName =
    capitalizeName((props.user_name as string)?.split(' ')[0] || '') +
    ' ' +
    capitalizeName((props.user_name as string)?.split(' ')[1] || '');
  const { id } = props;
  const router = useRouter();
  return (
    <div
      className={styles.user__detail}
      onClick={() => {
        router.push(`/profile/${id}`);
      }}
    >
      <UserAvatar
        size={20}
        onClick={() => {}}
        iconSize={14}
        avatar_url={props.asker_avatar}
      />
      <UserName user_name={userFullName ?? ''} isSeprator={props.isSeprator} />
      {props.time_published ? <DateTime label={props.time_published} /> : null}
    </div>
  );
};

export default UserDetail;
