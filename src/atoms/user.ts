import { atom } from 'recoil';

/**
 * 저장된 상태 요청
 */
export const userState = atom<any>({
  key: 'userState',
  default: [],
});

/**
 * 필터링 관련 states 객체
 */
const statusService = {
  userState,
};

export default statusService;
