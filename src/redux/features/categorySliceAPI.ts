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
      query: () => `/api/v1/app/homemenu/list/${getTenantId()}`,
    }),
    getSubCategory: builder.query({
      query: ({ menuId }: { menuId: string }) =>
        `api/v1/app/homemenu/view/${getTenantId()}/${menuId}`
    }),
    getSubCategoryItem: builder.query({
      query: ({ itemId, menuId }: { menuId: string, itemId: string }) => `/api/v1/app/homemenu/view/submenu/${getTenantId()}/${menuId}/${itemId}`
    }),
  }),
});

export const { useGetAllCategoryQuery, useLazyGetSubCategoryQuery, useGetSubCategoryQuery,useLazyGetSubCategoryItemQuery } =
  categoryAPI;
