import { RiAlarmWarningFill } from 'react-icons/ri';

import Seo from '@/components/common/Seo';
import ArrowLink from '@/components/links/ArrowLink';

const NotAuth = () => {
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
            <h1 className='mt-8 whitespace-pre-line text-center text-4xl md:text-6xl'>
              {
                '403) 접근할 수 있는 권한이 없는 페이지입니다.\n다른 페이지로 이동해주세요!'
              }
            </h1>
            <ArrowLink className='mt-4 md:text-lg' href='/'>
              홈페이지로 돌아가기
            </ArrowLink>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotAuth;
