import { Dialog, Transition } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Fragment, useCallback, useRef, useState } from 'react';
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

import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import type { NextPage } from 'next';

import Icon from '@/components/common/Icon';

import apiService from '@/api';

const Mypage: NextPage = () => {
  const router = useRouter();
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

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

  const onClickWithdrawal = useCallback(async () => {
    const toastId = toast.loading('회원탈퇴를 요청 중 입니다.');
    if (!data?.user?.email) return;
    try {
      const {
        data: { message },
      } = await apiService.userService.apiDeleteUser({
        email: data?.user?.email,
      });

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
          render: '알 수 없는 에러가 발생했습니다.',
          type: 'error',
          isLoading: false,
          autoClose: 1500,
        });
      }
    }
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
                <>
                  <a
                    className='flex w-full items-center border-t border-gray-100 py-4 pl-6 pr-3 text-red-500 transition duration-150 hover:bg-gray-100'
                    onClick={() => setOpen(true)}
                  >
                    <Icon
                      shape='logout'
                      className='flex h-4 w-4 sm:h-5 sm:w-5'
                    />
                    <span className='font-bolder flex-1 pl-3 sm:text-lg'>
                      탈퇴하기
                    </span>
                    <Icon
                      shape='arrowRight'
                      className='h-5 w-5 sm:h-6 sm:w-6'
                    />
                  </a>
                </>
              </div>
            </div>
          </div>
        </div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-10'
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            <div className='fixed inset-0 z-10 overflow-y-auto'>
              <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                  enterTo='opacity-100 translate-y-0 sm:scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                  leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                >
                  <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white-500 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                      <div className='sm:flex sm:items-start'>
                        <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                          <ExclamationTriangleIcon
                            className='h-6 w-6 text-red-600'
                            aria-hidden='true'
                          />
                        </div>
                        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                          <Dialog.Title
                            as='h3'
                            className='text-lg font-medium leading-6 text-gray-900'
                          >
                            탈퇴하기
                          </Dialog.Title>
                          <div className='mt-2'>
                            <p className='text-sm text-gray-700'>
                              정말 계정을 탈퇴하시겠습니까? 등록하신 청구와 모든
                              기록이 사라집니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                      <button
                        type='button'
                        className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white-500 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={() => onClickWithdrawal()}
                      >
                        삭제하기
                      </button>
                      <button
                        type='button'
                        className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white-500 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        닫기
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </article>
    </>
  );
};

export default Mypage;
