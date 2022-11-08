import { RiAlarmWarningFill } from 'react-icons/ri';

import Seo from '@/components/common/Seo';
import ArrowLink from '@/components/links/ArrowLink';

const NotLoggedIn = () => {
  return (
    <>
      <Seo
        title='AI 계장님 - 401'
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
              {'로그인하지 않으면 접근할 수 없는 페이지입니다.' +
                '\n로그인후에 접근해주세요!'}
            </h1>
            <ArrowLink className='mt-4 md:text-lg' href='/login'>
              로그인 페이지로 이동
            </ArrowLink>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotLoggedIn;
