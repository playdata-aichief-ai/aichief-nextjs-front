import { atom } from 'recoil';

/**
 * 저장된 상태 요청
 */
export const statusState = atom<string>({
  key: 'statusState',
  default: 'all',
});

/**
 * 필터링 관련 states 객체
 */
const statusService = {
  statusState,
};

export default statusService;
