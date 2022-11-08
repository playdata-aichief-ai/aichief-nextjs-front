import { axiosInstance } from '.';

// type
import type {
  ApiLogInBody,
  ApiLogInResponse,
  ApiSignUpBody,
  ApiSignUpResponse,
} from '@/types';

/**
 * 회원가입 요청
 * @param body 회원가입에 필요한 데이터들 ( id, password, name, email )
 * @returns 결과 메시지 ( message )
 */
const apiSignUp = (body: ApiSignUpBody) =>
  axiosInstance.post<ApiSignUpResponse>(`/signup`, body);

/**
 * 로그인 요청
 * @param body 로그인에 필요한 데이터들 ( id, password )
 * @returns 결과 메시지 ( message )
 */
const apiLogIn = (body: ApiLogInBody) =>
  axiosInstance.post<ApiLogInResponse>(`/login`, body);

/**
 * 인증 관련 api 요청 객체
 */
const authService = {
  apiSignUp,
  apiLogIn,
};

export default authService;
