import { createUrl } from '@/utils/functions';
import axios from 'axios';
import { PATH } from '../apiRoutes/routeConstant';

export const getLabels = () => {
  return axios.get(`${process.env.BASE_URL}${PATH.LABELS}`);
};
export const getLabel = (id: string) => {
  return axios.get(createUrl(PATH.LABELS, [id]));
};
export const createLabel = (label: { title: string; type: string }) => {
  return axios.post(`${process.env.BASE_URL}${PATH.LABELS}/create`, label);
};
