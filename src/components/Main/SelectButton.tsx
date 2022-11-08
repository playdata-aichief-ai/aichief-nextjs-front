import React from 'react';

import { combineClassNames } from '@/lib';

type Props = {
  content: string;
  isSelected: boolean;
  handleClick: any;
  elementIndex: number;
};

const SelectButton = ({
  content,
  isSelected,
  handleClick,
  elementIndex,
}: Props) => {
  return (
    <li
      onClick={() => handleClick(elementIndex)}
      className={combineClassNames(
        'mb-4 flex w-full justify-center rounded-md px-6 py-3 md:mx-2 md:w-auto ',
        isSelected
          ? 'bg-indigo-600 text-white-300  hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500'
          : 'border border-indigo-600 text-indigo-600  hover:bg-white-500'
      )}
    >
      {content}
    </li>
  );
};

export default SelectButton;
