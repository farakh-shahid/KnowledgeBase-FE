import { SearchParams } from '@/interfaces/tenantsTableData';
import { serializeSearchParams } from '@/utils';
import axios from 'axios';
import { PATH } from '../apiRoutes/routeConstant';

export const createRole = (data: any) => {
  return axios.post(`${process.env.BASE_URL}${PATH.CREATE_ROLE}`, data);
};

export const deleteRoleById = (id: string) => {
  return axios.delete(`${process.env.BASE_URL}${PATH.ROLES}/${id}`);
};

export const updateRole = (id: string, data: any) => {
  return axios.put(`${process.env.BASE_URL}${PATH.ROLES}/${id}`, data);
};

export const getRolesByPagination = (page: any) => {
  return axios.get(`${process.env.BASE_URL}${PATH.ROLES_WITH_PAGINATION}/${page}`);
};

export const getAllRoles = () => {
  return axios.get(`${process.env.BASE_URL}${PATH.LIST_ALL_ROLES}`);
};

export const filterAllRoles = async (
  searchQueries: SearchParams,
  page: number
) => {
  const searchParams = serializeSearchParams(searchQueries);
  const url = `${process.env.BASE_URL}${PATH.FILTER_ROLE}${searchParams}&page=${page}`;
  return await axios.get(url);
};
