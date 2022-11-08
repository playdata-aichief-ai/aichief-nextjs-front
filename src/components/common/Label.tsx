type Props = {
  name: string;
  className?: string | null;
};

const Label = ({ name, className }: Props) => {
  return (
    <label
      htmlFor={name}
      className={
        'font-bolder xs:text-sm w-full min-w-[200px] max-w-[600px] cursor-pointer text-xs md:text-base' +
        (className ? className : '')
      }
    >
      {name}
    </label>
  );
};

export default Label;
