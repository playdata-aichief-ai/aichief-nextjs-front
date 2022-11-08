import dynamic from 'next/dynamic';
import React, { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';

import atomService from '@/atoms';

const Modal = dynamic(() => import('@/components/common/Modal'), {
  suspense: true,
});

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  currentIdx: number;
};

const ClaimantDetail = ({ setShowModal, currentIdx }: Props) => {
  const claimants = useRecoilValue(atomService.claimantsService.claimantsState);

  return (
    <Modal
      onCloseModal={() => setShowModal(false)}
      className='max-h-[500px] min-h-[400px] min-w-[400px] max-w-[800px] border border-indigo-600 shadow-lg'
    >
      <div className='bg-white-500 shadow sm:rounded-lg'>
        <div className='flex items-center justify-between px-4 py-5 sm:px-6'>
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              청구자 정보
            </h3>
          </div>
        </div>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>이름</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].name}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>주민번호</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].socialSecurityNumber}
              </dd>
            </div>
            <div className='items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>이메일</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].email}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>전화번호</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].phoneNumber}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>
                자택 전화번호
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].landline}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>주소</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].address}
              </dd>
            </div>

            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>직장</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].job}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>
                피보험자와 관계
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].relationship}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>
                타사 가입 여부
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].another_subscribe}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>계좌 회사</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].bank_name}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>계좌 번호</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].account_number}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>예금주</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {claimants[currentIdx].account_holder}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimantDetail;
