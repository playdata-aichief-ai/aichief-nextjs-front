import { axiosInstance } from '.';

import type {
  ApiGetClaimsNotificationsBody,
  ApiGetClaimsNotificationsResponse,
} from '@/types';
import { ApiClickClaimNotificationBody } from '@/types/api';

// 청구요청 진행상황 알림 요청
const apiGetClaimsNotifications = ({ id }: ApiGetClaimsNotificationsBody) =>
  axiosInstance.get<ApiGetClaimsNotificationsResponse>(
    `/controller/get-processes/?id=${id}`
  );

// 청구 알림클릭 요청
const apiClickClaimNotification = (body: ApiClickClaimNotificationBody) => {
  axiosInstance.post<ApiGetClaimsNotificationsResponse>(
    `/controller/click-processes/`,
    body
  );
};

/**
 * 청구 관련 api 요청 객체
 */
const notificationService = {
  apiGetClaimsNotifications,
  apiClickClaimNotification,
};

export default notificationService;
