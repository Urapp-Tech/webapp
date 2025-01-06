export type GetNotificationListResponse = {
  success: boolean;
  code: number;
  message: string;
  data: Array<Notification>;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdDate: string;
  updatedDate: string;
  action: null;
  tenant: string;
  createdBy: string;
  updatedBy: string;
  notificationType: string;
  branches: string[];
};
