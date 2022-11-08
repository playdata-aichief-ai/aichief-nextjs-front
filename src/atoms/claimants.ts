import { atom, selector } from 'recoil';

export const claimantsState = atom<any[]>({
  key: 'claimantsState',
  default: [],
});

export const claimantLastIdxState = selector<number>({
  key: 'claimantsLastIdxState',
  get: ({ get }) => {
    const claimants = get(claimantsState);

    if (claimants.length === 0) return -1;

    return claimants[claimants.length - 1].idx;
  },
  set: ({ set }) => {
    set(claimantsState, []);
  },
});

const claimantsService = {
  claimantsState,
  claimantLastIdxState,
};

export default claimantsService;
