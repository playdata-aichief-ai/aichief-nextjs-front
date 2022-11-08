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

const ContractDetail = ({ setShowModal, currentIdx }: Props) => {
  const contracts = useRecoilValue(atomService.contractsService.contractsState);

  return (
    <Modal
      onCloseModal={() => setShowModal(false)}
      className='max-h-[500px] min-h-[400px] min-w-[400px] max-w-[800px] border border-indigo-600 shadow-lg'
    >
      <div className='bg-white-500 shadow sm:rounded-lg'>
        <div className='flex items-center justify-between px-4 py-5 sm:px-6'>
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              피보험자 정보
            </h3>
          </div>
        </div>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>이름</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {contracts[currentIdx].insured.name}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>이메일</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {contracts[currentIdx].insured.email}
              </dd>
            </div>
            <div className='items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>전화번호</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {contracts[currentIdx].insured.phoneNumber.substring(0, 3)}-
                {contracts[currentIdx].insured.phoneNumber.substring(3, 7)}-
                {contracts[currentIdx].insured.phoneNumber.substring(7)}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>주민번호</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {contracts[currentIdx].insured.socialSecurityNumber.substring(
                  0,
                  6
                )}
                -
                {contracts[currentIdx].insured.socialSecurityNumber.substring(
                  7
                )}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>직업</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {contracts[currentIdx].insured.job}
              </dd>
            </div>
            <div className='bg-white-500 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>가입날짜</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {contracts[currentIdx].insured.joinDate}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Modal>
  );
};

export default ContractDetail;
