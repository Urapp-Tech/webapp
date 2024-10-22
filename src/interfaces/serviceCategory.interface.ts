export interface Category {
  id: string;
  name: string;
  description?: string;
  tenant?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: string;
  updatedDate?: string;
  avatar?: string;
  isDeleted?: boolean;
}

export interface StoreService {
  id: string;
  name: string;
  storeServiceCategory?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: string;
  updatedDate?: string;
  description?: string;
  avatar?: string;
  price?: string;
  isDeleted?: boolean;
  serviceTime: string;
}
