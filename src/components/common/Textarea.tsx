import { useCallback, useRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { combineClassNames } from '@/lib';

import ErrorMessage from './ErrorMessage';
import Label from './Label';

type Props = {
  name: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  hiddenLabel?: boolean;
  className?: string;
};

const Textarea = ({
  name,
  register,
  placeholder,
  errorMessage,
  disabled,
  hiddenLabel,
  className,
}: Props) => {
  // register에서 ref 떼내기
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref, ...restRegister } = register;

  // textarea 리사이징
  const handleResizeHeight = useCallback(() => {
    if (!textRef.current) return;

    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current?.scrollHeight + 4 + 'px';
  }, []);

  return (
    <>
      {hiddenLabel || <Label name={name} />}

      <textarea
        id={name}
        rows={10}
        placeholder={placeholder}
        {...restRegister}
        className={combineClassNames(
          'xs:px-4 xs:text-base xs:placeholder:text-xs w-full min-w-[200px] max-w-[600px] resize-none rounded-sm border-2 border-gray-200 px-2 py-2 text-xs font-semibold placeholder:text-[8px] focus:border-blue-400 focus:outline-none',
          className ? className : ''
        )}
        disabled={disabled}
        ref={(e) => {
          ref(e);
          textRef.current = e;
        }}
        onInput={handleResizeHeight}
      />

      <ErrorMessage errorMessage={errorMessage} />
    </>
  );
};

export default Textarea;
