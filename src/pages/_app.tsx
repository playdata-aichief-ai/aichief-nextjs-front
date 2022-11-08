import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import '@/styles/globals.css';
import '@/styles/colors.css';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '@/components/common/Loading';
import Layout from '@/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider>
        <React.Suspense fallback={<Loading />}>
          <ToastContainer
            position='top-right'
            autoClose={800}
            theme='light'
            closeOnClick
            hideProgressBar
            limit={3}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </React.Suspense>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
