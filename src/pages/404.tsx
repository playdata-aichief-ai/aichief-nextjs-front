import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Seo from '@/components/common/Seo';
import ArrowLink from '@/components/links/ArrowLink';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title='AI 계장님 - 404'
        description='찾으시는 페이지가 존재하지 않습니다.'
      />

      <main>
        <section className='bg-white'>
          <div className='layout text-black flex min-h-screen flex-col items-center justify-center text-center'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>
              404) 페이지를 찾을 수 없습니다!
            </h1>
            <ArrowLink className='mt-4 md:text-lg' href='/'>
              홈페이지로 돌아가기
            </ArrowLink>
          </div>
        </section>
      </main>
    </>
  );
}
