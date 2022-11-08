import axios from 'axios';

import { axiosInstance } from '.';

import type {
  ApiCreateClaimBody,
  ApiCreateClaimResponse,
  ApiDeleteClaimBody,
  ApiDeleteClaimResponse,
  ApiGetClaimBody,
  ApiGetClaimResponse,
  ApiGetClaimsBody,
  ApiGetClaimsByEmailBody,
  ApiGetClaimsByEmailResponse,
  ApiGetClaimsByKeywordBody,
  ApiGetClaimsByKeywordResponse,
  ApiGetClaimsResponse,
  ApiUpdateClaimBody,
} from '@/types';

/**
 * 청구 등록
 * @param body 청구에 대한 데이터들
 * @returns 생성된 청구의 식별자
 */
const apiCreateClaim = (body: ApiCreateClaimBody) =>
  axiosInstance.post<ApiCreateClaimResponse>(`/claim`, body);

/**
 * 청구들 요청
 * @param 요청 개수(limit)와 마지막 청구 식별자(lastIdx), 선택한 카테고리와 선택한 필터링
 * @returns
 */
const apiGetClaims = ({ email }: ApiGetClaimsBody) =>
  axiosInstance.get<ApiGetClaimsResponse>(`/claim?email=${email}`);

/**
 * 특정 키워드를 가진 청구들 요청
 * @param 요청 개수(limit)와 마지막 청구 식별자(lastIdx), 검색 키워드, 선택한 카테고리와 선택한 필터링
 * @returns
 */
const apiGetClaimsByKeyword = ({
  email,
  filter,
  keyword,
}: ApiGetClaimsByKeywordBody) => {
  const requestUrl = `/claims?l&filter=${filter}&keyword=${keyword}`;
  return axiosInstance.get<ApiGetClaimsByKeywordResponse>(requestUrl);
};

/**
 * 특정 키워드를 가진 청구들 요청
 * @param 요청 개수(limit)와 마지막 청구 식별자(lastIdx), 청구인 이메일로 필터링
 * @returns
 */
const apiGetClaimsByEmail = ({ email }: ApiGetClaimsByEmailBody) => {
  const requestUrl = `claim?email=${email}`;
  return axiosInstance.get<ApiGetClaimsByEmailResponse>(requestUrl);
};

/**
 * 특정 청구의 상세 정보 요청
 * @param claimIdx 특정 청구의 식별자
 * @returns 특정 청구의 상세 정보 ( 연관 이미지들, 검색 키워드들 )
 */
const apiGetClaim = ({ claimIdx }: ApiGetClaimBody) =>
  axiosInstance.get<ApiGetClaimResponse>(`/claim`);

/**
 * 청구 정보 수정
 * @param body 수정할 데이터들
 * @returns 결과 메시지 ( message )
 */
const apiEditClaim = (body: ApiUpdateClaimBody) =>
  axios
    .put('https://www.aichief.link/claim', JSON.stringify(body), {
      headers: {
        'Content-Type': `application/json`,
      },
    })
    .then((res) => {
      console.log(res);
    });

/**
 * 청구 정보 삭제
 * @param claimIdx 특정 청구의 식별자
 * @returns 결과 메시지 ( message )
 */
const apiDeleteClaim = ({ claimIdx }: ApiDeleteClaimBody) =>
  axiosInstance.delete<ApiDeleteClaimResponse>(`/claim/${claimIdx}`);

/**
 * 청구 관련 api 요청 객체
 */
const claimService = {
  apiCreateClaim,
  apiGetClaims,
  apiGetClaimsByKeyword,
  apiGetClaimsByEmail,
  apiGetClaim,
  apiEditClaim,
  apiDeleteClaim,
};

export default claimService;
