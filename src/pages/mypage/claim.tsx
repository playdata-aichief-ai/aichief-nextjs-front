import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import apiService from '@/api';
import atomService from '@/atoms';

const Icon = dynamic(() => import('@/components/common/Icon'), {
  suspense: true,
});

import type { NextPage } from 'next';
import Link from 'next/link';

import Seo from '@/components/common/Seo';

const Claims: NextPage = () => {
  const { data } = useSession();
  const user = data?.user?.email;

  const [claims, setClaims] = useRecoilState(
    atomService.claimsService.claimsState
  );

  useEffect(() => {
    (async () => {
      try {
        let claims: any[] = [];

        const { data } = await apiService.claimService.apiGetClaims({
          email: 'kim@test.com',
        });

        claims = data.contents;

        setClaims(claims);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [setClaims]);

  return (
    <>
      <Seo
        title='AI 계장님 - 청구'
        description='당신이 등록한 청구을 확인하세요!'
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
                  청구조회
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
            {claims.length === 0 ? (
              <h6 className='font-bolder text-center text-lg text-red-500'>
                청구가 존재하지 않습니다.
              </h6>
            ) : (
              <div>
                <div className='-mx-4 overflow-x-auto px-4 sm:-mx-8 sm:px-8'>
                  <div className='inline-block min-w-full overflow-hidden rounded-lg shadow'>
                    <table className='min-w-full leading-normal'>
                      <thead>
                        <tr>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            청구자
                          </th>
                          <th className='hidden border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 md:block'>
                            청구자 이메일
                          </th>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            피보험자
                          </th>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            보험사
                          </th>
                          <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                            청구 신청일자
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {claims.map((claim, i) => (
                          <Link href={`/claim/${i}`}>
                            <tr key={i} className='hover:bg-gray-300'>
                              <td className='bg-white border-b border-gray-200 px-5 py-5 text-xs'>
                                <div className='flex items-center'>
                                  <p className='whitespace-no-wrap text-gray-900'>
                                    {claim.beneficiary.name}
                                  </p>
                                </div>
                              </td>
                              <td className='bg-white hidden border-b border-gray-200 px-5 py-5 text-xs md:block'>
                                <p className='whitespace-no-wrap text-gray-900'>
                                  {claim.beneficiary.email}
                                </p>
                              </td>
                              <td className='bg-white border-b border-gray-200 px-5 py-5 text-xs'>
                                <p className='whitespace-no-wrap text-gray-900'>
                                  {claim.insured.name}
                                </p>
                              </td>
                              <td className='bg-white border-b border-gray-200 px-5 py-5 text-xs'>
                                <p className='whitespace-no-wrap text-gray-900'>
                                  {claim.insurance.companyName}
                                </p>
                              </td>
                              <td className='bg-white border-b border-gray-200 px-5 py-5 text-xs'>
                                <p className='whitespace-no-wrap text-gray-900'>
                                  {claim.claim.date}
                                </p>
                              </td>
                            </tr>
                          </Link>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default Claims;
