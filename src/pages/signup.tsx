import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getRegExp } from '@/lib';

import apiService from '@/api';

const Form = dynamic(() => import('@/components/common//Form'), {
  suspense: true,
});
const Input = dynamic(() => import('@/components/common/Input'), {
  suspense: true,
});
const Checkbox = dynamic(() => import('@/components/common/Checkbox'), {
  suspense: true,
});
const Button = dynamic(() => import('@/components/common/Button'), {
  suspense: true,
});
const SelectButton = dynamic(() => import('@/components/Main/SelectButton'), {
  suspense: true,
});
const Modal = dynamic(() => import('@/components/common/Modal'), {
  suspense: true,
});

import { AxiosError } from 'axios';
import type { NextPage } from 'next';

import Seo from '@/components/common/Seo';

import type { ApiSignUpBody } from '@/types';

type SignUpForm = Omit<ApiSignUpBody, 'role'> & {
  passwordConfirm: string;
  photo?: FileList | null;
  role: boolean;
};

const SignUp: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpForm>();

  const [isRoleSelect, setIsRoleSelect] = useState([true, false]);
  const roleArr = ['수익자', '담당자'];

  // 회원가입 요청
  const onSubmit = useCallback(
    async (body: SignUpForm) => {
      const toastId = toast.loading('회원가입중입니다.');

      try {
        const { id, email, name, password, phone } = body;

        const {
          data: { message },
        } = await apiService.authService.apiSignUp({
          id,
          email,
          name,
          password,
          phone,
          role: isRoleSelect[0] ? 'beneficiary' : 'manager',
        });

        toast.update(toastId, {
          render: message,
          type: 'success',
          isLoading: false,
          autoClose: 1500,
        });

        router.push('/login');
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
    [router, isRoleSelect]
  );

  const handleClick = (idx: number) => {
    const newArr = Array(roleArr.length).fill(false);
    newArr[idx] = true;
    setIsRoleSelect(newArr);
  };

  // 비밀번호 확인과 비교를 위함
  const password = useRef<string | null>(null);
  password.current = watch('password', '');

  return (
    <>
      <Seo
        title='AI 계장님 - 회원가입'
        description='AI 계장님을 이용해보세요!'
      />
      <article className='container mx-auto justify-center space-y-4 px-6 py-24 md:w-[38rem]'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h4 className='text-gray-700'>계정의 종류를 골라주세요</h4>
          <div className='mt-3 md:-mx-2 md:flex md:items-center'>
            {roleArr.map((elm, index) => (
              <SelectButton
                key={index}
                isSelected={isRoleSelect[index]}
                handleClick={handleClick}
                elementIndex={index}
                content={elm}
              />
            ))}
          </div>
          <Input
            type='text'
            name='이메일'
            placeholder='이메일을 입력해주세요.  ex)email@naver.com'
            register={register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: getRegExp('email'),
                message: '이메일 형식에 맞게 입력해 주세요.',
              },
            })}
            errorMessage={errors.email?.message?.toString()}
            className='w-full min-w-[200px] max-w-[600px]'
          />
          <Input
            type='password'
            name='비밀번호'
            placeholder='비밀번호를 입력해주세요.'
            register={register('password', {
              required: '비밀번호를 입력해주세요',
              pattern: {
                value: getRegExp('password'),
                message:
                  '숫자와 영어가 최소 한 글자 이상 포함되고, 최소 8자리여야 합니다.',
              },
            })}
            errorMessage={errors.password?.message?.toString()}
            className='w-full min-w-[200px] max-w-[600px]'
          />
          <Input
            type='password'
            name='비밀번호 확인'
            placeholder='비밀번호를 다시 입력해주세요.'
            register={register('passwordConfirm', {
              required: '비밀번호를 다시 입력해주세요.',
              validate: (value) =>
                value === password.current || '비밀번호가 일치하지 않습니다.',
            })}
            errorMessage={errors.passwordConfirm?.message}
            className='w-full min-w-[200px] max-w-[600px]'
          />
          <Input
            type='text'
            name='이름'
            placeholder='이름를 입력해주세요.'
            register={register('name', {
              required: '이름를 입력해주세요',
              maxLength: {
                value: 20,
                message: '20자 이내로 입력해주세요.',
              },
            })}
            errorMessage={errors.name?.message?.toString()}
            className='w-full min-w-[200px] max-w-[600px]'
          />

          <Button
            type='submit'
            text='회원가입'
            className='mb-4 w-full min-w-[200px] max-w-[600px]'
            primary
          />
        </Form>
      </article>
    </>
  );
};

export default SignUp;
