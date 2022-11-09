import UnderlineLink from '@/components/links/UnderlineLink';

const Footer = () => {
  return (
    <>
      © {new Date().getFullYear()} By{' '}
      <UnderlineLink href='https://github.com/playdata-aichief-ai'>
        AI계장님
      </UnderlineLink>
    </>
  );
};

export default Footer;
