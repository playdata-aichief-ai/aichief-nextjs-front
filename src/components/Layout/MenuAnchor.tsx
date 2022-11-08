import Link from 'next/link';
import { useRouter } from 'next/router';

import { combineClassNames } from '@/lib';

type Props = {
  name: string;
  url: 'category' | 'search' | '' | 'upload' | 'news';
};

const HeaderMenuAnchor = ({ name, url }: Props) => {
  const { asPath } = useRouter();
  const isMatch =
    (url.length > 0 && asPath.includes(url)) || (url === '' && asPath === '/');

  return (
    <Link href={`/${url}`}>
      <a
        className={combineClassNames(
          'flex cursor-pointer transition-colors duration-300 hover:text-indigo-500',
          isMatch ? ' text-indigo-500' : 'text-gray-600'
        )}
      >
        {name}
      </a>
    </Link>
  );
};

export default HeaderMenuAnchor;
