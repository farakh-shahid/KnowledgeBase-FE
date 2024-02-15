import { QuestionDto } from '@/interfaces/QuestionDto';
import { QuestionProps } from '@/interfaces/questionProps';
import { createUrl } from '@/utils/functions';
import axios from 'axios';
import { PATH } from '../apiRoutes/routeConstant';

export const getTopicsByType = (type: string, page: number) => {
  return axios.get(`${process.env.BASE_URL}${PATH.TOPICS}/${type}/${page}`);
};

export const getTopics = () => {
  return axios.get(`${process.env.BASE_URL}${PATH.TOPICS}`);
};

export const getTopic = (id: string) => {
  return axios.get(createUrl(PATH.TOPICS, [id]));
};

export const createTopic = (topic: QuestionDto) => {
  return axios.post(`${process.env.BASE_URL}${PATH.TOPICS}/create`, topic);
};

export const updateTopic = (topic: any, id: string) => {
  return axios.put(createUrl(PATH.TOPICS, [id]), topic);
};

export const updateAsked = (id: string) => {
  return axios.put(createUrl(PATH.TOPICS, [PATH.ASKED, id]));
};

export const search = (keyword: string) => {
  return axios.get(`${process.env.BASE_URL}${PATH.SEARCH}${keyword}`);
};

export const getTopicById = async (id: string) => {
  return await axios.get(`${process.env.BASE_URL}${PATH.TOPICS}/${id}`);
};
export const getHotTopics = () => {
  return axios.get(`${process.env.BASE_URL}${PATH.TOPICS}/hot`);
};
export const getLinked = (id: string) => {
  return axios.get(`${process.env.BASE_URL}${PATH.TOPICS}/linked/${id}`);
};
