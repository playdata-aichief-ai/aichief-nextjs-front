import { axiosInstance } from '.';

import type { ApiGetClaimantsBody, ApiGetClaimantsResponse } from '@/types';

/**
 * 고객들 요청
 * @param body 고객에 포함될 단어
 * @returns 추천 고객들
 */
const apiGetClaimants = ({ email, searchWord }: ApiGetClaimantsBody) => {
  let requestUrl = `/client?email=${email}`;
  requestUrl += searchWord ? `&word=${searchWord}` : '';
  return axiosInstance.get<ApiGetClaimantsResponse>(requestUrl);
};

/**
 * 고객 관련 api 요청 객체
 */
const claimantService = {
  apiGetClaimants,
};

export default claimantService;
