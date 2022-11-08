import { combineClassNames } from '@/lib';

type Props = {
  errorMessage?: string;
  className?: string | null;
};

const ErrorMessage = ({ errorMessage, className }: Props) => {
  return (
    <span
      className={combineClassNames(
        'xs:text-xs mb-4 mt-1 w-full min-w-[200px] max-w-[600px] text-[8px] font-semibold text-red-600',
        className ? className : ''
      )}
    >
      {errorMessage && '※' + ' ' + errorMessage}
    </span>
  );
};

export default ErrorMessage;
