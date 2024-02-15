import { TokenProps } from '@/interfaces/authProps';
import { FormData } from '@/interfaces/inputFieldProps';
import { SearchQueries } from '@/interfaces/tenantsTableData';
import { serializeSearchParams } from '@/utils';
import axios, { AxiosResponse } from 'axios';
import { PATH } from '../apiRoutes/routeConstant';

export const userLogin: any = async (email: string, password: string) => {
  const res = await axios.post(`${process.env.BASE_URL}${PATH.LOGIN}`, {
    email,
    password,
  });

  return res;
};

export const userSignUp = async (userId: string, formData: FormData) => {
  const { confirmPassword, email, ...data } = formData;
  return await axios.put(
    `${process.env.BASE_URL}${PATH.GET_USER_BY_ID}?email=${userId}`,
    data
  );
};

export const googleSignin = async (code: any) => {
  const res = await axios.post(
    `${process.env.BASE_URL}${PATH.SIGN_IN_WITH_GOOGLE}`,
    code
  );
  if (res.data.id_token) {
    return res;
  }
};

export const refreshTokens = async (
  accessToken: string,
  refreshToken: string
) => {
  const res = await axios.post(`${process.env.BASE_URL}${PATH.REFRESH_TOKEN}`, {
    accessToken,
    refreshToken,
  });
  return res.data;
};

export const getUser = async (id: string) => {
  return await axios.get(`${process.env.BASE_URL}${PATH.GET_USER_BY_ID}/${id}`);
};

export const checkUser = async (email: string) => {
  return await axios.get(
    `${process.env.BASE_URL}${PATH.GET_USER_BY_ID}/${email}`
  );
};

export const updateUser = async (id: string, formData: FormData) => {
  const { firstName, lastName, email, picture } = formData;
  const newData = { firstName, lastName, email, picture };
  return await axios.put(
    `${process.env.BASE_URL}${PATH.USER_UPDATE}${id}`,
    newData
  );
};

export const getUserDetailsByType = async (
  id: string,
  type: string,
  pageNumber: number
) => {
  return await axios.get(
    `${process.env.BASE_URL}${PATH.USER_PATH}/${id}/${type}/${pageNumber}`
  );
};

export const getAllUsers = async (page: number) => {
  return await axios.get(`${process.env.BASE_URL}${PATH.USER_PATH}/${page}`);
};

export const deleteUserById = async (id: string) => {
  return await axios.get(`${process.env.BASE_URL}${PATH.USER_PATH}/${id}`);
};

export const filterUser = async (
  searchQueries: SearchQueries,
  page: number
) => {
  const searchParams = serializeSearchParams(searchQueries);
  const url = `${process.env.BASE_URL}${PATH.USER_SEARCH}${searchParams}&page=${page}`;
  return await axios.get(url);
};
