import Link from 'next/link';

import Icon from '@/components/common/Icon';

import type { ICON } from '@/types';

type Props = {
  shape: ICON;
  name: string;
  url:
    | 'mypage/info'
    | 'mypage/contract'
    | 'mypage/client'
    | 'mypage/claimant'
    | 'mypage/claim';
};

const InfoMenu = ({ shape, name, url }: Props) => {
  return (
    <>
      <Link href={url}>
        <a className='flex w-full items-center border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100'>
          <Icon shape={shape} className='flex h-4 w-4 sm:h-5 sm:w-5' />
          <span className='font-bolder flex-1 pl-3 sm:text-lg'>{name}</span>
          <Icon shape='arrowRight' className='h-5 w-5 sm:h-6 sm:w-6' />
        </a>
      </Link>
    </>
  );
};

export default InfoMenu;
