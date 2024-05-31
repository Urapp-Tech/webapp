import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, getTenantId, getToken } from '../../utilities/constant';

export const categoryAPI = createApi({
  reducerPath: 'category-api',
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
    getAllCategory: builder.query({
      query: () => `homemenu/list/${getTenantId()}`,
    }),
    getSubCategory: builder.query({
      query: ({ menuId }: { menuId: string }) =>
        `homemenu/view/${getTenantId()}/${menuId}`,
    }),
    getSubCategoryItem: builder.query({
      query: ({ menuId, itemId }: { menuId: string; itemId: string }) =>
        `homemenu/view/submenu/${getTenantId()}/${menuId}/${itemId}`,
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useLazyGetSubCategoryQuery,
  useGetSubCategoryQuery,
  useLazyGetSubCategoryItemQuery,
} = categoryAPI;
