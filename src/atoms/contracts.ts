import { atom, selector } from 'recoil';

export const contractsState = atom<any[]>({
  key: 'contractsState',
  default: [],
});

export const contractLastIdxState = selector<number>({
  key: 'contractLastIdxState',
  get: ({ get }) => {
    const contracts = get(contractsState);

    if (contracts.length === 0) return -1;

    return contracts[contracts.length - 1].idx;
  },
  set: ({ set }) => {
    set(contractsState, []);
  },
});

const contractsService = {
  contractsState,
  contractLastIdxState,
};

export default contractsService;
