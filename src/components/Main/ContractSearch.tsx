import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';

import apiService from '@/api';

type option = {
  company: string;
  idx: number;
  name: string;
  id: string;
};

type Props = {
  setContract: Dispatch<SetStateAction<any>>;
};

const ContractSearch = ({ setContract }: Props) => {
  const [options, setOptions] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<option>({
    name: '',
    id: '',
    idx: 0,
    company: '',
  });
  const { data } = useSession();

  useEffect(() => {
    (async () => {
      if (data?.user?.email === null || data?.user?.email === undefined) return;
      const {
        data: { contents },
      } = await apiService.contractService.apiGetContracts({
        // email: data.user.email,
        email: 'park@test.com',
      });
      const tempArr = new Array();
      contents.map((contract) =>
        tempArr.push({
          company: contract.insurance.companyName,
          idx: contract.contract.contractId,
          name: contract.insurance.details,
          id: contract.insurance.id,
        })
      );
      setOptions(tempArr);
    })();
  }, []);

  useEffect(() => {
    setContract(selected);
  }, [selected, setSelected]);

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.name.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''))
        );

  return (
    <div className='flex flex-col justify-center'>
      <Combobox value={selected} onChange={setSelected}>
        <div className='relative mt-1'>
          <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white-500 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm'>
            <Combobox.Input
              className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
              displayValue={(option: option) => option.name}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='계약이름으로 검색해주세요'
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white-500 py-1 text-base shadow-lg ring-1 ring-black-500 ring-opacity-5 focus:outline-none sm:text-sm'>
              {filteredOptions.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  찾지 못하였습니다.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-indigo-600 text-white-500'
                          : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white-500' : 'text-indigo-600'
                            }`}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default ContractSearch;
