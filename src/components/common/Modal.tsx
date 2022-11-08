import React, { useCallback, useEffect, useRef } from 'react';

import { combineClassNames } from '@/lib';

type Props = {
  children: React.ReactNode;
  onCloseModal: () => void;
  title?: string;
  className?: string;
};

const Modal = ({ children, onCloseModal, title, className }: Props) => {
  const modalRef = useRef<null | HTMLElement>(null);

  const closeModal = useCallback(
    (e: any) => {
      if (modalRef.current === e.target) onCloseModal();
    },
    [modalRef, onCloseModal]
  );

  useEffect(() => {
    window.addEventListener('click', closeModal);

    return () => window.removeEventListener('click', closeModal);
  }, [closeModal]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      return;
    };
  }, []);

  return (
    <aside
      className='bg-black/60 fixed top-0 left-0 z-[10] h-full w-full animate-fade-in'
      ref={modalRef}
      style={{ margin: 0 }}
    >
      <aside
        className={combineClassNames(
          'bg-white absolute top-1/2 left-1/2 w-2/3 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md',
          className ? className : ''
        )}
      >
        {title && (
          <h3 className='text-white font-bolder xs:py-3 bg-indigo-400 py-2 text-center text-base sm:text-xl md:text-2xl'>
            {title}
          </h3>
        )}

        {children}
      </aside>
    </aside>
  );
};

export default Modal;
