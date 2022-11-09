import axios, { AxiosError } from 'axios';

import { axiosInstance } from '.';

import type {
  ApiCreatePhotoBody,
  ApiCreatePhotoResponse,
  ApiDeletePhotoBody,
  ApiDeletePhotoResponse,
} from '@/types';

/**
 * presignedURL을 이용해서 이미지를 업로드하는 함수
 * @param file: File 형태 입력, kinds: 이미지 종류 ( 유저, 상품 )
 * @returns 업로드된 이미지 URL(photoURL)반환 ( "photoURL"가 null이 아니면 성공 )
 */
const apiCreatePhoto = async ({
  file,
  kinds,
}: ApiCreatePhotoBody): Promise<ApiCreatePhotoResponse> => {
  try {
    const {
      data: { preSignedURL, photoURL, message },
    } = await axiosInstance.get<ApiCreatePhotoResponse>(
      `/photo?name=${file.name}&kinds=${kinds}`
    );

    // 예측 불가능한 에러
    if (!preSignedURL || !photoURL)
      return {
        photoURL,
        preSignedURL,
        message: '알 수 없는 에러입니다. 잠시후에 다시 시도해주세요!',
      };

    await axios.put(preSignedURL, file, {
      headers: { 'Content-Type': file.type },
    });

    return { photoURL, preSignedURL, message };
  } catch (error) {
    console.error('apiCreatePhoto() >> ', error);

    // 예측 가능한 에러 ( 잘못된 형식의 데이터를 전달받음 )
    if (error instanceof AxiosError) {
      const { preSignedURL, photoURL, message } = error.response?.data;

      return { photoURL, preSignedURL, message };
    }

    // 예측 불가능한 에러
    return {
      photoURL: null,
      preSignedURL: null,
      message: '이미지 업로드에 실패했습니다. 잠시후에 다시 시도해주세요!',
    };
  }
};

/**
 * 이미지 제거
 * @param name 이미지 이름
 * @returns 결과 메시지 ( message )
 */
const apiDeletePhoto = async ({
  name,
}: ApiDeletePhotoBody): Promise<ApiDeletePhotoResponse> => {
  try {
    const {
      data: { message },
    } = await axiosInstance.delete<ApiDeletePhotoResponse>(
      `/photo?name=${name}`
    );

    return { message };
  } catch (error) {
    console.error('apiDeletePhoto() >> ', error);

    // 예측 가능한 에러 ( 잘못된 형식의 데이터를 전달받음 )
    if (error instanceof AxiosError) {
      const { message } = error.response?.data;

      return { message };
    }

    return { message: '알 수 없는 문제입니다. 잠시후에 다시 시도해주세요!' };
  }
};

/**
 * 이미지 관련 api 요청 객체
 */
const photoService = {
  apiCreatePhoto,
  apiDeletePhoto,
};

export default photoService;
