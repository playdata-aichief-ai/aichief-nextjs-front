import { Dialog, Disclosure, Transition } from '@headlessui/react';
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import { AxiosError } from 'axios';
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { getRegExp } from '@/lib';

import Seo from '@/components/common/Seo';
import ArrowLink from '@/components/links/ArrowLink';
import RelatedClaims from '@/components/Main/RelatedClaims';

import apiService from '@/api';
import stateService from '@/atoms';

import type { ApiGetClaimsByEmailResponse, ApiUpdateClaimBody } from '@/types';

const Title = dynamic(() => import('@/components/common//Title'), {
  suspense: true,
});
const ErrorPage = dynamic(() => import('@/components/common/ErrorPage'), {
  suspense: true,
});

type ClaimEditForm = ApiUpdateClaimBody;

type Props = {
  claim: any;
  relatedClaims: ApiGetClaimsByEmailResponse[];
};

const Claim: NextPage<Props> = ({ claim, relatedClaims }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ClaimEditForm>();

  // 정보 수정 여부
  const [changeClaimInfo, setChangeClaimInfo] = useState(true);
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  // 연관된 청구들 수정 함수
  const setRelatedClaims = useSetRecoilState(
    stateService.relatedClaimService.relatedClaimsState
  );

  // 연관된 청구들 초기화
  useEffect(() => {
    setRelatedClaims(relatedClaims);
  }, [setRelatedClaims, relatedClaims]);

  // 정보 초기화
  const initialize = useCallback(() => {
    if (claim?.user) return;
    setValue('diseaseName', claim.accident.diseaseName);
    setValue('accidentLocation', claim.accident.location);
    setValue('accidentDateTime', claim.accident.dateTime);
    setValue('accidentDetails', claim.accident.details);
    setValue('bankName', claim.account.bankName);
    setValue('accountNumber', claim.account.number);
    setValue('accountHolder', claim.account.holder);
    setValue('anotherCompanyName', claim.anotherSubscribe.companyName);
    setValue('anotherSubscribeNumber', claim.anotherSubscribe.number);
    setValue('identificationNumber', claim.identification.number);
    setValue('serialNumber', claim.identification.serialNumber);
    setValue('issueBy', claim.identification.issueBy);
    setValue('issueDate', claim.identification.issueDate);
  }, [setValue, claim]);

  //  유저 초기 정보 입력
  useEffect(() => initialize(), [initialize]);

  // 유저 정보 수정 요청
  const onSubmitClaim = useCallback(async (body: ClaimEditForm) => {
    const toastId = toast.loading('정보를 수정하고 있습니다.');

    const identification = {
      number: body.identificationNumber,
      serialNumber: body.serialNumber,
      issueDate: body.issueDate,
      issueBy: body.issueBy,
    };
    const anotherSubscribe = {
      companyName: body.anotherCompanyName,
      number: body.anotherSubscribeNumber,
    };
    const account = {
      bankName: body.bankName,
      number: body.accountNumber,
      holder: body.accountHolder,
    };
    const accident = {
      dateTime: body.accidentDateTime,
      location: body.accidentLocation,
      details: body.accidentDetails,
      diseaseName: body.diseaseName,
    };

    const claimEditBody: ApiUpdateClaimBody = {
      identification: identification,
      anotherSubscribe: anotherSubscribe,
      account: account,
      accident: accident,
      claimId: claim.claim.claimId,
    };

    console.log(JSON.stringify(claimEditBody));

    try {
      const data = await apiService.claimService.apiEditClaim(claimEditBody);

      toast.update(toastId, {
        render: '수정완료!',
        type: 'success',
        isLoading: false,
        autoClose: 1500,
      });
      setChangeClaimInfo(true);
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

  // 청구 정보 수정 버튼 클릭
  const onClickUpdateClaim = useCallback(() => {
    setChangeClaimInfo(false);
  }, []);

  // 청구 정보 수정 취소 버튼 클릭
  const onReset = useCallback(() => {
    initialize();
    setChangeClaimInfo(true);
  }, [initialize, setChangeClaimInfo]);

  const onClickDeleteClaim = useCallback(async () => {
    const toastId = toast.loading('청구 삭제를 요청 중 입니다.');
    try {
      const {
        data: { message },
      } = await apiService.claimService.apiDeleteClaim({
        claimIdx: claim.claim.claimId,
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

  if (claim === null) return <ErrorPage message='상품이 존재하지 않습니다.' />;

  return (
    <>
      <Seo title='AI 계장님 - 청구' description='담당된 청구를 검색해보세요!' />
      <article className='lg:h-min-[64rem] container mx-auto max-w-[64rem] justify-center space-y-4 px-6 py-28'>
        <ArrowLink direction='left' href='/' onClick={() => router.back()}>
          뒤로 가기
        </ArrowLink>
        <form onSubmit={handleSubmit(onSubmitClaim)}>
          <>
            {/* <div className='mx-auto flex justify-center py-3'>
              <Image
                width='450px'
                height='600px'
                src='https://www.kospo.co.kr/preview/result/temp_1603238668342100.files/1.png'
                className='xs:h-[450px] h-[300px] w-full md:h-[600px]'
                alt='대표 이미지'
                onClick={() => setShowModal(true)}
              />
            </div> */}
            <div className='lg:flex lg:items-center lg:justify-between'>
              <div className='min-w-0 flex-1'>
                <h2 className='text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight'>
                  {claim.insurance.details}
                </h2>
                <div className='mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6'>
                  <div className='mt-2 flex items-center text-sm text-gray-600'>
                    <BriefcaseIcon
                      className='mr-1.5 h-5 w-5 flex-shrink-0'
                      aria-hidden='true'
                    />
                    보험사: {claim.insurance.companyName}
                  </div>
                  <div className='mt-2 flex items-center text-sm text-gray-600'>
                    <UserIcon
                      className='mr-1.5 h-5 w-5 flex-shrink-0'
                      aria-hidden='true'
                    />
                    수익자: {claim.beneficiary.name}
                  </div>
                  <div className='mt-2 flex items-center text-sm text-gray-600'>
                    <CalendarIcon
                      className='mr-1.5 h-5 w-5 flex-shrink-0'
                      aria-hidden='true'
                    />
                    청구일자: {claim.claim.date}
                  </div>
                  <div className='mt-2 flex items-center text-sm text-gray-600'>
                    <CurrencyDollarIcon
                      className='mr-1.5 h-5 w-5 flex-shrink-0'
                      aria-hidden='true'
                    />
                    월보험료: {claim.contract.monthlyPremium}
                  </div>
                </div>
              </div>
              <div className='mt-5 flex lg:mt-0 lg:ml-4'>
                {changeClaimInfo ? (
                  <span className='mr-3'>
                    <button
                      type='button'
                      className='inline-flex items-center rounded-md border border-gray-300 bg-white-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      onClick={onClickUpdateClaim}
                    >
                      수정하기
                    </button>
                  </span>
                ) : (
                  <>
                    <span className='mr-3'>
                      <button
                        type='submit'
                        className='inline-flex items-center rounded-md border border-gray-300 bg-white-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      >
                        수정완료
                      </button>
                    </span>
                    <span className='mr-3'>
                      <button
                        type='button'
                        className='inline-flex items-center rounded-md border border-gray-300 bg-red-500 px-4 py-2 text-sm font-medium text-white-500 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2'
                        onClick={onReset}
                      >
                        수정취소
                      </button>
                    </span>
                  </>
                )}

                <span className='sm:ml-3'>
                  <button
                    type='button'
                    className='inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white-500 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                    onClick={() => setOpen(true)}
                  >
                    <TrashIcon
                      className='-ml-1 mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                    삭제하기
                  </button>
                </span>
              </div>
            </div>
          </>

          <div className='pb-10' />

          <Disclosure
            defaultOpen={true}
            as='div'
            className='border-t border-gray-200 px-4 py-6'
          >
            {({ open }) => (
              <>
                <h3 className='-mx-2 -my-3 flow-root'>
                  <Disclosure.Button className='flex w-full items-center justify-between  rounded-lg bg-slate-300 px-5 py-3 text-gray-200 shadow hover:bg-slate-200 hover:text-gray-700'>
                    <span className='font-medium text-slate-600'>사고경위</span>
                    <span className='ml-6 flex items-center'>
                      {open ? (
                        <MinusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      ) : (
                        <PlusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className='pt-6'>
                  <div className='bg-white-500 shadow sm:rounded-lg'>
                    <div className='border-t border-gray-200'>
                      <dl>
                        <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            질명
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='diseaseName'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                              disabled={changeClaimInfo}
                              {...register('diseaseName', {
                                required: '질명 이름을 입력해주세요',
                                maxLength: {
                                  value: 20,
                                  message: '20자 이하 입력해 주세요.',
                                },
                                minLength: {
                                  value: 2,
                                  message: '2자 이상 입력해 주세요.',
                                },
                              })}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.diseaseName?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                        <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            사건발생 위치
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='accidentLocation'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                              disabled={changeClaimInfo}
                              {...register('accidentLocation', {
                                required: '사건발생 위치를 입력해주세요',
                                maxLength: {
                                  value: 20,
                                  message: '20자 이하 입력해 주세요.',
                                },
                                minLength: {
                                  value: 4,
                                  message: '4자 이상 입력해 주세요.',
                                },
                              })}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.accidentLocation?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                        <div className='items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            사건발생 일자
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='accidentDateTime'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent '
                              disabled={changeClaimInfo}
                              {...register('accidentDateTime')}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.accidentDateTime?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                        <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            세부정보
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='accidentDetails'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                              disabled={changeClaimInfo}
                              {...register('accidentDetails', {
                                required: '세부정보를 입력해주세요',
                                maxLength: {
                                  value: 20,
                                  message: '20자 이하 입력해 주세요.',
                                },
                                minLength: {
                                  value: 2,
                                  message: '2자 이상 입력해 주세요.',
                                },
                              })}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.accidentDetails?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen={true} as='div' className='px-4 py-6'>
            {({ open }) => (
              <>
                <h3 className='-mx-2 -my-3 flow-root'>
                  <Disclosure.Button className='flex w-full items-center justify-between  rounded-lg bg-slate-300 px-5 py-3 text-gray-200 shadow hover:bg-slate-200 hover:text-gray-700'>
                    <span className='font-medium text-slate-600'>계좌</span>
                    <span className='ml-6 flex items-center'>
                      {open ? (
                        <MinusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      ) : (
                        <PlusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className='pt-6'>
                  <div className='bg-white-500 shadow sm:rounded-lg'>
                    <div className='border-t border-gray-200'>
                      <dl>
                        <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            은행사
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='bankName'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                              disabled={changeClaimInfo}
                              {...register('bankName', {
                                required: '은행사를 입력해주세요',
                                maxLength: {
                                  value: 10,
                                  message: '10자 이하 입력해 주세요.',
                                },
                                minLength: {
                                  value: 2,
                                  message: '2자 이상 입력해 주세요.',
                                },
                              })}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.bankName?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                        <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            계좌번호
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='accountNumber'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                              disabled={changeClaimInfo}
                              {...register('accountNumber', {
                                required: '계좌번호를 입력해주세요',
                                maxLength: {
                                  value: 20,
                                  message: '20자 이하 입력해 주세요.',
                                },
                                minLength: {
                                  value: 8,
                                  message: '8자 이상 입력해 주세요.',
                                },
                              })}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.accountNumber?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                        <div className='items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            예금주
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='accountHolder'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent '
                              disabled={changeClaimInfo}
                              {...register('accountHolder', {
                                required: '예금주를 입력해주세요',
                                maxLength: {
                                  value: 10,
                                  message: '10자 이하 입력해 주세요.',
                                },
                                minLength: {
                                  value: 2,
                                  message: '2자 이상 입력해 주세요.',
                                },
                              })}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.accountHolder?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen={true} as='div' className='px-4 py-6'>
            {({ open }) => (
              <>
                <h3 className='-mx-2 -my-3 flow-root'>
                  <Disclosure.Button className='flex w-full items-center justify-between  rounded-lg bg-slate-300 px-5 py-3 text-gray-200 shadow hover:bg-slate-200 hover:text-gray-700'>
                    <span className='font-medium text-slate-600'>
                      타보험사 가입
                    </span>
                    <span className='ml-6 flex items-center'>
                      {open ? (
                        <MinusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      ) : (
                        <PlusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className='pt-6'>
                  <div className='bg-white-500 shadow sm:rounded-lg'>
                    <div className='border-t border-gray-200'>
                      <dl>
                        <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            보험사
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='anotherCompanyName'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                              disabled={changeClaimInfo}
                              {...register('anotherCompanyName', {
                                required: '타보험사를 입력해주세요',
                                maxLength: {
                                  value: 10,
                                  message: '10자 이하 입력해 주세요.',
                                },
                                minLength: {
                                  value: 2,
                                  message: '2자 이상 입력해 주세요.',
                                },
                              })}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.anotherCompanyName?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                        <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            번호
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='anotherSubscribeNumber'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                              disabled={changeClaimInfo}
                              {...register('anotherSubscribeNumber', {
                                required: '번호를 입력해주세요',
                                maxLength: {
                                  value: 10,
                                  message: '숫자만 10자 이하 입력해 주세요.',
                                },
                                minLength: {
                                  value: 1,
                                  message: '숫자만 1자 이상 입력해 주세요.',
                                },
                              })}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.anotherSubscribeNumber?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen={true} as='div' className='px-4 py-6'>
            {({ open }) => (
              <>
                <h3 className='-mx-2 -my-3 flow-root'>
                  <Disclosure.Button className='flex w-full items-center justify-between  rounded-lg bg-slate-300 px-5 py-3 text-gray-200 shadow hover:bg-slate-200 hover:text-gray-700'>
                    <span className='font-medium text-slate-600'>신분증</span>
                    <span className='ml-6 flex items-center'>
                      {open ? (
                        <MinusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      ) : (
                        <PlusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className='pt-6'>
                  <div className='bg-white-500 shadow sm:rounded-lg'>
                    <div className='border-t border-gray-200'>
                      <dl>
                        <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            주민번호
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='identificationNumber'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                              disabled={changeClaimInfo}
                              {...register('identificationNumber', {
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
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.identificationNumber?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                        <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            시리얼 번호
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='serialNumber'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent'
                              disabled={changeClaimInfo}
                              {...register('serialNumber', {
                                required: '시리얼 번호를 입력해주세요',
                                maxLength: {
                                  value: 6,
                                  message: '숫자를 6자 입력해 주세요.',
                                },
                                minLength: {
                                  value: 6,
                                  message: '숫자를 6자 입력해 주세요.',
                                },
                              })}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.serialNumber?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                        <div className='items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            발급장소
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='issueBy'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent '
                              disabled={changeClaimInfo}
                              {...register('issueBy', {
                                required: '발급장소를 입력해주세요',
                                maxLength: {
                                  value: 15,
                                  message: '15자 이하 입력해 주세요.',
                                },
                                minLength: {
                                  value: 2,
                                  message: '2자 이상 입력해 주세요.',
                                },
                              })}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.issueBy?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                        <div className='items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            발급일자
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            <input
                              id='issueDate'
                              type='text'
                              className='focus:outline-hidden flex-1 rounded-sm border-none bg-blue-100 text-sm disabled:bg-transparent '
                              disabled={changeClaimInfo}
                              {...register('issueDate', {
                                pattern: {
                                  value: getRegExp('date'),
                                  message: '날짜를 10자로 입력해 주세요.',
                                },
                                maxLength: {
                                  value: 10,
                                  message: '날짜를 10자로 입력해 주세요.',
                                },
                                minLength: {
                                  value: 10,
                                  message: '날짜를 10자로 입력해 주세요.',
                                },
                              })}
                            />
                            <span className='xs:text-sm px-2 text-xs font-semibold text-red-600'>
                              {errors.issueDate?.message?.toString()}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen={true} as='div' className='px-4 py-6'>
            {({ open }) => (
              <>
                <h3 className='-mx-2 -my-3 flow-root'>
                  <Disclosure.Button className='flex w-full items-center justify-between  rounded-lg bg-slate-300 px-5 py-3 text-gray-200 shadow hover:bg-slate-200 hover:text-gray-700'>
                    <span className='font-medium text-slate-600'>피보험자</span>
                    <span className='ml-6 flex items-center'>
                      {open ? (
                        <MinusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      ) : (
                        <PlusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className='pt-6'>
                  <div className='bg-white-500 shadow sm:rounded-lg'>
                    <div className='border-t border-gray-200'>
                      <dl>
                        <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            이름
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            {claim.insured.name}
                          </dd>
                        </div>
                        <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            주민번호
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            {claim.insured.socialSecurityNumber.substring(0, 6)}
                            -{claim.insured.socialSecurityNumber.substring(6)}
                          </dd>
                        </div>
                        <div className='items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            이메일
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            {claim.insured.email}
                          </dd>
                        </div>
                        <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            전화번호
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            {claim.insured.phoneNumber.substring(0, 3)}-
                            {claim.insured.phoneNumber.substring(3, 7)}-
                            {claim.insured.phoneNumber.substring(7)}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen={true} as='div' className='px-4 py-6'>
            {({ open }) => (
              <>
                <h3 className='-mx-2 -my-3 flow-root'>
                  <Disclosure.Button className='flex w-full items-center justify-between  rounded-lg bg-slate-300 px-5 py-3 text-gray-200 shadow hover:bg-slate-200 hover:text-gray-700'>
                    <span className='font-medium text-slate-600'>수익자</span>
                    <span className='ml-6 flex items-center'>
                      {open ? (
                        <MinusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      ) : (
                        <PlusIcon
                          className='h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className='pt-6'>
                  <div className='bg-white-500 shadow sm:rounded-lg'>
                    <div className='border-t border-gray-200'>
                      <dl>
                        <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            이름
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            {claim.beneficiary.name}
                          </dd>
                        </div>
                        <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            주민번호
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            {claim.beneficiary.socialSecurityNumber.substring(
                              0,
                              6
                            )}
                            -
                            {claim.beneficiary.socialSecurityNumber.substring(
                              6
                            )}
                          </dd>
                        </div>
                        <div className='items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            이메일
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            {claim.beneficiary.email}
                          </dd>
                        </div>
                        <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            전화번호
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            {claim.beneficiary.phoneNumber.substring(0, 3)}-
                            {claim.beneficiary.phoneNumber.substring(3, 7)}-
                            {claim.beneficiary.phoneNumber.substring(7)}
                          </dd>
                        </div>
                        <div className='items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                          <dt className='text-sm font-medium text-gray-600'>
                            주소
                          </dt>
                          <dd className='mt-1 pl-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                            {claim.beneficiary.address}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* 연관 계약 */}
          <section className='flex flex-col space-y-2'>
            <Title text={`"${claim.beneficiary.name}"님의 다른 계약들`} />
            <RelatedClaims claimIdx='claim.id' />
          </section>

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
                              청구 삭제
                            </Dialog.Title>
                            <div className='mt-2'>
                              <p className='text-sm text-gray-700'>
                                정말 청구를 삭제하겠습니까? 더이상 되돌릴수
                                없습니다!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                          type='button'
                          className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white-500 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                          onClick={() => onClickDeleteClaim()}
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
        </form>
      </article>
    </>
  );
};

export default Claim;

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  const claimIdx = Number(context.params?.id);

  try {
    // 현재 청구
    const {
      data: { contents: claims },
    } = await apiService.claimService.apiGetClaims({ email: 'kim@test.com' });

    // 현재 상품과 연관된 청구들 ( 같은 청구자를 가진 청구들 )
    const relatedClaimsPromise =
      await apiService.claimService.apiGetClaimsByEmail({
        email: claims[claimIdx].beneficiary.email,
      });

    // 병렬 처리
    const [
      {
        data: { contents: relatedClaims },
      },
    ] = await Promise.all([relatedClaimsPromise]);

    return { props: { claim: claims[0], relatedClaims } };
  } catch (error) {
    console.error('getStaticProps claim/[id] >> ', error);

    return { props: { claim: null, relatedClaims: [] } };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
