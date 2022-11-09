import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import Icon from '@/components/common/Icon';
import Input from '@/components/common/Input';

import atomService from '@/atoms';

type SearchForm = {
  searchWord: string;
};

const SearchBar = () => {
  const router = useRouter();
  const filterList = {
    모두: 'all',
    계약사: 'company',
    고객이름: 'client',
    등록일자: 'date',
  };

  const sequenceList = {
    정렬: 'all',
    최신순: 'newest',
    등록순: 'olddated',
  };

  const statusList = {
    진행상태: 'all',
    '수정 전': 'before',
    완료: 'done',
  };

  const { register, handleSubmit, watch } = useForm<SearchForm>({
    defaultValues: {
      searchWord:
        typeof router.query.searchWord === 'string'
          ? router.query.searchWord
          : '',
    },
  });

  const searchWord = watch('searchWord');

  const [filter, setFilter] = useRecoilState(
    atomService.filterService.filterState
  );
  const [sequence, setSequence] = useRecoilState(
    atomService.sequenceService.sequenceState
  );
  const [status, setStatus] = useRecoilState(
    atomService.statusService.statusState
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const handleSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  const handleSelectSequence = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSequence(e.target.value);
  };
  const handleSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const onSubmit = useCallback(
    ({ searchWord }: SearchForm) =>
      router.push(
        `/search?searchWord=${searchWord}&filter=${filter}&sequence=${sequence}&status=${status}`
      ),
    [router]
  );

  return (
    <form className='relative space-y-3' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex'>
        <select
          onChange={handleSelectFilter}
          value={filter}
          className='inline-flex flex-shrink-0 items-center rounded-l-lg border border-gray-300 bg-gray-100 py-2.5 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-500 dark:text-gray-800'
        >
          {Object.entries(filterList).map(([key, value]) => (
            <option value={value} key={key}>
              {key}
            </option>
          ))}
        </select>

        <div className='relative w-full' ref={wrapperRef}>
          <Input
            type='search'
            name='검색어'
            placeholder='검색어를 입력해주세요.'
            register={register('searchWord', {
              required: '검색어를 입력해주세요!',
            })}
            hiddenLabel={true}
            hiddenMessage={true}
            className='z-20 w-full rounded-r-lg bg-gray-50 text-sm text-gray-900 dark:bg-gray-500 dark:text-gray-800'
          />

          <button
            type='submit'
            className='text-white absolute top-0 right-0 rounded-r-lg border border-indigo-500 bg-indigo-500 p-2.5 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300'
          >
            <Icon shape='search' className='h-6 w-6 text-white-300' />
          </button>
        </div>
      </div>
      <div className='absolute right-0 space-x-4'>
        <select
          onChange={handleSelectSequence}
          value={sequence}
          className='z-10 inline-flex flex-shrink-0 items-center rounded-lg border border-gray-300 bg-gray-100 py-1.5 px-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100'
        >
          {Object.entries(sequenceList).map(([key, value]) => (
            <option value={value} key={key}>
              {key}
            </option>
          ))}
        </select>

        <select
          onChange={handleSelectStatus}
          value={status}
          className='z-10 inline-flex flex-shrink-0 items-center rounded-lg border border-gray-300 bg-gray-100 py-1.5 px-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100'
        >
          {Object.entries(statusList).map(([key, value]) => (
            <option value={value} key={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default SearchBar;
