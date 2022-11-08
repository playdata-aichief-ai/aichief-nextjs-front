import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  timeout: 300000,
});

import authService from './auth';
import claimService from './claim';
import claimantService from './claimants';
import contractService from './contract';
import userService from './user';

/**
 * api요청 관련 메서드들을 가진 객체
 */
const apiService = {
  userService,
  claimService,
  contractService,
  claimantService,
  authService,
};

export default apiService;
