export type {
  ApiClickClaimNotificationBody,
  ApiCreateClaimBody,
  ApiCreateClaimResponse,
  ApiCreatePhotoBody,
  ApiCreatePhotoResponse,
  ApiDeletePhotoBody,
  ApiDeletePhotoResponse,
  ApiDeletePhotosBody,
  ApiDeletePhotosResponse,
  ApiEditUserPhotoBody,
  ApiEditUserPhotoResponse,
  ApiGetClaimantsBody,
  ApiGetClaimantsResponse,
  ApiGetClaimBody,
  ApiGetClaimResponse,
  ApiGetClaimsBody,
  ApiGetClaimsByEmailBody,
  ApiGetClaimsByEmailResponse,
  ApiGetClaimsByKeywordBody,
  ApiGetClaimsByKeywordResponse,
  ApiGetClaimsNotificationsBody,
  ApiGetClaimsNotificationsResponse,
  ApiGetClaimsResponse,
  ApiGetContractsBody,
  ApiGetContractsResponse,
  ApiGetRelatedClaimsBody,
  ApiGetRelatedClaimsResponse,
  ApiLogInBody,
  ApiLogInResponse,
  ApiSignUpBody,
  ApiSignUpResponse,
  ApiUpdateClaimBody,
  ApiUpdateClaimResponse,
  ApiDeleteClaimBody,
  ApiDeleteClaimResponse,
  ApiUpdateUserBody,
  ApiUpdateUserResponse,
} from './api';

export type { ICON } from './icon';

// 이미지 종류
export type PhotoKinds = 'claim' | 'remove';

export type result = {
  view_count?: number;
  user: string;
  img_path: string;
  finished: string;
  finished_time: string;
};
