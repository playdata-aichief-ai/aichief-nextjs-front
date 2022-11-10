import { atom } from 'recoil';

/**
 * 저장된 상태 요청
 */
export const statusState = atom<any>({
  key: 'statusState',
  default: [],
});

/**
 * 로그인 states 객체
 */
const statusService = {
  statusState,
};

export default statusService;
