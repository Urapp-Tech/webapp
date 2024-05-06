import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import bannerService from '../../services/banner.service';
import { Banner } from '../../interfaces/banner';

type InitialState = {
  banners: Banner[];
  loading: boolean;
  notify: boolean;
  total_count: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  banners: [],
  total_count: 0,
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
        state.total_count =
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

export const { setBanners, setNotifyState, showNotifyMessage } =
  bannerSlice.actions;

export default bannerSlice.reducer;
