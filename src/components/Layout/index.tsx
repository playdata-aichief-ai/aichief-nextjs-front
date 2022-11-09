import ASide from '@/components/Layout/ASide';
import Footer from '@/components/Layout/Footer';
import Narvar from '@/components/Layout/Narbar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='bg-gray-50 dark:bg-gray-700'>
      <header>
        <Narvar />
      </header>

      <main>{children}</main>

      <footer className='py-5 text-center text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
        <Footer />
      </footer>

      <ASide />
    </div>
  );
};

export default Layout;
