/* eslint-disable import/no-cycle */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Banner } from '../../interfaces/banner';
import bannerService from '../../services/banner.service';

type InitialState = {
  banners: Banner[];
  singleBanner?: Banner;
  loading: boolean;
  notify: boolean;
  totalCount: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  banners: [],
  totalCount: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bannerService.getBannerList();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const bannerSlice = createSlice({
  name: 'bannerSlice',
  initialState,
  reducers: {
    setBanners: (state, action: PayloadAction<Banner[]>) => {
      state.banners = action.payload;
    },
    setSingleBanners: (state, action: PayloadAction<Banner>) => {
      state.singleBanner = action.payload;
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
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload?.data || [];
        state.totalCount =
          action.payload?.data?.totalCount || action.payload?.data?.length || 0;
      })
      .addCase(fetchBanners.rejected, (state, action: any) => {
        state.loading = false;
        if (action.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.error.message}`,
            type: 'error',
          };
          state.notify = true;
        }
      });
  },
});

export const {
  setBanners,
  setNotifyState,
  showNotifyMessage,
  setSingleBanners,
} = bannerSlice.actions;

export default bannerSlice.reducer;
