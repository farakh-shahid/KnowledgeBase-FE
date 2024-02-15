import { SearchType } from '@/constants/tabGroup/TabGroupTypes';
import UserAvatar from '@/containers/atoms/userAvatar/UserAvatar';
import { SearchItemProps } from '@/interfaces/searchItemProps';
import styles from '@/styles/SearchItem.module.scss';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import SearchSkelton from './SearchSkelton';
const SearchItem = ({
  id,
  title,
  user_avatar,
  type,
  loading,
}: SearchItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(type === SearchType[0] ? `/profile/${id}` : `/topic/${id}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.row}>
        <UserAvatar
          size={35}
          iconSize={30}
          avatar_url={user_avatar}
          onClick={() => {}}
        />
        <p className={styles.title}>{title}</p>
      </div>
      <FontAwesomeIcon
        icon={faUpRightFromSquare}
        className={styles.open__icon}
      />
    </div>
  );
};

export default SearchItem;
