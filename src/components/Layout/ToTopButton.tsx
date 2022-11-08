import { combineClassNames } from '@/lib';

import Icon from '@/components/common/Icon';

type Props = {
  showCondition: string;
};

const ToTopButton = ({ showCondition }: Props) => {
  return (
    <button
      type='button'
      className={combineClassNames(
        'bg-white flex flex-col items-center rounded-full border border-gray-300 p-2 shadow-md  transition-all duration-500 hover:border-blue-600 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 focus:outline-none',
        showCondition
      )}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
    >
      <Icon shape='doubleUp' className='h-5 w-5' />
      <span className='text-[8px]'>맨위로</span>
    </button>
  );
};

export default ToTopButton;
