import { Disclosure } from '@headlessui/react';
import { useRouter } from 'next/router';

import { combineClassNames } from '@/lib';

import Icon from '@/components/common/Icon';

import type { ICON } from '@/types';

type Props = {
  shape: ICON;
  name: string;
  url: 'category' | 'search' | '' | 'info' | 'news' | 'upload';
};

const MenuAnchor = ({ shape, name, url }: Props) => {
  const { asPath } = useRouter();
  const isMatch =
    (url.length > 0 && asPath.includes(url)) || (url === '' && asPath === '/');

  return (
    <>
      <Disclosure.Button
        key={name}
        as='a'
        href={`/${url}`}
        className={combineClassNames(
          isMatch ? 'text-indigo-500' : 'text-gray-600',
          'flex cursor-pointer items-center rounded-md px-3 py-2 text-base font-medium transition-colors duration-300 hover:text-indigo-500'
        )}
        aria-current={isMatch ? 'page' : undefined}
      >
        <Icon
          shape={shape}
          className='xs:w-5 xs:h-5 mr-2 h-4 w-4 sm:h-6 sm:w-6'
          fill={isMatch}
        />
        {name}
      </Disclosure.Button>
    </>
  );
};

export default MenuAnchor;
