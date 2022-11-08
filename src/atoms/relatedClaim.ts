import { atom, selector } from 'recoil';

/**
 * 현재 청구와 연관된 청구들
 */
export const relatedClaimsState = atom<any[]>({
  key: 'relatedClaimsState',
  default: [],
});

/**
 * 현재 청구과 연관된 상품들의 마지막 청구의 식별자
 */
export const relatedClaimsLastIdxState = selector<number>({
  key: 'relatedClaimsLastIdxState',
  get: ({ get }) => {
    const claims = get(relatedClaimsState);

    if (claims.length === 0) return -1;

    return claims[claims.length - 1].idx;
  },
  set: ({ set }) => {
    set(relatedClaimsState, []);
  },
});

/**
 * 현재 랜더링할 상품 관련 states 객체
 */
const relatedClaimService = {
  relatedClaimsState,
  relatedClaimsLastIdxState,
};

export default relatedClaimService;
