import { atom } from 'recoil';

/**
 * 저장된 모든 필터 요청
 */
export const filterState = atom<string>({
  key: 'filterState',
  default: 'all',
});

/**
 * 필터링 관련 states 객체
 */
const filterService = {
  filterState,
};

export default filterService;
