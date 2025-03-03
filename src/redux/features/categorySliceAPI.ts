/* eslint-disable import/no-cycle */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  GetAllCategoryItemsResponse,
  GetAllProductCategoriesResponse,
  GetCategoryItemDetailsResponse,
} from '../../interfaces/product';
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
    getAllCategory: builder.query<GetAllProductCategoriesResponse, any>({
      query: () => `homemenu/list/${getTenantId()}`,
    }),
    getSubCategory: builder.query<GetAllCategoryItemsResponse, any>({
      query: ({ branch, menuId }: { branch: string; menuId: string }) =>
        `homemenu/view/${getTenantId()}/${branch}/${menuId}`,
    }),
    getSubCategoryItem: builder.query<GetCategoryItemDetailsResponse, any>({
      query: ({
        branch,
        menuId,
        itemId,
      }: {
        branch: string;
        menuId: string;
        itemId: string;
      }) =>
        `homemenu/view/submenu/${getTenantId()}/${branch}/${menuId}/${itemId}`,
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useLazyGetSubCategoryQuery,
  useGetSubCategoryQuery,
  useLazyGetSubCategoryItemQuery,
} = categoryAPI;
