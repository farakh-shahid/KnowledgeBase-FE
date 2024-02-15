import {
  faBuildingLock,
  faPowerOff,
  faUser,
  faUserClock,
  faUserLock,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

export const USER_PROFILE_OPTONS = [
  { id: 1, value: 'Profile', icon: faUser },

  {
    id: 2,
    value: 'Invite',
    icon: faUserClock,
  },

  {
    id: 3,
    value: 'Role',
    icon: faUserLock,
  },

  {
    id: 4,
    value: 'Tenants',
    icon: faBuildingLock,
  },

  {
    id: 5,
    value: 'Users',
    icon: faUsers,
  },
  {
    id: 6,
    value: 'Logout',
    icon: faPowerOff,
  },
];
export const SearchOptions = [
  { id: 1, value: 'Nextjs', icon: null },
  { id: 2, value: 'Programming', icon: null },
  { id: 3, value: 'Learning', icon: null },
];
