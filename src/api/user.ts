import { axiosInstance } from '.';

// type
import type { ApiUpdateUserBody, ApiUpdateUserResponse } from '@/types';
import { ApiGetUserBody, ApiGetUserResponse } from '@/types/api';

/**
 * 유저 상세 정보 요청
 * @param body 이메일
 * @returns 결과 메시지 ( message )
 */
const apiGetUser = ({ email }: ApiGetUserBody) =>
  axiosInstance.get<ApiGetUserResponse>(`/info?email=${email}`);

/**
 * 유저 기본 정보 수정
 * @param body 수정할 데이터들 ( name, email, phone )
 * @returns 결과 메시지 ( message )
 */
const apiEditUser = (body: ApiUpdateUserBody) =>
  axiosInstance.put<ApiUpdateUserResponse>(`/info`, body);

/**
 * 유저 관련 api 요청 객체
 */
const userService = {
  apiGetUser,
  apiEditUser,
};

export default userService;
