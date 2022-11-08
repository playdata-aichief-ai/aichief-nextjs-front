type Props = {
  kinds: 'button';
};

const Spinner = ({ kinds }: Props) => {
  return (
    <>
      {kinds === 'button' && (
        <div className='mx-auto h-8 w-8 animate-spin rounded-full border-[6px] border-gray-200 border-t-gray-500' />
      )}
    </>
  );
};

export default Spinner;
