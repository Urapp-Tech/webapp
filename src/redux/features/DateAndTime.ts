import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
  dropOff: string | null;
  pickUp: string | null;
}

const initialState: DateState = {
  dropOff: null,
  pickUp: null,
};

export const DateSliceReducer = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setPickup: (state: DateState, action: PayloadAction<string | null>) => {
      state.pickUp = action.payload;
    },
    setDropOff: (state: DateState, action: PayloadAction<string | null>) => {
      state.dropOff = action.payload;
    },
  },
});

export const { setPickup, setDropOff } = DateSliceReducer.actions;
export default DateSliceReducer.reducer;
