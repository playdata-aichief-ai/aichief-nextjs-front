const MyLoading = () => {
  return (
    <>
      <article className='fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4'>
        <h1 className='xs:text-2xl font-bolder whitespace-pre-line text-center text-xl'>
          {'데이터를 받아오는 중입니다.\n잠시만 기다려주세요!'}
        </h1>

        <div className='mx-auto space-x-1 text-center'>
          <div className='inline-block h-5 w-5 animate-loading-spinner rounded-full bg-indigo-500' />
          <div
            style={{ animationDelay: '-0.1s' }}
            className='inline-block h-5 w-5 animate-loading-spinner rounded-full bg-indigo-500'
          />
          <div
            style={{ animationDelay: '-0.2s' }}
            className='inline-block h-5 w-5 animate-loading-spinner rounded-full bg-indigo-500'
          />
          <div
            style={{ animationDelay: '-0.3s' }}
            className='inline-block h-5 w-5 animate-loading-spinner rounded-full bg-indigo-500'
          />
          <div
            style={{ animationDelay: '-0.4s' }}
            className='inline-block h-5 w-5 animate-loading-spinner rounded-full bg-indigo-500'
          />
        </div>
      </article>
    </>
  );
};

export default MyLoading;
