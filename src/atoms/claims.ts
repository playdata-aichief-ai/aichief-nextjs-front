import { atom, selector } from 'recoil';

export const claimsState = atom<any[]>({
  key: 'claimsState',
  default: [],
});

export const claimLastIdxState = selector<number>({
  key: 'claimLastIdxState',
  get: ({ get }) => {
    const claims = get(claimsState);

    if (claims.length === 0) return -1;

    return claims[claims.length - 1].idx;
  },
  set: ({ set }) => {
    set(claimsState, []);
  },
});

const claimsService = {
  claimsState,
  claimLastIdxState,
};

export default claimsService;
