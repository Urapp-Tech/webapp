export interface GetAllProductCategoriesResponse {
  success: boolean;
  code: number;
  message: string;
  data: Array<ProductCategory>;
}

export interface ProductCategory {
  id: string;
  name: string;
  desc: string;
  icon?: string;
  banner?: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  tenant: string;
  isActive: boolean;
  isDeleted: boolean;
  branch: string;
}

export interface GetAllCategoryItemsResponse {
  success: boolean;
  code: number;
  message: string;
  data: Category;
}

export interface Category {
  id: string;
  name: string;
  desc: string;
  icon?: string;
  banner?: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  tenant: string;
  isActive: boolean;
  isDeleted: boolean;
  branch: string;
  homeCatItems: Array<Item> | null;
}

export interface Item {
  id: string;
  name: string;
  icon: string;
  banner: string;
  desc: string;
  price: number;
  isActive: boolean;
  homeCategory: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  quantity: number;
  isDeleted: boolean;
  loyaltyCoins: number;
  branch: string;
  tenant: string;
}

export interface GetItemFaqsResponse {
  success: boolean;
  code: number;
  message: string;
  data: ItemFaqsData;
}

export interface ItemFaqsData {
  id: string;
  name: string;
  icon: string;
  banner: string;
  desc: string;
  price: string;
  isActive: boolean;
  homeCategory: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  quantity: number;
  isDeleted: boolean;
  loyaltyCoins: string;
  branch: string;
  tenant: string;
  homeCatItemFaq: Array<ItemFaq>;
}

export interface ItemFaq {
  id: string;
  homeCategoryItem: string;
  question: string;
  answer: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  isDeleted: boolean;
  createdDate: string;
  branch: string;
  tenant: string;
  updatedDate: string;
}
