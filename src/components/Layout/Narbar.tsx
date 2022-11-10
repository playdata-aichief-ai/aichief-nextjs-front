import { Disclosure, Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { Fragment, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { combineClassNames } from '@/lib';

import Icon from '@/components/common/Icon';
import MenuAnchor from '@/components/Layout/MenuAnchor';
import MobileMenuAnchor from '@/components/Layout/MobileMenuAnchor';
import Notification from '@/components/Layout/Notification';

import stateService from '@/atoms';

export default function Narbar() {
  const { data, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [userStatus, setUserStatus] = useRecoilState(
    stateService.statusService.statusState
  );

  useEffect(() => {
    if (data?.user?.role) {
      setUserStatus(data?.user?.role);
    }
  }, [data, setUserStatus]);

  return (
    <Disclosure
      as='nav'
      className='bg-white/80  fixed top-0 left-0 right-0 z-10 px-8 shadow-md backdrop-blur-md dark:bg-dark/50'
    >
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 '>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='focus:ring-white inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset dark:text-gray-100'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <Icon
                      shape='close'
                      className='xs:w-5 xs:h-5 h-4 w-4 sm:h-6 sm:w-6'
                    />
                  ) : (
                    <Icon
                      shape='menu'
                      className='xs:w-5 xs:h-5 h-4 w-4 sm:h-6 sm:w-6'
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <Link className='flex flex-shrink-0 items-center' href='/'>
                  <Image
                    width='70'
                    height='18'
                    className='block h-8 w-auto lg:hidden'
                    src='/assets/logo.svg'
                    alt='Your Company'
                  />
                </Link>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='left-0 top-16 flex w-full items-center justify-center justify-items-start space-x-10 px-10 py-3 pt-2'>
                    <MenuAnchor name='홈' url='' />
                    {userStatus === 'manager' ? (
                      <MenuAnchor name='검색' url='search' />
                    ) : (
                      <MenuAnchor name='업로드' url='upload' />
                    )}
                  </div>
                </div>
              </div>
              {status ? (
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <Notification />
                  {/* Profile dropdown */}
                  <Menu as='div' className='relative ml-3'>
                    {data?.user?.image ? (
                      <Menu.Button className='h-10 w-10 rounded-full'>
                        <Image
                          src={data?.user?.image}
                          alt='user'
                          quality={100}
                          layout='fill'
                          className='h-10 w-10 cursor-pointer items-center justify-center rounded-full border px-4 shadow-sm'
                          unoptimized={true}
                        />
                      </Menu.Button>
                    ) : (
                      <Menu.Button className='h-10 w-10 rounded-full'>
                        <Image
                          src='/assets/user.jpg'
                          alt='user'
                          quality={100}
                          layout='fill'
                          className='h-10 w-10 cursor-pointer items-center justify-center rounded-full border px-4 shadow-sm'
                        />
                      </Menu.Button>
                    )}
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='w-54 absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-300 rounded-md bg-white-300 py-1 shadow-lg ring-1 ring-black-500 ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          <div className='dark:text-white py-3 px-4 text-sm text-gray-900'>
                            <div>{data?.user?.name}</div>
                            <div className='truncate font-medium'>
                              {data?.user?.email}
                            </div>
                          </div>
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href='/mypage'>
                              <a
                                className={combineClassNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                마이페이지
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={combineClassNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() =>
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                              }
                            >
                              테마 변경
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => signOut()}
                              className={combineClassNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              로그아웃
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <Link href='/signup'>
                    <a className='flex w-full items-center justify-center truncate rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm text-white-300 shadow-sm hover:bg-indigo-700'>
                      회원가입
                    </a>
                  </Link>
                  <Link href='/login'>
                    <a className='inline-flex w-full items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none'>
                      로그인
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3'>
              <MobileMenuAnchor name='홈' url='' shape='home' />
              {userStatus === 'manager' ? (
                <MobileMenuAnchor name='검색' url='search' shape='search' />
              ) : (
                <MobileMenuAnchor name='업로드' url='upload' shape='upload' />
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
