import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryPayload } from '../../types/category.types';

type CategoryState = {
  categoryList: Array<CategoryPayload>;
  subCategory: Array<any>;
};

const initialState: CategoryState = {
  categoryList: [],
  subCategory: [],
};

export const CategorySliceReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    category: (state, action: PayloadAction<Array<CategoryPayload>>) => {
      state.categoryList = action.payload;
    },
  },
});

export const { category } = CategorySliceReducer.actions;
export default CategorySliceReducer.reducer;
