import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useMemo } from 'react';

import getScrollAnimation from '@/lib/getScrollAnimation';

import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';

type Props = {
  onFeatureClick: any;
};

const Hero = ({ onFeatureClick }: Props) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <div className='py-20'>
      <ScrollAnimationWrapper>
        <motion.div
          className='container mx-auto mb-6 flex flex-col space-y-6 px-6 py-4 lg:h-[32rem] lg:flex-row lg:items-center'
          variants={scrollAnimation}
        >
          <div className='w-full lg:w-1/2'>
            <div className='mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md lg:text-left'>
              <h2 className='mb-4 text-3xl font-bold lg:text-5xl'>
                AI 계장님을 통한
                <br />
                <span className='leading-relaxeds text-5xl text-indigo-500'>
                  더 편안한 서류처리
                  <br />
                </span>
                경험해 보세요!
                <br />
              </h2>

              <p className='visible mx-0 mt-3 mb-0 text-sm leading-relaxed  text-slate-400'>
                눈으로 일일히 청구서를 찾아 볼 필요가 없습니다!
                <br />
                AI가 알아서 서류를 내용을 인식하여 당신의 시간을 아껴줍니다.
              </p>
            </div>

            <div className='text-center lg:text-left'>
              <button className='visible mb-4 block w-full cursor-pointer rounded bg-indigo-500 py-4 px-8 text-xs font-semibold leading-none tracking-wide text-white-500 sm:mr-3 sm:mb-0 sm:inline-block sm:w-[9rem]'>
                시작해볼까요!
              </button>

              <button
                className='visible block w-full cursor-pointer rounded border border-solid border-slate-200 bg-white-300 py-4 px-8 text-xs font-semibold leading-none text-slate-500 sm:inline-block sm:w-[8rem]'
                onClick={() => onFeatureClick()}
              >
                작동 원리
              </button>
            </div>
          </div>

          <div className='flex h-96 w-full items-center justify-center lg:w-1/2'>
            <motion.div
              className='flex items-center justify-center'
              variants={scrollAnimation}
            >
              <Image
                src='/assets/Hero.png'
                alt='Hero'
                quality={100}
                width={550}
                height={400}
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Hero;
