export const combineClassNames = (...classname: string[]) =>
  classname.join(' ');

export const getFrontUrl = () => `${process.env.NEXT_PUBLIC_FRONT_URL}`;

export const throttleHelper = (callback: () => void, waitTime: number) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timerId) return;

    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, waitTime);
  };
};

export const isFulFilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

type RegExpType =
  | 'id'
  | 'password'
  | 'email'
  | 'phone'
  | 'birthday'
  | 'numberWithComma'
  | 'date'
  | 'socialSecurityNumber';

export const getRegExp = (type: RegExpType) => {
  switch (type) {
    case 'id':
      // 숫자와 영어가 최소 한 글자 이상 포함되고, 최소 6자리여야 합니다.
      return /(?=.*\d)(?=.*[a-zA-ZS]).{6,}/;

    case 'password':
      // 숫자와 영어가 최소 한 글자 이상 포함되고, 최소 8자리여야 합니다.
      return /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;

    case 'email':
      // 이메일 형식에 맞게 입력해 주세요.
      return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    case 'phone':
      // 숫자만 11자리 입력해 주세요.
      return /[0-9]{11,11}/;

    case 'birthday':
      // 숫자만 8자리 입력해 주세요.
      return /[0-9]{8,8}/;

    case 'numberWithComma':
      // 숫자에 3자리마다 콤마 추가
      return /\B(?=(\d{3})+(?!\d))/g;
    case 'date':
      return /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
    case 'socialSecurityNumber':
      // 숫자만 11자리 입력해 주세요.
      return /[0-9]{13,13}/;
  }
};

export const addSeparatorToPhone = (phone: string) => {
  const front = phone.slice(0, 3);
  const mid = phone.slice(3, 7);
  const last = phone.slice(7);

  return `${front}-${mid}-${last}`;
};

export const removeSeparatorToPhone = (phone: string) =>
  phone
    .split('-')
    .filter((v) => !isNaN(+v))
    .join('');

export const addSeparatorToSocialSecurityNumber = (
  socialSecurityNumber: string
) => {
  const front = socialSecurityNumber.slice(0, 6);
  const last = socialSecurityNumber.slice(6);

  return `${front}-${last}`;
};

export const removeSeparatorToSocialSecurityNumber = (
  socialSecurityNumber: string
) =>
  socialSecurityNumber
    .split('-')
    .filter((v) => !isNaN(+v))
    .join('');

export const deleteSeparator = (word: string, separator: string) =>
  word.split(separator).map((v) => v.trim());

export const numberWithComma = (number: number | string) =>
  number.toString().replace(getRegExp('numberWithComma'), ',');

export const numberWithoutComma = (price: string) =>
  price.toString().split(',').join('');

export const sliceLineOfString = (string: string, line: number) => {
  let sliceIndex = null;

  for (let i = 1; i <= line; i++) {
    if (sliceIndex === -1) continue;
    if (sliceIndex === null) sliceIndex = -1;

    sliceIndex = string.indexOf('\n', sliceIndex + 1);
  }

  if (sliceIndex === -1 || sliceIndex === null) return string;

  return string.slice(0, sliceIndex) + '...';
};
