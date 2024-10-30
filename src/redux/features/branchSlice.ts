// eslint-disable-next-line import/no-cycle
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Branch } from '../../interfaces/branch';
import { getItem, setItem } from '../../utilities/local-storage';

type InitialState = {
  branch: Branch | null | undefined;
  isBranchSelected: boolean;
  isBranchSingle: boolean;
};

const branch = getItem<Branch>('BRANCH');
const isBranchSingle = Boolean(getItem('IS_BRANCH_SINGLE'));

const initialState: InitialState = {
  branch,
  isBranchSelected: Boolean(branch),
  isBranchSingle,
};

export const branchSlice = createSlice({
  name: 'branchSlice',
  initialState,
  reducers: {
    setBranch: (state, action: PayloadAction<Branch | null | undefined>) => {
      console.log('action.payload :>> ', action.payload);
      setItem('BRANCH', action.payload);
      state.branch = action.payload;
      state.isBranchSelected = Boolean(action.payload);
    },
    setIsBranchSingle: (state, action: PayloadAction<boolean>) => {
      setItem('IS_BRANCH_SINGLE', action.payload);
      state.isBranchSingle = action.payload;
    },
  },
});

export const { setBranch, setIsBranchSingle } = branchSlice.actions;

export default branchSlice.reducer;
