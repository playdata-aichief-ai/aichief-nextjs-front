import Link from 'next/link';
import React from 'react';
import { useRecoilState } from 'recoil';

import stateService from '@/atoms';

import type { LIMIT } from '@/types';

const limit: LIMIT = 15;

type Props = {
  claimIdx: string;
};

const RelatedClaims = ({ claimIdx }: Props) => {
  const [relatedClaims, setRelatedClaims] = useRecoilState(
    stateService.relatedClaimService.relatedClaimsState
  );

  return (
    <>
      {relatedClaims.length === 0 ? (
        <h6 className='font-bolder text-center text-lg text-red-500'>
          청구인의 다른 청구가 없습니다.
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
                  {relatedClaims.map((claim, i) => (
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

export default React.memo(RelatedClaims);
