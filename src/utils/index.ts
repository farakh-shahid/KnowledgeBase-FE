import { Permissions } from '@/interfaces/rolePermissions';
import { options } from '@/constants';
import { SearchParams } from '@/interfaces/tenantsTableData';

export const parseDate = (dateString: string | undefined): string => {
  const date = new Date(dateString ?? '');
  return date.toLocaleDateString('en-Us', options);
};

export const createUrl = (type: string, args: string[]): string => {
  return `${process.env.BASE_URL}${type}/${args.join('/')}`;
};

export const checkObjectArrayAllEmpty = (permissions: Permissions) => {
  return Object.values(permissions).every(
    (permissionArray) =>
      Array.isArray(permissionArray) &&
      permissionArray.every((val: string) => val === '')
  );
};

export const getFullUserName = (firstName: string, lastName: string) => {
  const fullName = `${firstName} ${lastName}`;
  return fullName;
};
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const serializeSearchParams = (
  searchParams: SearchParams | Record<string, string | Date>
) => {
  const parts = [];
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined && value !== null && value !== '') {
      const encodedKey = encodeURIComponent(
        key === 'CreatedAt' ? 'createdAt' : key
      );
      const encodedValue = encodeURIComponent(
        value instanceof Date ? formatDate(value) : value
      );

      parts.push(`${encodedKey}=${encodedValue}`);
    }
  }
  return parts.join('&');
};

export const formatDateToShowInTable = (date: Date) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formattedDate.split('/').join('-');
};

export const colNameToUpperCase = (colName: string) => {
  const mapping: { [key: string]: string } = {
    createdAt: 'Date Created',
    createdBy: 'Created by',
    tenantName: 'Tenant Name',
  };

  return mapping[colName] || colName.charAt(0).toUpperCase() + colName.slice(1);
};
