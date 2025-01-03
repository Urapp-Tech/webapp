/* eslint-disable import/no-cycle */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StoreService } from '../../interfaces/serviceCategory.interface';
import service from '../../services/store-categories.service';

type InitialState = {
  categoryItems: StoreService[];
  selectedCategoryItems?: StoreService;
  ShortCategoryItems: { id: string; name: string }[];
  loading: boolean;
  notify: boolean;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  categoryItems: [],
  ShortCategoryItems: [],
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchCategoriesItems = createAsyncThunk(
  'store/fetchCategoriesItems',
  async (
    data: {
      tenant: string | undefined;
      branch: any | undefined;
      categoryId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      if (!data.tenant) {
        throw new Error('No Tenant');
      }
      const { tenant, branch } = data;
      delete data.tenant;
      delete data.branch;
      const response = await service.getCategoriesItem(tenant, branch, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const storeCategoryItemsSlice = createSlice({
  name: 'storeCategoryItemsSlice',
  initialState,
  reducers: {
    setCategoriesItem: (state, action: PayloadAction<StoreService[]>) => {
      state.categoryItems = action.payload;
    },
    setSelectedCategoriesItem: (state, action: PayloadAction<StoreService>) => {
      state.selectedCategoryItems = action.payload;
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
      .addCase(fetchCategoriesItems.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesItems.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryItems = action.payload.data.list || [];
      })
      .addCase(fetchCategoriesItems.rejected, (state, action: any) => {
        state.loading = false;
        if (action?.payload?.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.payload.error} `,
            type: 'error',
          };
        }
      });
  },
});

export const {
  setCategoriesItem,
  setNotifyState,
  showNotifyMessage,
  setSelectedCategoriesItem,
} = storeCategoryItemsSlice.actions;

export default storeCategoryItemsSlice.reducer;
