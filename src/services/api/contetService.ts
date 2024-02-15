import { ContentDto } from '@/interfaces/contentDto';
import { createUrl } from '@/utils/functions';
import axios from 'axios';
import { PATH } from '../apiRoutes/routeConstant';

export const getContents = () => {
  return axios.get(`${process.env.BASE_URL}${PATH.CONTENTS}`);
};
export const getContent = (id: string) => {
  return axios.get(createUrl(PATH.CONTENTS, [id]));
};
export const createContent = (content: ContentDto) => {
  return axios.post(`${process.env.BASE_URL}${PATH.CONTENTS}/create`, content);
};
export const updateContent = (content: any, id: string) => {
  return axios.put(createUrl(PATH.CONTENTS, [id]), content);
};
