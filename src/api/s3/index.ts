import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 10000,
});

import photoService from './photo';

/**
 * api요청 관련 메서드들을 가진 객체
 */
const apiService = {
  photoService,
};

export default apiService;
