import type { PhotoKinds, result } from './';

/**
 * 모든 api요청이 공통으로 갖는 타입
 */
type ApiResponse = {
  message: string | null;
};

/**
 * 단일 이미지 업로드 송신 타입
 * 바로 이미지 업로드가 아닌 "preSignedUrl"을 요청하는 것
 */
export type ApiCreatePhotoBody = { file: File; kinds: PhotoKinds };
/**
 * 단일 이미지 업로드 수신 타입
 * 바로 이미지 업로드가 아닌 "preSignedUrl"을 요청하는 것
 */
export type ApiCreatePhotoResponse = ApiResponse & {
  preSignedURL: string | null;
  photoURL: string | null;
};

/**
 * 회원가입 송신 타입
 */
export type ApiSignUpBody = any;
/**
 * 회원가입 수신 타입
 */
export type ApiSignUpResponse = ApiResponse & { user: any | null };

/**
 * 로그인 송신 타입
 */
export type ApiLogInBody = { email: string; password: string };
/**
 * 로그인 수신 타입
 */
export type ApiLogInResponse = ApiResponse & {
  email: string;
  password: string;
};

/**
 * 유저 상세 정보 요청
 */
export type ApiGetUserBody = { email: string };

/**
 * 유저 상세 정보 수신
 */
export type ApiGetUserResponse = ApiResponse & { contents: any };

/**
 * 유저 일반 정보 수정 송신 타입
 */
export type ApiUpdateUserBody = Pick<
  any,
  | 'name'
  | 'email'
  | 'phoneNumber'
  | 'socialSecurityNumber'
  | 'job'
  | 'landline'
  | 'address'
  | 'relationshipWithInsured'
>;
/**
 * 유저 일반 정보 수정 수신 타입
 */
export type ApiUpdateUserResponse = ApiResponse & { user?: any | null };
/**
 * 이미지 수정 송신 타입
 * 기존 이미지를 제거하고 새로운 이미지를 추가할 수 있는 "preSingedUrl"을 얻는 타입
 */
export type ApiEditUserPhotoBody = { file: File };
/**
 * 이미지 수정 수신 타입
 * 기존 이미지를 제거하고 새로운 이미지를 추가할 수 있는 "preSingedUrl"을 얻는 타입
 */
export type ApiEditUserPhotoResponse = ApiResponse & {
  preSignedURL: string | null;
  photoURL: string | null;
};

/**
 * 임시 저장된 이미지 제거 송신 타입
 */
export type ApiDeletePhotoBody = { name: string };
/**
 * 임시 저장된 이미지 제거 수신 타입
 */
export type ApiDeletePhotoResponse = ApiResponse & {};
/**
 * 임시 저장된 이미지들 제거 송신 타입
 */
export type ApiDeletePhotosBody = { names: string[] };
/**
 * 임시 저장된 이미지들 제거 수신 타입
 */
export type ApiDeletePhotosResponse = ApiResponse & {};

/**
 * 청구 등록 송신 타입
 */
export type ApiCreateClaimBody = {
  user: string;
  image_path: string;
  contract_id: number;
  company: string;
};
/**
 * 청구 등록 수신 타입
 */
export type ApiCreateClaimResponse = ApiResponse & {
  claimIdx?: number;
};

/**
 * 청구들 불러오기 송신 타입
 */
export type ApiGetClaimsBody = {
  email: string;
};
/**
 * 청구들 불러오기 수신 타입
 */
export type ApiGetClaimsResponse = ApiResponse & { contents: any[] };

/**
 * 특정 키워드를 가진 청구들 불러오기 송신 타입
 */
export type ApiGetClaimsByKeywordBody = ApiGetClaimsBody & {
  email: string;
  filter: string;
  keyword: string;
};
/**
 * 특정 키워드를 가진 청구들 불러오기 수신 타입
 */
export type ApiGetClaimsByKeywordResponse = ApiGetClaimsResponse;

/**
 * 특정 청구 상세 데이터 송신 타입
 */
export type ApiGetClaimBody = {
  claimIdx: number;
};
/**
 * 특정 청구 상세 데이터 수신 타입
 */
export type ApiGetClaimResponse = ApiResponse & { contents: any };

/**
 * 특정 이메일을 가진 청구들 불러오기 송신 타입
 */
export type ApiGetClaimsByEmailBody = ApiGetClaimsBody & {
  email: string;
};
/**
 * 특정 키워드를 가진 청구들 불러오기 수신 타입
 */
export type ApiGetClaimsByEmailResponse = ApiGetClaimsResponse;

/**
 * 특정 이메일을 가진 청구들 불러오기 송신 타입
 */
export type ApiGetRelatedClaimsBody = ApiGetClaimsBody & {
  lastIdx?: number;
  email: string;
};
/**
 * 특정 키워드를 가진 청구들 불러오기 수신 타입
 */
export type ApiGetRelatedClaimsResponse = ApiGetClaimsResponse;

/**
 *계약들 불러오기 송신 타입
 */
export type ApiGetContractsBody = {
  lastIdx?: number;
  email: string;
  searchWord?: string;
};

/**
 * 고객 불러오기 송신 타입
 */
export type ApiGetClaimantsBody = {
  lastIdx?: number;
  email?: string;
  searchWord?: string;
};
/**
 * 고객 키워드 불러오기 수신 타입
 */
export type ApiGetClaimantsResponse = ApiResponse & { contents: any[] };

/**
 * 청구 정보 수정 송신 타입
 */
export type ApiUpdateClaimBody = any & { claimIdx: number };
/**
 * 청구 정보 수정 수신 타입
 */
export type ApiGetContractsResponse = ApiResponse & { contents: any[] };

/**
 * 청구 정보 수정 송신 타입
 */
export type ApiDeleteClaimBody = { claimIdx: number };
/**
 * 청구 정보 수정 수신 타입
 */
export type ApiDeleteClaimResponse = ApiResponse;

/**
 * 청구 진행알림 송신 타입
 */
export type ApiGetClaimsNotificationsBody = { id: string };

/**
 * 청구 진행알림 수신 타입
 */
export type ApiGetClaimsNotificationsResponse = ApiResponse & {
  data: result[];
};

/**
 * 청구 알림클릭 송신 타입
 */
export type ApiClickClaimNotificationBody = {
  user: string;
  notification: string;
};

export type ApiUpdateClaimResponse = ApiResponse;
