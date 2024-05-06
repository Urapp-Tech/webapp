export interface Banner {
  id: string;
  name: string;
  tenant: string;
  createdBy: string;
  updatedBy: string;
  createdDate: Date;
  updatedDate: Date;
  isActive: boolean;
  isDeleted: boolean;
  banner: string;
  shortDesc: string;
  link: string;
  bannerType: string;
  pageDetail: string;
  appType: string;
}
