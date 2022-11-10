import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import { signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Address } from 'react-daum-postcode';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  addSeparatorToPhone,
  addSeparatorToSocialSecurityNumber,
  getRegExp,
  removeSeparatorToPhone,
  removeSeparatorToSocialSecurityNumber,
} from '@/lib';

import Form from '@/components/common/Form';
import Modal from '@/components/common/Modal';
import Seo from '@/components/common/Seo';

import apiService from '@/api';
import stateService from '@/atoms';

import type { ApiUpdateUserBody } from '@/types';

const Icon = dynamic(() => import('@/components/common/Icon'), {
  suspense: true,
});

type UserEditForm = ApiUpdateUserBody;

const Information = () => {
  const { data } = useSession();
  const [user, setUser] = useState(stateService.userService.userState);
  const [showAddressInput, setShowAddressInput] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { contents: info },
        } = await apiService.userService.apiGetUser({
          email: data?.user?.email,
        });
        setUser(info[0]);
      } catch (error) {
        console.error('info >> ', error);
      }
    };
    fetchData();
  }, []);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UserEditForm>();

  // 유저 정보 수정 여부
  const [changeInformation, setChangeInformation] = useState(true);

  // 유저 이름 inputRef
  const { ref: inputRef, ...nameRegister } = register('name', {
    required: '이름를 입력해주세요',
    maxLength: {
      value: 10,
      message: '10자 이내로 입력해주세요.',
    },
  });
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const getAddress = useCallback(
    (data: Address) => {
      const { roadAddress, zonecode } = data;

      setValue('address', `${roadAddress} [${zonecode}]`);

      setShowAddressInput(false);
    },
    [setValue]
  );

  // 유저 정보 초기화
  const initialize = useCallback(() => {
    // if (!data?.user) return;

    setValue('name', user.name);
    setValue('email', user.email);
    setValue('phoneNumber', addSeparatorToPhone(user.phoneNumber || ''));
    setValue(
      'socialSecurityNumber',
      addSeparatorToSocialSecurityNumber(user.socialSecurityNumber || '')
    );
    setValue('job', user.job);
    setValue('landline', addSeparatorToPhone(user.landline || ''));
    setValue('address', user.address);
    setValue('relationshipWithInsured', user.relationshipWithInsured);
  }, [user, setValue]);

  //  유저 초기 정보 입력
  useEffect(() => initialize(), [initialize]);

  // 유저 정보 수정 요청
  const onSubmitUser = useCallback(async (body: UserEditForm) => {
    const toastId = toast.loading('정보를 수정하고 있습니다.');

    try {
      const {
        data: { message },
      } = await apiService.userService.apiEditUser({
        ...body,
        phoneNumber: removeSeparatorToPhone(body.phoneNumber || ''),
        socialSecurityNumber: removeSeparatorToSocialSecurityNumber(
          body.socialSecurityNumber || ''
        ),
        landline: removeSeparatorToPhone(body.landline || ''),
      });

      toast.update(toastId, {
        render: message,
        type: 'success',
        isLoading: false,
        autoClose: 1500,
      });

      signOut({ redirect: true, callbackUrl: '/login' });
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

  // 유저 정보 수정 버튼 클릭
  const onClickUpdateUser = useCallback(() => {
    setChangeInformation(false);
    setTimeout(() => nameInputRef.current?.select(), 0);

    // if (!data?.user) return;
    setValue('phoneNumber', removeSeparatorToPhone(user.phoneNumber || ''));
    setValue(
      'socialSecurityNumber',
      removeSeparatorToSocialSecurityNumber(user.socialSecurityNumber || '')
    );
    setValue('landline', removeSeparatorToPhone(user.landline || ''));
  }, [setValue, nameInputRef]);

  // 유저 정보 수정 취소 버튼 클릭
  const onReset = useCallback(() => {
    initialize();
    setChangeInformation(true);

    // if (!data?.user) return;
    setValue('phoneNumber', addSeparatorToPhone(user.phoneNumber || ''));
    setValue(
      'socialSecurityNumber',
      addSeparatorToSocialSecurityNumber(user.socialSecurityNumber || '')
    );
    setValue('landline', addSeparatorToPhone(user.landline || ''));
  }, [initialize, setChangeInformation, setValue]);

  return (
    <>
      <Seo
        title='AI 계장님 - 회원 정보'
        description='회원정보를 확인하고 수정하세요!'
      />
      <article className='container mx-auto max-w-[64rem] justify-center px-6 py-24 lg:h-[64rem]'>
        <nav className='flex' aria-label='Breadcrmb'>
          <ol className='inline-flex items-center space-x-1 md:space-x-3'>
            <li className='inline-flex items-center'>
              <a
                href='/'
                className='inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900'
              >
                <Icon shape='home' className='mr-1 h-4 w-4' fill />홈
              </a>
            </li>
            <li>
              <div className='flex items-center'>
                <Icon shape='arrowRight' className='m-1 h-4 w-4' />
                <a
                  href='/mypage'
                  className='ml-1 text-sm font-medium text-gray-600 hover:text-gray-900 md:ml-2 '
                >
                  마이페이지
                </a>
              </div>
            </li>
            <li aria-current='page'>
              <div className='flex items-center'>
                <Icon shape='arrowRight' className='m-1 h-4 w-4' />
                <span className='ml-1 text-sm font-medium text-gray-800 md:ml-2'>
                  회원정보
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div className='overflow-hidden pt-12'>
          <Form onSubmit={handleSubmit(onSubmitUser)}>
            <div className='bg-white-500 shadow sm:rounded-lg'>
              <div className='flex items-center justify-between px-4 py-5 sm:px-6'>
                <div>
                  <h3 className='text-lg font-medium leading-6 text-gray-900'>
                    회원정보
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm text-gray-600'>
                    수정 버튼을 눌러 내용을 수정하실 수 있습니다
                  </p>
                </div>
                <div className='ml-4 flex-shrink-0'>
                  {changeInformation ? (
                    <div>
                      <button
                        type='button'
                        className='flex w-full items-center justify-center truncate rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm text-white-300 shadow-sm hover:bg-indigo-700'
                        onClick={onClickUpdateUser}
                      >
                        수정하기
                      </button>
                    </div>
                  ) : (
                    <div className=' inset-y-0 right-0 flex items-center space-x-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                      <button
                        type='submit'
                        className='flex w-full items-center justify-center truncate rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm text-white-300 shadow-sm hover:bg-indigo-700'
                      >
                        수정완료
                      </button>
                      <button
                        type='button'
                        className='flex w-full items-center justify-center truncate rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm text-white-300 shadow-sm hover:bg-red-700'
                        onClick={onReset}
                      >
                        수정취소
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className='border-t border-gray-200'>
                <dl>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-600'>이름</dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                      <input
                        id='name'
                        type='text'
                        className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                        {...nameRegister}
                        disabled={changeInformation}
                        ref={(e) => {
                          inputRef(e);
                          nameInputRef.current = e;
                        }}
                      />
                      <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                        {errors.name?.message?.toString()}
                      </span>
                    </dd>
                  </div>
                  <div className='items-center bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-600'>
                      이메일
                    </dt>
                    <dd className='mt-1 flex items-center text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                      <input
                        id='email'
                        type='email'
                        className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                        {...register('email', {
                          required: '이메일을 입력해주세요',
                          pattern: {
                            value: getRegExp('email'),
                            message: '이메일 형식에 맞게 입력해 주세요.',
                          },
                        })}
                        disabled={changeInformation}
                      />
                      <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                        {errors.email?.message?.toString()}
                      </span>
                    </dd>
                  </div>
                  <div className='items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-600'>
                      전화번호
                    </dt>
                    <dd className='mt-1 flex items-center text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                      <input
                        id='phoneNumber'
                        type='text'
                        className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                        {...register('phoneNumber', {
                          required: '휴대폰 번호를 입력해주세요',
                          pattern: {
                            value: getRegExp('phone'),
                            message: '숫자만 11자리 입력해 주세요.',
                          },
                          maxLength: {
                            value: 11,
                            message: '숫자만 11자리 입력해 주세요.',
                          },
                          minLength: {
                            value: 11,
                            message: '숫자만 11자리 입력해 주세요.',
                          },
                        })}
                        disabled={changeInformation}
                      />
                      <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                        {errors.phoneNumber?.message?.toString()}
                      </span>
                    </dd>
                  </div>
                  <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-600'>
                      회원분류
                    </dt>
                    <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                      {user?.role === 'manager' ? '담당자' : '청구자'}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-600'>
                      가입날짜
                    </dt>
                    <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                      {user?.joinDate}
                    </dd>
                  </div>
                  {data?.user.role !== 'manager' ? (
                    <>
                      <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-gray-600'>
                          주민번호
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                          <input
                            id='socialSecurityNumber'
                            type='text'
                            className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                            {...register('socialSecurityNumber', {
                              required: '주민번호를 입력해주세요',
                              pattern: {
                                value: getRegExp('socialSecurityNumber'),
                                message: '숫자만 13자리 입력해 주세요.',
                              },
                              maxLength: {
                                value: 13,
                                message: '숫자만 13자리 입력해 주세요.',
                              },
                              minLength: {
                                value: 13,
                                message: '숫자만 13자리 입력해 주세요.',
                              },
                            })}
                            disabled={changeInformation}
                          />
                          <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                            {errors.socialSecurityNumber?.message?.toString()}
                          </span>
                        </dd>
                      </div>
                      <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-gray-600'>
                          직장명
                        </dt>
                        <input
                          id='job'
                          type='text'
                          className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                          {...register('job', {
                            required: '직장명을 입력해주세요',
                            maxLength: {
                              value: 10,
                              message: '10자 이하 입력해 주세요.',
                            },
                            minLength: {
                              value: 2,
                              message: '2자 이상 입력해 주세요.',
                            },
                          })}
                          disabled={changeInformation}
                        />
                        <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                          {errors.job?.message?.toString()}
                        </span>
                      </div>
                      <div className='bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-gray-600'>
                          자택 전화번호
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                          <input
                            id='landline'
                            type='text'
                            className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                            {...register('landline', {
                              required: '자택 전화번호를 입력해주세요',
                              pattern: {
                                value: getRegExp('phone'),
                                message: '숫자만 11자리 입력해 주세요.',
                              },
                              maxLength: {
                                value: 11,
                                message: '숫자만 11자리 입력해 주세요.',
                              },
                              minLength: {
                                value: 11,
                                message: '숫자만 11자리 입력해 주세요.',
                              },
                            })}
                            disabled={changeInformation}
                          />
                          <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                            {errors.landline?.message?.toString()}
                          </span>
                        </dd>
                      </div>
                      <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-gray-600'>
                          주소
                        </dt>
                        <input
                          id='address'
                          type='text'
                          className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                          {...register('address', {
                            required: '주소를 입력해주세요',
                          })}
                          disabled={changeInformation}
                          onClick={() => setShowAddressInput(true)}
                        />
                        <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                          {errors.address?.message?.toString()}
                        </span>
                      </div>
                      <div className='bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-gray-600'>
                          피보험자와의 관계
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                          <input
                            id='relationshipWithInsured'
                            type='text'
                            className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                            {...register('relationshipWithInsured', {
                              required: '피보험자와의 관계를 입력해주세요',
                              maxLength: {
                                value: 10,
                                message: '10자 이하 입력해 주세요.',
                              },
                              minLength: {
                                value: 1,
                                message: '1자 이상 입력해 주세요.',
                              },
                            })}
                            disabled={changeInformation}
                          />
                          <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                            {errors.relationshipWithInsured?.message?.toString()}
                          </span>
                        </dd>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </dl>
              </div>
            </div>
          </Form>
          {showAddressInput && (
            <Modal
              onCloseModal={() => setShowAddressInput(false)}
              className='min-w-[400px] max-w-[800px]'
            >
              <DaumPostcodeEmbed
                onComplete={getAddress}
                animation
                useBannerLink={false}
              />
            </Modal>
          )}
        </div>
      </article>
    </>
  );
};

export default Information;
