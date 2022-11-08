import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import apiService from '@/api';
import atomService from '@/atoms';

const Seo = dynamic(() => import('@/components/common/Seo'), {
  suspense: true,
});
const Icon = dynamic(() => import('@/components/common/Icon'), {
  suspense: true,
});
const ContractDetail = dynamic(
  () => import('@/components/Main/ContractDetail'),
  {
    suspense: true,
  }
);

import type { NextPage } from 'next';

const Contracts: NextPage = () => {
  const { data } = useSession();
  const user = data?.user?.email;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [contracts, setContracts] = useRecoilState(
    atomService.contractsService.contractsState
  );

  useEffect(() => {
    (async () => {
      try {
        let contracts: any[] = [];

        const { data } = await apiService.contractService.apiGetContracts({
          // email: encodeURI(user),
          email: 'park@test.com',
        });

        contracts = data.contents;

        setContracts(contracts);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [setContracts]);

  return (
    <>
      <Seo title='AI 계장님 - 계약' description='당신의 계약을 확인하세요!' />
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
                  계약 조회
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div className='overflow-hidden pt-12'>
          <div className='bg-white w-full rounded-md'>
            <div className=' flex items-center justify-between pb-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center bg-gray-50'></div>
              </div>
            </div>
            {contracts.length === 0 ? (
              <h6 className='font-bolder text-center text-lg text-red-500'>
                가입한 계약이 존재하지 않습니다.
              </h6>
            ) : (
              <div>
                <div className='-mx-4 overflow-x-auto px-4 sm:-mx-8 sm:px-8'>
                  <div className='inline-block min-w-full overflow-hidden rounded-lg shadow'>
                    <table className='min-w-full leading-normal'>
                      <thead>
                        <tr>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            보험사
                          </th>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            보험명
                          </th>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            피보험자
                          </th>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            월 납부금
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {contracts.map((contract, i) => (
                          <tr
                            key={i}
                            onClick={() => {
                              setShowModal(true);
                              setCurrentIdx(i);
                            }}
                            className='hover:bg-gray-300'
                          >
                            <td className='bg-white border-b border-gray-200 px-5 py-5 text-xs'>
                              <div className='flex items-center'>
                                <p className='whitespace-no-wrap text-gray-900'>
                                  {contract.insurance.companyName}
                                </p>
                              </div>
                            </td>
                            <td className='bg-white border-b border-gray-200 px-5 py-5 text-xs'>
                              <div className='flex items-center'>
                                <p className='whitespace-no-wrap text-gray-900'>
                                  {contract.insurance.details}
                                </p>
                              </div>
                            </td>
                            <td className='bg-white border-b border-gray-200 px-5 py-5 text-xs'>
                              <div className='flex items-center'>
                                <p className='whitespace-no-wrap text-gray-900'>
                                  {contract.insured.name}
                                </p>
                              </div>
                            </td>
                            <td className='bg-white border-b border-gray-200 px-5 py-5 text-xs'>
                              <div className='flex items-center'>
                                <p className='whitespace-no-wrap text-gray-900'>
                                  {contract.contract.monthlyPremium}만원
                                </p>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          {showModal && (
            <ContractDetail
              setShowModal={setShowModal}
              currentIdx={currentIdx}
            />
          )}
        </div>
      </article>
    </>
  );
};

export default Contracts;
