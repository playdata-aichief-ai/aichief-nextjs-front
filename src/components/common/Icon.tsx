import { useCallback } from 'react';
import {
  AiFillBell,
  AiFillLock,
  AiOutlineBell,
  AiOutlineClose,
  AiOutlineDown,
  AiOutlineMenu,
  AiOutlineRight,
} from 'react-icons/ai';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import {
  HiHome,
  HiNewspaper,
  HiOutlineChevronDoubleUp,
  HiOutlineHome,
  HiOutlineNewspaper,
  HiOutlineUpload,
  HiOutlineUser,
  HiSearch,
  HiUser,
} from 'react-icons/hi';
import { MdOutlineDocumentScanner } from 'react-icons/md';
import { RiCustomerService2Line, RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { TbReportSearch } from 'react-icons/tb';

// type
import type { ICON } from '@/types/icon';

type Props = {
  shape: ICON;
  className: string;
  fill?: boolean;
  score?: number;
};

const Icon = ({ shape, className, fill }: Props) => {
  const color = '#3B82F6';
  // 일반 아이콘
  const getNomalIcon = useCallback(
    (shape: ICON) => {
      switch (shape) {
        case 'news':
          return <HiOutlineNewspaper className={className} />;
        case 'search':
          return <HiSearch className={className} />;
        case 'home':
          return <HiOutlineHome className={className} />;
        case 'user':
          return <HiOutlineUser className={className} />;
        case 'doubleUp':
          return <HiOutlineChevronDoubleUp className={className} />;
        case 'down':
          return <AiOutlineDown className={className} />;
        case 'arrowRight':
          return <AiOutlineRight />;
        case 'upload':
          return <HiOutlineUpload className={className} />;
        case 'login':
          return <BiLogIn className={className} />;
        case 'logout':
          return <BiLogOut className={className} />;
        case 'menu':
          return <AiOutlineMenu className={className} />;
        case 'bell':
          return <AiOutlineBell className={className} />;
        case 'close':
          return <AiOutlineClose className={className} />;
        case 'lock':
          return <AiFillLock className={className} />;
        case 'google':
          return <FcGoogle className={className} />;
        case 'naver':
          return <SiNaver className={className} color='#2DB400' />;
        case 'kakao':
          return <RiKakaoTalkFill className={className} color='#3A1D1D' />;
        case 'contract':
          return <TbReportSearch className={className} />;
        case 'customer':
          return <RiCustomerService2Line className={className} />;
        case 'claim':
          return <MdOutlineDocumentScanner className={className} />;
      }
    },
    [className]
  );

  // 가득 찬 아이콘
  const getFillIcon = useCallback(
    (shape: ICON) => {
      switch (shape) {
        case 'news':
          return <HiNewspaper color={color} className={className} />;
        case 'search':
          return <HiSearch color={color} className={className} />;
        case 'home':
          return <HiHome className={className} />;
        case 'user':
          return <HiUser color={color} className={className} />;
        case 'doubleUp':
          return (
            <HiOutlineChevronDoubleUp color={color} className={className} />
          );
        case 'bell':
          return <AiFillBell className={className} />;
        case 'upload':
          return <HiOutlineUpload color={color} className={className} />;
        case 'login':
          return <BiLogIn color={color} className={className} />;
        case 'logout':
          return <BiLogOut color={color} className={className} />;
      }
    },
    [className]
  );

  return <>{fill ? getFillIcon(shape) : getNomalIcon(shape)}</>;
};

export default Icon;
