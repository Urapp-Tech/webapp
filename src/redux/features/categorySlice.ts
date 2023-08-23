import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryPayload } from '../../interfaces/Category';

type CategoryState = {
  CategoryList: CategoryPayload[];
  subCategory: [];
};

const initialState: CategoryState = {
  CategoryList: [],
  subCategory: [],
};

export const CategorySliceReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    category: (state, action: PayloadAction<CategoryPayload[]>) => {
      state.CategoryList = action.payload;
    },
  },
});

export const { category } = CategorySliceReducer.actions;
export default CategorySliceReducer.reducer;
