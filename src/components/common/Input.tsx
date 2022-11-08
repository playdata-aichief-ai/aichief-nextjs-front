import type { UseFormRegisterReturn } from 'react-hook-form';

import { combineClassNames } from '@/lib';

import ErrorMessage from './ErrorMessage';
import Label from './Label';

type Props = {
  name: string;
  type: 'text' | 'password' | 'number' | 'search';
  register: UseFormRegisterReturn;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  hiddenLabel?: boolean;
  hiddenMessage?: boolean;
  className?: string;
};

const Input = ({
  name,
  type,
  register,
  placeholder,
  errorMessage,
  disabled,
  onFocus,
  onBlur,
  hiddenLabel,
  hiddenMessage,
  className,
}: Props) => {
  return (
    <>
      {hiddenLabel || <Label name={name} />}

      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register}
        className={combineClassNames(
          'block w-full appearance-none border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
          className ? className : ''
        )}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {hiddenMessage || <ErrorMessage errorMessage={errorMessage} />}
    </>
  );
};

export default Input;
