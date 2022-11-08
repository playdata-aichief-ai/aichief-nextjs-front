import { combineClassNames } from '@/lib';

type Props = {
  onSubmit: () => void;
  className?: string;
  children: React.ReactNode;
};

const Form = ({ onSubmit, className, children }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className={combineClassNames('flex flex-col', className ? className : '')}
    >
      {children}
    </form>
  );
};

export default Form;
