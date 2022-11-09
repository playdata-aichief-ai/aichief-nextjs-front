import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import apiService from '@/api';
import atomService from '@/atoms';

const Icon = dynamic(() => import('@/components/common/Icon'), {
  suspense: true,
});
const ClaimantDetail = dynamic(
  () => import('@/components/Main/ClaimantDetail'),
  {
    suspense: true,
  }
);

import type { NextPage } from 'next';

import Seo from '@/components/common/Seo';

const Claimants: NextPage = () => {
  const { data } = useSession();
  const user = data?.user;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [claimants, setClaimants] = useRecoilState(
    atomService.claimantsService.claimantsState
  );

  useEffect(() => {
    (async () => {
      try {
        let claimants: any[] = [];
        if (!(typeof user?.email === 'string')) return;

        const { data } = await apiService.claimantService.apiGetClaimants({
          // email: encodeURI(user),
          email: 'kim@test.com',
        });

        claimants = data.contents;

        setClaimants(claimants);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [setClaimants]);

  return (
    <>
      <Seo
        title='AI 계장님 - 청구자'
        description='담당하는 청구자를 확인하세요!'
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
                  고객조회
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div className='overflow-hidden pt-12'>
          <div className='bg-white w-full rounded-md'>
            <div className=' flex items-center justify-between pb-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center bg-gray-50'>
                  {/* <SearchBar setSearchWord={setSearchWord} /> */}
                </div>
              </div>
            </div>
            {claimants.length === 0 ? (
              <h6 className='font-bolder text-center text-lg text-red-500'>
                담당하신 청구자가 존재하지 않습니다.
              </h6>
            ) : (
              <div>
                <div className='-mx-4 overflow-x-auto px-4 sm:-mx-8 sm:px-8'>
                  <div className='inline-block min-w-full overflow-hidden rounded-lg shadow'>
                    <table className='min-w-full leading-normal'>
                      <thead>
                        <tr>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            이름
                          </th>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            이메일
                          </th>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            전화번호
                          </th>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            주민등록번호
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {claimants.map((claimant, i) => (
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
                                  {claimant.name}
                                </p>
                              </div>
                            </td>
                            <td className='bg-white border-b border-gray-200 px-5 py-5 text-xs'>
                              <p className='whitespace-no-wrap text-gray-900'>
                                {claimant.email}
                              </p>
                            </td>
                            <td className='bg-white border-b border-gray-200 px-5 py-5 text-xs'>
                              <p className='whitespace-no-wrap text-gray-900'>
                                {claimant.phoneNumber}
                              </p>
                            </td>
                            <td className='bg-white border-b border-gray-200 px-5 py-5 text-xs'>
                              <p className='whitespace-no-wrap text-gray-900'>
                                {claimant.socialSecurityNumber}
                              </p>
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
            <ClaimantDetail
              setShowModal={setShowModal}
              currentIdx={currentIdx}
            />
          )}
        </div>
      </article>
    </>
  );
};

export default Claimants;
