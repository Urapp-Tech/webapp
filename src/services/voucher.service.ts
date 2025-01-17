import { GetVouchersResponse } from '../types/voucher.types';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

const getVouchers = () => {
  return network.get<GetVouchersResponse>(API_PATHS.getVouchers(), {
    headers: getHeaders(),
  });
};

export default {
  getVouchers,
};
