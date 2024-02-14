import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

const ratingReviews = (homeCatItemId: string, page: string, size: string) => {
    return network.get(API_PATHS.ratingReviews(homeCatItemId, page, size), {
        headers: getHeaders(),
    });
};

const ratingReviewStarList = (homeCatItemId: string) => {
    return network.get(API_PATHS.ratingReviewStarList(homeCatItemId), {
        headers: getHeaders(),
    });
};

export default {
    ratingReviewStarList,
    ratingReviews
};