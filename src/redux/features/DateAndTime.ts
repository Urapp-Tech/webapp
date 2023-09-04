import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';

interface DateState {
  DropOff: Dayjs | null;
  PickUp: Dayjs | null;
}

const initialState: DateState = {
  DropOff: null,
  PickUp: null,
};

export const DateSliceReducer = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setPickup: (state: DateState, action: PayloadAction<Dayjs | null>) => {
      state.PickUp = action.payload;
    },
    setDropOff: (state: DateState, action: PayloadAction<Dayjs | null>) => {
      state.DropOff = action.payload;
    },
  },
});

export const { setPickup, setDropOff } = DateSliceReducer.actions;
export default DateSliceReducer.reducer;
