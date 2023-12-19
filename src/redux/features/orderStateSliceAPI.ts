import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
    addOrder: builder.query({ query: () => `appOrder/newPayFastOrder` }),
    orderList: builder.query({
      query: (queryArguments) => {
        const { search = 0, limit = 0, offset = 0 } = queryArguments;
        return {
          url: `appOrder/webapp/list`,
          params: { limit, offset, search },
        };
      },
    }),
    orderDetail: builder.query({
      query: (id: string) => `appOrder/webapp/detail/${id}`,
    }),
  }),
});

export const { useLazyOrderListQuery } = orderAPI;
