export type GetVouchersResponse = {
  success: boolean;
  code: number;
  message: string;
  data: Array<Voucher>;
};

export type Voucher = {
  id: string;
  discountType: string;
  validFrom: string;
  validTill: string;
  value: string;
  minProduct: string;
  minAmount: string;
  redeemCount: number;
  maxRedeem: number;
  type: string;
  voucherCode: string;
  tenant: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  isActive: boolean;
  isDeleted: boolean;
  status: string;
  updatedBy: null;
  isUnlimitedRedeem: boolean;
  maxUserRedeem: number;
  branch: string;
  isAllBranches: boolean;
};
