import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { combineClassNames, throttleHelper } from '@/lib';
import useScrollDirection from '@/hooks/useScrollDirection';

import ToTopButton from '@/components/Layout/ToTopButton';

const ASide = () => {
  const { data } = useSession();

  // 현재 가로 길이
  const [screenWidth, setScreenWidth] = useState(0);

  // 리사이즈일 경우 실행할 이벤트 함수
  const handleResize = useCallback(() => setScreenWidth(window.innerWidth), []);
  // 쓰로틀링적용한 이벤트 함수
  const throttleResize = throttleHelper(handleResize, 100);

  // 리사이즈 이벤트 등록
  useEffect(() => {
    window.addEventListener('resize', throttleResize);
    return () => window.removeEventListener('resize', throttleResize);
  }, [throttleResize]);

  // 가로 길이, 스크롤 방향에 의해서 버튼 위치 결정 조건
  const [isUp, isBottom, pageY] = useScrollDirection(50);
  const locationCondition =
    screenWidth >= 1150
      ? 'bottom-3'
      : isBottom
      ? 'bottom-[75px]'
      : isUp
      ? 'bottom-3'
      : 'bottom-[75px]';
  const showCondition = pageY < 100 ? 'opacity-0' : 'opacity-75';

  return (
    <aside
      className={combineClassNames(
        'fixed bottom-2 right-2 z-[9] flex space-x-5 transition-all duration-500',
        locationCondition
      )}
    >
      <ToTopButton showCondition={showCondition} />
    </aside>
  );
};

export default ASide;
