import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrderList = {
  list: [];
};

const initialState: OrderList = {
  list: [],
};

const orderListSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setOrderList: (state, action: PayloadAction<[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setOrderList } = orderListSlice.actions;

export default orderListSlice.reducer;
