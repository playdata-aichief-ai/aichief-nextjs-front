import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import apiService from '@/api';
import atomService from '@/atoms';

const Seo = dynamic(() => import('@/components/common/Seo'), {
  suspense: true,
});

const SearchBar = dynamic(() => import('@/components/Main/SearchBar'), {
  suspense: true,
});

const Title = dynamic(() => import('@/components/common/Title'), {
  suspense: true,
});

const Claims = dynamic(() => import('@/components/Main/Claims'), {
  suspense: true,
});

const NotLoggedIn = dynamic(() => import('@/components/common/401'), {
  suspense: true,
});

const NotAuth = dynamic(() => import('@/components/common/403'), {
  suspense: true,
});

import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';

type Props = {
  claims: any[];
};

const Search: NextPage<Props> = ({ claims }) => {
  const router = useRouter();
  const { data } = useSession();

  const setClaims = useSetRecoilState(atomService.claimsService.claimsState);

  // getServerSideProps에서 받아온 필터들, 청구들 recoil에 초기화
  useEffect(() => {
    setClaims(claims);
  }, [setClaims, claims]);

  // 로그인 유무 확인
  if (!data) return <NotLoggedIn />;
  if (!data.user) return <NotLoggedIn />;
  // 권한이 있는지 확인
  if (data.user.role !== 'manager') return <NotAuth />;

  return (
    <>
      <Seo
        title='AI 계장님 - 청구서 검색'
        description='청구자의 청구를 검색해보세요!'
      />
      <article className='container mx-auto max-w-[64rem] justify-center space-y-4 px-6 py-24 lg:h-[64rem]'>
        {/* 검색창과 카테고리 */}
        <div className='pb-10'>
          <Title text='청구 검색' />
          <SearchBar />
        </div>

        <div className='pb-2'>
          <Title
            text={`${
              router.query.searchWord
                ? '"' + router.query.searchWord + '"'
                : '모든 청구'
            } 검색 결과`}
          />
        </div>

        <Claims searchWord={router.query.searchWord as string} />
      </article>
    </>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  try {
    const claimsPromise = apiService.claimService.apiGetClaims({
      email: session?.user?.email,
    });

    const [
      {
        data: { contents: claims },
      },
    ] = await Promise.all([claimsPromise]);

    return {
      props: {
        claims,
      },
    };
  } catch (error) {
    console.error('getServerSideProps search >> ', error);

    return {
      props: {
        claims: [],
      },
    };
  }
};
