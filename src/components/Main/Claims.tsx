import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import apiService from '@/api';
import atomService from '@/atoms';

type Props = {
  searchWord?: string;
};

const Claims = ({ searchWord }: Props) => {
  const { data } = useSession();

  const [claims, setClaims] = useRecoilState(
    atomService.claimsService.claimsState
  );
  const filter = useRecoilValue(atomService.filterService.filterState);

  useEffect(() => {
    (async () => {
      try {
        if (data?.user?.email === null || data?.user?.email === undefined)
          return;
        let claims: any[] = [];

        // 특정 계약들 검색
        if (searchWord) {
          const response = await apiService.claimService.apiGetClaimsByKeyword({
            email: data.user.email,
            filter,
            keyword: searchWord,
          });

          claims = response.data.contents;
        }
        // 모든 계약들 검색 ( 카테고리, 필터는 예외 )
        else {
          const response = await apiService.claimService.apiGetClaims({
            email: data?.user?.email,
          });

          claims = response.data.contents;
        }

        setClaims(claims);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [searchWord, setClaims, filter, searchWord]);

  return (
    <>
      {claims.length === 0 ? (
        <h6 className='font-bolder text-center text-lg text-red-500'>
          찾으시는 청구가 없습니다.
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
                    {/* <th className='border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600'>
                      청구 진행 상태
                    </th> */}
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

                        {/* <td className='bg-white border-b border-gray-200 px-5 py-5 text-sm'>
                          {claim.status === 'sucess' ? (
                            <span className='relative inline-block px-3 py-1 font-semibold leading-tight text-green-900'>
                              <span
                                aria-hidden
                                className='absolute inset-0 rounded-full bg-green-200 opacity-50'
                              ></span>
                              <span className='relative'>청구 완료</span>
                            </span>
                          ) : (
                            <span className='relative inline-block px-3 py-1 font-semibold leading-tight text-blue-900'>
                              <span
                                aria-hidden
                                className='absolute inset-0 rounded-full bg-blue-200 opacity-50'
                              ></span>
                              <span className='relative'>청구 진행 중</span>
                            </span>
                          )}
                        </td> */}
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Claims);
