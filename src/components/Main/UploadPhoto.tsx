import { AxiosError } from 'axios';
import type { ChangeEvent } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import ErrorMessage from '@/components/common/ErrorMessage';
import NextImage from '@/components/common/NextImage';

import S3ApiService from '@/api/s3';

import type { PhotoKinds } from '@/types';

type Props = {
  photoURL: string;
  setPhotoURL: Dispatch<SetStateAction<string>>;
  name: string;
  register: UseFormRegisterReturn;
  kinds: PhotoKinds;
  errorMessage?: string;
  disabled?: boolean;
};

const UploadPhoto = ({
  photoURL,
  setPhotoURL,
  name,
  register,
  kinds,
  errorMessage,
  disabled,
}: Props) => {
  // photo ref 떼내기
  const photoRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...restRegister } = register;

  // 이미지 선택 시 실행
  const onInputPhoto = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      if (e.target.files?.length === 0) return;

      const file = e.target.files[0];

      const toastId = toast.loading(
        '이미지를 업로드하는중입니다. 잠시 기다려주세요!'
      );
      try {
        const { photoURL } = await S3ApiService.photoService.apiCreatePhoto({
          file,
          kinds,
        });

        if (!photoURL)
          return toast.update(toastId, {
            render: '이미지를 업로드하지 못했습니다. 다시 시도해주세요!',
            type: 'warning',
            isLoading: false,
          });

        setPhotoURL(photoURL);

        toast.update(toastId, {
          render: '이미지를 업로드했습니다.',
          type: 'success',
          isLoading: false,
          autoClose: 1500,
        });
      } catch (error) {
        console.error('error >> ', error);

        if (error instanceof AxiosError) {
          toast.update(toastId, {
            render: error.response?.data.message,
            type: 'error',
            isLoading: false,
            autoClose: 1500,
          });
        } else {
          toast.update(toastId, {
            render: '알 수 없는 에러가 발생했습니다.',
            type: 'error',
            isLoading: false,
            autoClose: 1500,
          });
        }
      }
    },
    [setPhotoURL, kinds]
  );

  return (
    <>
      <input
        id={name}
        type='file'
        accept='image/*'
        {...restRegister}
        ref={(e) => {
          ref(e);
          photoRef.current = e;
        }}
        disabled={disabled}
        hidden
        onChange={onInputPhoto}
        required
      />

      <div
        className='xs:h-96 flex h-80 w-full min-w-[200px] max-w-[600px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-400 bg-transparent p-2 text-blue-400 transition-colors hover:border-blue-600 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 focus:outline-none'
        onClick={() => photoRef.current?.click()}
        tabIndex={0}
      >
        {photoURL === '' ? (
          <div className='space-y-1 text-center'>
            <div className='flex text-sm text-gray-600'>
              <label
                htmlFor='file-upload'
                className='bg-white relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
              >
                <span>청구 이미지를</span>
              </label>
              <p className='pl-1'>업로드하세요</p>
            </div>
            <p className='text-xs text-gray-600'>PNG, JPG, GIF up to 10MB</p>
          </div>
        ) : (
          <NextImage
            src={`https://aichief-bucket.s3.ap-northeast-2.amazonaws.com/${photoURL}`}
            width={300}
            height={300}
            useSkeleton
            alt='청구 이미지'
            layout='responsive'
            priority
          />
        )}
      </div>

      <ErrorMessage errorMessage={errorMessage} />
    </>
  );
};

export default UploadPhoto;
