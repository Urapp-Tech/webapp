export type GetAllRatingReviewsResponse = {
  success: boolean;
  code: number;
  message: string;
  data: RatingReviewsData;
};

export type RatingReviewsData = {
  list: Array<RatingReview>;
  total: number;
};

export type RatingReview = {
  id: string;
  appUser: RatingReviewUser;
  appOrderItem: string;
  review: string;
  star: number;
  createdDate: string;
  status: string;
  homeCatItem: string;
  isDeleted: boolean;
  tenant: string;
  branch: string;
};

export type RatingReviewUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: null;
};

export type GetRatingStarListResponse = {
  success: boolean;
  code: number;
  message: string;
  data: RatingStarData;
};

export type RatingStarData = {
  list: Array<RatingStarList>;
  total: number;
};

export type RatingStarList = {
  star: number;
  total: number;
};
