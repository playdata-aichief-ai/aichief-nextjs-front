type Props = {
  text: string;
};

const Title = ({ text }: Props) => {
  return (
    <h4 className='font-bolder xs:text-xl text-lg text-gray-800 md:text-2xl'>
      {text}
    </h4>
  );
};

export default Title;
