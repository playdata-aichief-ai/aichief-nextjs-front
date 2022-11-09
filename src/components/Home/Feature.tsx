import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useMemo } from 'react';

import getScrollAnimation from '@/lib/getScrollAnimation';

import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';

const features = [
  '영역검출을 이용한 글씨 분리!',
  '초해상화를 이용하여 선명하게!',
  'OCR를 이용한 손글씨 인식!',
  '자동으로 완성되는 청구 작업!',
];

const Feature = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className='bg-gray-100 py-14 dark:bg-gray-800'>
      <div
        className='mx-auto mt-8 mb-6 max-w-screen-xl px-6 sm:mt-14 sm:mb-14 sm:px-8 lg:px-16'
        id='feature'
      >
        <div className='p y-8 my-12 grid grid-flow-row grid-cols-1 gap-8  sm:grid-flow-col sm:grid-cols-2'>
          <ScrollAnimationWrapper className='flex w-full justify-end'>
            <motion.div
              className='h-full w-full p-4'
              variants={scrollAnimation}
            >
              <Image
                src='/assets/Illustration.png'
                alt='Illustrasi'
                layout='responsive'
                quality={100}
                height={414}
                width={508}
              />
            </motion.div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <motion.ul
              className='ml-auto flex w-full flex-col  items-center justify-center sm:w-9/12 sm:items-end'
              variants={scrollAnimation}
            >
              <h3 className='text-3xl font-medium leading-relaxed text-black-600 dark:text-white-300 lg:text-4xl'>
                우리 AI계장님이 일하는 방법!
              </h3>
              <p className='my-2 text-black-500 dark:text-gray-400'>
                저희가 제공하는 해당 기능을 통해 서류 처리가 더욱 편리해집니다.
              </p>
              <div className='mx-auto list-inside self-start text-black-500 dark:text-gray-400 sm:ml-8'>
                {features.map((feature, index) => (
                  <motion.li
                    className='circle-check custom-list relative flex'
                    custom={{ duration: 2 + index }}
                    variants={scrollAnimation}
                    key={feature}
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        duration: 0.2,
                      },
                    }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </div>
            </motion.ul>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default Feature;
