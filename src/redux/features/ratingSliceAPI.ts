import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Branch } from '../../interfaces/branch';
import {
  GetAllRatingReviewsResponse,
  GetRatingStarListResponse,
} from '../../types/rating.types';
import { BASE_URL, getToken } from '../../utilities/constant';
import { getItem } from '../../utilities/local-storage';

export const ratingAPI = createApi({
  reducerPath: 'rating-api',
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
    getAllRatingReviews: builder.query<GetAllRatingReviewsResponse, unknown>({
      query: ({
        itemId,
        page,
        size,
      }: {
        itemId: any;
        page: any;
        size: any;
      }) => {
        const branch = getItem<Branch>('BRANCH');
        if (!branch) {
          throw new Error('branch not selected');
        }
        return {
          url: `rating/reviews/${branch.tenant}/${branch.id}/${itemId}`,
          params: { page, size },
        };
      },
    }),
    getRatingStarList: builder.query<GetRatingStarListResponse, unknown>({
      query: (homeCatId: string) => {
        const branch = getItem<Branch>('BRANCH');
        if (!branch) {
          throw new Error('branch not selected');
        }
        return `rating/distinct/star/list/${branch.tenant}/${branch.id}/${homeCatId}`;
      },
    }),
  }),
});

export const {
  useLazyGetAllRatingReviewsQuery,
  useLazyGetRatingStarListQuery,
} = ratingAPI;
