import { axiosInstance } from '.';

// type
import type { ApiGetContractsBody, ApiGetContractsResponse } from '@/types';

/**
 * 계약들 요청
 * @param 요청 개수(limit)와 마지막 계약 식별자(lastIdx), 선택한 카테고리와 선택한 필터링
 * @returns
 */
const apiGetContracts = ({ email }: ApiGetContractsBody) => {
  const requestUrl = `/contract?email=${email}`;
  return axiosInstance.get<ApiGetContractsResponse>(requestUrl);
};

/**
 * 계약 관련 api 요청 객체
 */
const claimService = {
  apiGetContracts,
};

export default claimService;
