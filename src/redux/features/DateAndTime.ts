import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
  DropOff: string | null;
  PickUp: string | null;
}

const initialState: DateState = {
  DropOff: null,
  PickUp: null,
};

export const DateSliceReducer = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setPickup: (state: DateState, action: PayloadAction<string | null>) => {
      state.PickUp = action.payload;
    },
    setDropOff: (state: DateState, action: PayloadAction<string | null>) => {
      state.DropOff = action.payload;
    },
  },
});

export const { setPickup, setDropOff } = DateSliceReducer.actions;
export default DateSliceReducer.reducer;
