import axios from "axios";

import {ApiConfig, ErrorStatusCode} from "./helpers/const";

export const createAPI = () => {
  const api = axios.create({
    baseURL: ApiConfig.URL,
    timeout: ApiConfig.TIMEOUT,
    withCredentials: ApiConfig.COOKIES,
  });

  const onSuccess = (response) => response;

  const onError = (error) => {
    const {response} = error;

    if (response.status === ErrorStatusCode.UNAUTHORIZED) {
      // обрабатываем неавторизованного пользователя

      throw error;
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
