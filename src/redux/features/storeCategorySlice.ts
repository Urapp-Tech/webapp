/* eslint-disable import/no-cycle */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category } from '../../interfaces/serviceCategory.interface';
import service from '../../services/store-categories.service';

type InitialState = {
  categories: Category[];
  short_categories: { id: string; name: string }[];
  selectedCategory?: Category;
  loading: boolean;
  notify: boolean;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  categories: [],
  short_categories: [],
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchCategories = createAsyncThunk(
  'store/fetchCategories',
  async (tenant: string | undefined, { rejectWithValue }) => {
    try {
      const response = await service.getCategories(tenant);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(JSON.stringify(error));
    }
  }
);

export const storeCategorySlice = createSlice({
  name: 'serviceCategorySlice',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },
    setShortCategories: (
      state,
      action: PayloadAction<{ id: string; name: string }[]>
    ) => {
      state.short_categories = action.payload;
    },
    setNotifyState: (state, action: PayloadAction<boolean>) => {
      state.notify = action.payload;
    },
    showNotifyMessage: (state, action: PayloadAction<any>) => {
      state.notifyMessage = action.payload;
      state.notify = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data.list;
      })
      .addCase(fetchCategories.rejected, (state, action: any) => {
        state.loading = false;
        state.categories = [];
        action = JSON.parse(action.payload);
        if (action?.payload?.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.payload.error.message} `,
            type: 'error',
          };
        }
      });
  },
});

export const {
  setCategories,
  setNotifyState,
  showNotifyMessage,
  setSelectedCategory,
} = storeCategorySlice.actions;

export default storeCategorySlice.reducer;
