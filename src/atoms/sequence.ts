import { atom } from 'recoil';

/**
 * 저장된 순서 요청
 */
export const sequenceState = atom<string>({
  key: 'sequenceState',
  default: 'all',
});

/**
 * 필터링 관련 states 객체
 */
const sequenceService = {
  sequenceState,
};

export default sequenceService;
