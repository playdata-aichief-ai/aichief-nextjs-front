import { useRouter } from 'next/router';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Seo from '@/components/common/Seo';
import ArrowLink from '@/components/links/ArrowLink';

type Props = {
  message: string;
};

const MyError = ({ message }: Props) => {
  const router = useRouter();

  return (
    <>
      <Seo
        title='AI 계장님 - 403'
        description='접근할 수 있는 권한이 없는 페이지입니다.'
      />

      <main>
        <section className='bg-white'>
          <div className='layout text-black flex min-h-screen flex-col items-center justify-center text-center'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>{message}</h1>
            <section className='mt-10 flex flex-col items-center space-y-2'>
              <ArrowLink
                className='mt-4 md:text-lg'
                href='#'
                onClick={() => router.reload()}
              >
                새로고침
              </ArrowLink>
              <ArrowLink className='mt-4 md:text-lg' href='/'>
                홈페이지로 돌아가기
              </ArrowLink>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default MyError;
