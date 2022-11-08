import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { getFrontUrl } from '@/lib';

type Props = {
  title?: string;
  description?: string;
};

const Seo = ({ title, description }: Props) => {
  const { asPath } = useRouter();

  return (
    <Head>
      <title>{title}</title>

      {/* 현 페이지 설명 */}
      <meta name='description' content={description} />

      {/*미리보기에 제공될 정보 */}
      <meta property='og:url' content={getFrontUrl() + '/' + asPath} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />

      {/* 트위터 */}
      <meta
        name='twitter:card'
        content={`${title}
        ${description}`}
      />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </Head>
  );
};

Seo.defaultProps = {
  title: 'AI 계장님',
  description: '초해상화, 영역인식, OCR를 이용한 보험 청구',
};

export default Seo;
