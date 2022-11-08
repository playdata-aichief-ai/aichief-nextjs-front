import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import { combineClassNames } from '@/lib';

import Spinner from '@/components/common/Spinner';

type Props = {
  type: 'button' | 'submit';
  text: string;
  className?: string;
  primary?: boolean;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  type,
  text,
  className,
  primary,
  loading,
  onClick,
  disabled,
}: Props) => {
  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (typeof onClick === 'function') onClick();

      if (!loading) return;

      e.preventDefault();
      toast.warning('처리중입니다. 잠시 기다려주세요!');
    },
    [loading, onClick]
  );

  return (
    <button
      type={type}
      disabled={disabled}
      className={combineClassNames(
        primary
          ? 'group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  disabled:bg-gray-600'
          : '',
        className ? className : ''
      )}
      onClick={onClickButton}
    >
      {loading ? (
        <React.Suspense fallback={<span>Loading...</span>}>
          <Spinner kinds='button' />
        </React.Suspense>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
