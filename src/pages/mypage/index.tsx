import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

const Seo = dynamic(() => import('@/components/common/Seo'), {
  suspense: true,
});
const NextImage = dynamic(() => import('@/components/common/NextImage'), {
  suspense: true,
});
const InfoMenu = dynamic(() => import('@/components/Main/InfoMenu'), {
  suspense: true,
});

import type { NextPage } from 'next';

const Mypage: NextPage = () => {
  const router = useRouter();
  const { data } = useSession();

  const onClickLogOut = useCallback(() => {
    const toastId = toast.loading('로그아웃중입니다.');

    signOut({ callbackUrl: '/login', redirect: true });

    toast.update(toastId, {
      render: '로그아웃이 완료되었습니다. 로그인페이지로 이동합니다.',
      type: 'success',
      isLoading: false,
      autoClose: 1500,
    });
  }, []);

  return (
    <>
      <Seo
        title='AI 계장님 - 마이페이지'
        description='마이페이지에서 당신의 내용을 확인하세요!'
      />
      <article className='container mx-auto justify-center space-y-6 px-6 py-60 lg:h-[64rem] lg:flex-row lg:items-center'>
        <div className='relative mx-auto w-5/6 rounded-lg bg-white-300 shadow  md:w-4/6 lg:w-3/6 xl:w-2/6'>
          <div className='flex justify-center'>
            <div className='border-white absolute -top-20 mx-auto h-32 w-32 transform rounded-full border-4 shadow-md transition duration-200 hover:scale-110'>
              {data?.user?.image ? (
                <NextImage
                  src={data?.user?.image}
                  alt='user'
                  quality={100}
                  width={32}
                  layout='fill'
                  imgClassName='rounded-full'
                  unoptimized={true}
                />
              ) : (
                <NextImage
                  src='/assets/user.jpg'
                  alt='user'
                  quality={100}
                  width={120}
                  height={120}
                  layout='intrinsic'
                  imgClassName='rounded-full'
                />
              )}
            </div>
          </div>
          <div className='mt-16'>
            <h1 className='text-center text-3xl font-bold text-gray-900'>
              {data?.user?.name}
            </h1>
            <p className='text-center text-sm font-medium text-gray-400'>
              {data?.user?.email}
            </p>
            <p>
              <span></span>
            </p>
            <div className='my-5 flex justify-center space-x-3 px-6'>
              <Link href='mypage/info'>
                <span className='inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  회원정보 수정
                </span>
              </Link>
              <span
                onClick={onClickLogOut}
                className='bg-white dark:text-white inline-flex items-center rounded-lg border border-gray-300 py-2 px-4 text-center text-sm font-medium text-gray-100 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
              >
                로그아웃
              </span>
            </div>

            <div className='w-full'>
              <h3 className='px-6 text-left font-medium text-gray-900'>
                마이페이지 메뉴
              </h3>
              <div className='mt-5 flex w-full flex-col items-center overflow-hidden text-sm'>
                <InfoMenu name='회원 정보' url='mypage/info' shape='user' />
                {data?.user?.role === 'manager' ? (
                  <>
                    <InfoMenu
                      name='청구자 조회'
                      url='mypage/claimant'
                      shape='customer'
                    />
                  </>
                ) : (
                  <>
                    <InfoMenu
                      name='계약 조회'
                      url='mypage/contract'
                      shape='contract'
                    />
                    <InfoMenu
                      name='청구 조회'
                      url='mypage/claim'
                      shape='claim'
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Mypage;
