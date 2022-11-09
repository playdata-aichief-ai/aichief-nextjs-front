import { Menu, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { Fragment, useCallback, useState } from 'react';

import Icon from '@/components/common/Icon';

import djangoApiService from '@/api/django';

import { ApiClickClaimNotificationBody, result } from '@/types';

export interface IHash {
  [details: string]: string;
}

const Notification = () => {
  const process: IHash = {};
  process['scan'] = '서류 스캔 완료!';
  process['classification'] = '서류 분류 완료!';
  process['crop'] = '서류 내 텍스트 찾기 완료!';
  process['box_detect'] = '서류 내 텍스트 자르기 완료!';
  process['super_resolution'] = '서류 화질 높이기 완료!';
  process['yolo_crop'] = '거의 다 되었어요! 조금만 기다려주세요!';
  process['recognition'] = '서류 인식이 끝났습니다. 확인해주세요!';
  const { data } = useSession();
  const [notifications, setNotifications] = useState<result[]>([]);
  const [newNoti, setNewNoti] = useState(0);

  // Notifications 불러오기
  const getNotifications = useCallback(async () => {
    if (!data?.user?.email) return;
    try {
      const response =
        await djangoApiService.notificationService.apiGetClaimsNotifications({
          id: data.user.email,
        });
      const result = await response.data;
      const result_new = [];
      for (const r of result) {
        if (r.view_count == 0) {
          setNewNoti(newNoti + 1);
        }
        const times = new Date(Date.now() - new Date(r.finished_time));
        let times_string = '';
        if (times.getMinutes() < 60 && times.getHours() <= 0) {
          times_string = `${times.getMinutes()}분 전`;
        } else if (times.getHours() < 24) {
          times_string = `${times.getHours()}시간 전`;
        } else {
          times_string = `${times.getDay()}일 전`;
        }
        const file_name = r.img_path.split('/');
        r['img_path'] = r.img_path.split('/')[file_name.length - 1];
        r['finished_time'] = times_string;
        r['finished'] = process[r['finished']];
        result_new.push(r);
      }
      setNotifications(result_new);
    } catch (error) {
      console.error(error);
    }
  }, [data, newNoti, process]);

  const handleOnClickEvent = async (_notification: any) => {
    const claimBody: ApiClickClaimNotificationBody = {
      user: data?.user?.email,
      notification: _notification.id,
    };

    try {
      const response =
        await djangoApiService.notificationService.apiClickClaimNotification(
          claimBody
        );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menu as='div' className='relative ml-3'>
      <Menu.Button
        type='button'
        className='rounded-full p-1 text-gray-400 hover:text-indigo-600 focus:ring-white-500'
        onClick={() => getNotifications()}
      >
        <span className='sr-only'>View notifications</span>
        {newNoti == 0 ? (
          <Icon shape='bell' className='h-7 w-7' />
        ) : (
          <Icon shape='bell' className='h-7 w-7' fill />
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        {notifications.length > 0 ? (
          <Menu.Items className='w-68 absolute right-0 z-10 mt-2 max-h-72 origin-top-right divide-y divide-gray-300 overflow-y-auto rounded-md bg-white-300 py-1 shadow-lg ring-1 ring-black-500 ring-opacity-5 focus:outline-none'>
            {notifications.map((notification, i) => (
              <Menu.Item key={i}>
                <button onClick={() => handleOnClickEvent(notification)}>
                  {notification.view_count == 0 ? (
                    <div className='w-80 py-3 px-4 text-sm hover:bg-gray-300'>
                      <div className='text-xs text-indigo-800'>
                        {notification.img_path}
                      </div>
                      <div>{notification.finished}</div>
                      <div className='text-xs text-gray-600'>
                        {notification.finished_time}
                      </div>
                    </div>
                  ) : (
                    <div className='w-80 py-3 px-4 text-sm text-gray-900 opacity-30'>
                      <div className='text-indigo-800'>
                        {notification.img_path}
                      </div>
                      <div>{notification.finished}</div>
                      <div className='text-xs text-gray-600'>
                        {notification.finished_time}
                      </div>
                    </div>
                  )}
                </button>
              </Menu.Item>
            ))}
            ;
          </Menu.Items>
        ) : (
          <Menu.Items className='w-54 absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-300 rounded-md bg-white-300 py-1 shadow-lg ring-1 ring-black-500 ring-opacity-5 focus:outline-none'>
            <Menu.Item>
              <div className='truncate py-3 px-4 text-sm text-gray-900'>
                업로드된 청구서가 존재하지 않습니다!
              </div>
            </Menu.Item>
          </Menu.Items>
        )}
      </Transition>
    </Menu>
  );
};

export default Notification;
