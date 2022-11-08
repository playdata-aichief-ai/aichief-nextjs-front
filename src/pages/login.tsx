import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Seo = dynamic(() => import('@/components/common/Seo'), {
  suspense: true,
});
const Icon = dynamic(() => import('@/components/common/Icon'), {
  suspense: true,
});
const Form = dynamic(() => import('@/components/common/Form'), {
  suspense: true,
});
const Input = dynamic(() => import('@/components/common/Input'), {
  suspense: true,
});
const Button = dynamic(() => import('@/components/common/Button'), {
  suspense: true,
});

import { AxiosError } from 'axios';
import type { NextPage } from 'next';

import type { ApiLogInBody } from '@/types';

const LogIn: NextPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ApiLogInBody>();

  // 로그인 요청
  const onSubmit = useCallback(
    async (body: ApiLogInBody) => {
      const toastId = toast.loading('로그인중입니다.');

      try {
        const result = await signIn('credentials', {
          redirect: false,
          ...body,
        });

        if (result?.error)
          return toast.update(toastId, {
            render: result.error,
            type: 'error',
            isLoading: false,
            autoClose: 1500,
          });

        toast.update(toastId, {
          render: '로그인 성공. 메인 페이지로 이동합니다.',
          type: 'success',
          isLoading: false,
          autoClose: 1500,
        });
        router.push('/');
      } catch (error) {
        console.error(error);

        if (error instanceof AxiosError) {
          toast.update(toastId, {
            render: error.response?.data.message,
            type: 'error',
            isLoading: false,
            autoClose: 1500,
          });
        } else {
          toast.update(toastId, {
            render: '알 수 없는 에러가 발생했습니다.',
            type: 'error',
            isLoading: false,
            autoClose: 1500,
          });
        }
      }
    },
    [router]
  );

  return (
    <>
      <Seo
        title='AI 계장님 - 로그인'
        description='AI 계장님에 로그인하여 사용하세요'
      />
      <div className='relative flex min-h-screen'>
        <div className='bg-white flex min-w-0 flex-auto flex-col items-center py-16 sm:flex-row sm:justify-center md:items-start md:justify-start'>
          <div
            className='text-white relative hidden h-full w-1/2 flex-auto items-center justify-center overflow-hidden bg-purple-900 bg-cover bg-no-repeat p-10 md:flex'
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80);`,
            }}
          >
            <div className='absolute inset-0 z-0 bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75'></div>
            <div className='z-10  w-full max-w-md'>
              <div className='mb-6 font-bold leading-tight text-gray-300 sm:text-4xl xl:text-5xl'>
                AI계장님과 함께 하세요
              </div>
            </div>

            <ul className='circles'>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className='bg-white w-full p-8 sm:w-auto sm:rounded-lg md:flex md:h-full md:items-center  md:justify-center md:rounded-none md:p-10 lg:w-1/2 lg:p-14'>
            <div className='mx-auto w-full max-w-md space-y-8'>
              <div>
                <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                  로그인
                </h2>
                <p className='mt-2 text-center text-sm text-gray-600'>
                  계정이 없으시다면{' '}
                  <a
                    onClick={() => router.push('/signup')}
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    회원가입을 하러갑시다!
                  </a>
                </p>
              </div>
              <div className='flex flex-row items-center justify-center space-x-3'>
                <a
                  onClick={() => signIn('google')}
                  className='inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-blue-400  text-lg font-bold transition duration-300 ease-in hover:shadow-lg'
                >
                  <Icon shape='google' className='h-6 w-6' />
                </a>
                <a
                  onClick={() => signIn('naver')}
                  className='inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-gray-200  text-lg font-bold transition duration-300 ease-in hover:shadow-lg'
                >
                  <Icon shape='naver' className='h-6 w-6' />
                </a>
                <a
                  onClick={() => signIn('kakao')}
                  className='inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-yellow-400  text-lg font-bold transition duration-300 ease-in hover:shadow-lg'
                >
                  <Icon shape='kakao' className='h-6 w-6' />
                </a>
              </div>
              <div className='flex items-center justify-center space-x-2'>
                <span className='h-px w-20 bg-gray-200'></span>
                <span className='font-normal text-gray-300'>or</span>
                <span className='h-px w-20 bg-gray-200'></span>
              </div>
              <Form
                className='mt-8 space-y-6'
                onSubmit={handleSubmit(onSubmit)}
              >
                <input type='hidden' name='remember' defaultValue='true' />
                <div className='-space-y-px rounded-md shadow-sm'>
                  <Input
                    name='이메일'
                    type='text'
                    register={register('email', {
                      required: '이메일를 입력해주세요',
                    })}
                    placeholder='이메일를 입력하세요.'
                    errorMessage={errors.email?.message}
                    className='rounded-t-md'
                    hiddenLabel
                  />
                  <Input
                    name='비밀번호'
                    type='password'
                    register={register('password', {
                      required: '비밀번호를 입력해주세요!',
                    })}
                    placeholder='비밀번호를 입력하세요.'
                    errorMessage={errors.password?.message}
                    className='rounded-b-md'
                    hiddenLabel
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember-me'
                      name='remember-me'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                    />
                    <label
                      htmlFor='remember-me'
                      className='ml-2 block text-sm text-gray-900'
                    >
                      아이디 기억
                    </label>
                  </div>

                  <div className='flex text-sm'>
                    <a
                      href='#'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      비밀번호가 기억나지않으신가요?
                    </a>
                  </div>
                </div>

                <Button type='submit' text='로그인' primary />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
