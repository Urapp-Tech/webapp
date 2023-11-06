import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryPayload } from '../../interfaces/category.interface';

type CategoryState = {
  categoryList: CategoryPayload[];
  subCategory: [];
};

const initialState: CategoryState = {
  categoryList: [],
  subCategory: [],
};

export const CategorySliceReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    category: (state, action: PayloadAction<CategoryPayload[]>) => {
      state.categoryList = action.payload;
    },
  },
});

export const { category } = CategorySliceReducer.actions;
export default CategorySliceReducer.reducer;
