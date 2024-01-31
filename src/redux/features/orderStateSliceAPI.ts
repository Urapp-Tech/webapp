import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  GetOrderListResponse,
  GetOrderReviewItemsResponse,
} from '../../types/order.types';
import { BASE_URL, getToken } from '../../utilities/constant';

export const orderAPI = createApi({
  reducerPath: 'order-api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addOrder: builder.query({
      query: () => `/api/v1/app/appOrder/newPayFastOrder`,
    }),
    orderList: builder.query<GetOrderListResponse, any>({
      query: (queryArguments) => {
        const { search = '', limit = 10, offset = 0 } = queryArguments;
        return {
          url: `/api/v1/app/appOrder/webapp/list`,
          params: { limit, offset, search },
        };
      },
    }),
    orderDetail: builder.query({
      query: (id: string) => `/api/v1/app/appOrder/webapp/detail/${id}`,
    }),
    orderReviewItems: builder.query<GetOrderReviewItemsResponse, any>({
      query: (queryArguments) => {
        const { page = 0, size = 10 } = queryArguments;
        return {
          url: `/api/v1/app/rating/list/${page}/${size}`,
        };
      },
    }),
    reviewItem: builder.mutation<GetOrderReviewItemsResponse, any>({
      query: ({ appOrderItemId, ...body }) => {
        return {
          url: `/api/v1/app/rating/insert/${appOrderItemId}`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useLazyOrderListQuery,
  useLazyOrderReviewItemsQuery,
  useReviewItemMutation,
} = orderAPI;
