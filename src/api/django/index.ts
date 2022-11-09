import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DJANGO_URL,
  withCredentials: false,
  timeout: 10000,
});

import notificationService from './notification';

/**
 * api요청 관련 메서드들을 가진 객체
 */
const apiService = {
  notificationService,
};

export default apiService;
