import axios from 'axios';
import { PATH } from '../apiRoutes/routeConstant';

export const createReation = (data: any) => {
  return axios.post(`${process.env.BASE_URL}${PATH.LIKE_TOGGLE}`, data);
};
