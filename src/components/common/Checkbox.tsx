// type
import type { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  name: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
};

const Checkbox = ({ name, register, errorMessage, disabled }: Props) => {
  return (
    <div className='xs:space-x-2 mb-4 flex w-full min-w-[200px] max-w-[600px] items-center space-x-1'>
      <input
        id={name}
        {...register}
        type='checkBox'
        className='xs:w-5 xs:h-5 h-4 w-4 cursor-pointer focus:outline-blue-400'
        disabled={disabled}
      />
      <label htmlFor={name} className='xs:text-sm cursor-pointer text-xs'>
        {name}
      </label>
      <span className='xs:text-xs mb-4 mt-1 self-start text-[8px] font-semibold text-red-600'>
        {errorMessage && '※' + ' ' + errorMessage}
      </span>
    </div>
  );
};

export default Checkbox;
