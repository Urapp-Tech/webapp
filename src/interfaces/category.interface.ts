export interface CategoryPayload {
  id: string | undefined;
  name: string;
  desc: string | null;
  icon: string;
  banner: string | undefined;
  createdBy: string;
  updatedBy: string;
  createdDate: string | null;
  updatedDate: string | null;
  tenant: string;
}
