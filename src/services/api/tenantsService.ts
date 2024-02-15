import {
  SearchParams,
  TenantInterface,
  UpdateTennat,
} from '@/interfaces/tenantsTableData';
import { serializeSearchParams } from '@/utils';
import axios from 'axios';
import { PATH } from '../apiRoutes/routeConstant';

export const getTenants = (page: number) => {
  return axios.get(`${process.env.BASE_URL}${PATH.TENANTS}/page/${page}`);
};

export const searchTenant = async (
  searchQueries: SearchParams,
  page: number
) => {
  const searchParams = serializeSearchParams(searchQueries);
  const url = `${process.env.BASE_URL}${PATH.TENANT_SEARCH}${searchParams}&page=${page}`;
  return await axios.get(url);
};

export const getTenantById = (id: string) => {
  return axios.get(`${process.env.BASE_URL}${PATH.TENANTS}/${id}`);
};

export const updateTenant = (id: string, data: UpdateTennat) => {
  return axios.put(`${process.env.BASE_URL}${PATH.TENANTS}/${id}`, data);
};

export const createTenant = (data: TenantInterface) => {
  return axios.post(`${process.env.BASE_URL}${PATH.TENANT_CREATE}`, data);
};

export const deleteTenantById = (id: string) => {
  return axios.delete(`${process.env.BASE_URL}${PATH.TENANTS}/${id}`);
};
