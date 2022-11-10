import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Fragment, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import apiService from '@/api';

const NotAuth = dynamic(() => import('@/components/common/403'), {
  suspense: true,
});
const NotLoggedIn = dynamic(() => import('@/components/common/401'), {
  suspense: true,
});
const Form = dynamic(() => import('@/components/common/Form'), {
  suspense: true,
});
const UploadPhoto = dynamic(() => import('@/components/Main/UploadPhoto'), {
  suspense: true,
});
const ContractSearch = dynamic(
  () => import('@/components/Main/ContractSearch'),
  {
    suspense: true,
  }
);
const Button = dynamic(() => import('@/components/common/Button'), {
  suspense: true,
});
import { AxiosError } from 'axios';
import type { NextPage } from 'next';

import Seo from '@/components/common/Seo';

import type { ApiCreateClaimBody } from '@/types';

type ClaimForm = ApiCreateClaimBody;

const Upload: NextPage = () => {
  const router = useRouter();
  const { data } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimForm>();

  const [photoURL, setPhotoURL] = useState<string>('');
  const [contract, setContract] = useState<any>({});

  // 계약 등록
  const onCreateClaim = useCallback(
    async (body: ClaimForm) => {
      const toastId = toast.loading(
        '청구를 등록중입니다. 잠시만 기다려주세요.'
      );
      if (data?.user?.email === null || data?.user?.email === undefined) return;

      const claimBody: ApiCreateClaimBody = {
        company: contract.company,
        contract_id: Number(contract.idx),
        // user: data?.user?.email,
        user: 'park@test.com',
        image_path: photoURL,
      };
      console.log(claimBody);
      try {
        const {
          data: { message },
        } = await apiService.claimService.apiCreateClaim(claimBody);

        toast.update(toastId, {
          render: message,
          type: 'success',
          isLoading: false,
          autoClose: 1500,
        });

        router.push(`/`);
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
            render: '알 수 없는 에러입니다. 잠시후에 다시 시도해주세요!',
            type: 'error',
            isLoading: false,
            autoClose: 1500,
          });
        }
      }
    },
    [photoURL, router, contract]
  );

  // 로그인 유무 확인
  if (!data) return <NotLoggedIn />;
  if (!data.user) return <NotLoggedIn />;
  // 등록 권한이 있는지 확인
  if (data.user.role !== 'beneficiary') return <NotAuth />;

  return (
    <>
      <Seo
        title='AI 계장님 - 업로드'
        description='AI 계장님에 당신의 청구서를 업로드하세요!'
      />
      <Form onSubmit={handleSubmit(onCreateClaim)} className='pt-4'>
        <div className='container mx-auto justify-center px-6 py-24 md:w-[38rem] lg:h-[64rem]'>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <div className='shadow sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white-300 px-4 py-5 sm:p-6'>
                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='company-website'
                    className='block text-sm font-medium text-gray-700'
                  >
                    계약
                  </label>
                  <ContractSearch setContract={setContract} />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    청구 이미지
                  </label>
                  <UploadPhoto
                    photoURL={photoURL}
                    setPhotoURL={setPhotoURL}
                    name='청구 이미지'
                    register={register('image_path')}
                    kinds='claim'
                  />
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <Button
                  type='submit'
                  text='청구하기'
                  className='mb-4 w-full min-w-[200px] max-w-[600px]'
                  primary
                  disabled={photoURL === '' || contract.id == ''}
                />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Upload;
