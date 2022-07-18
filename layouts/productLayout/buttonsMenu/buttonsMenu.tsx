import { CustomButton } from '../../../components/common';

interface ButtonMenuProps {
  option: any;
  handleClick: (value: string) => void;
  selectValue: string;
}

export function ButtonMenu({ option, handleClick, selectValue }: ButtonMenuProps) {
  return (
    <div>
      <h2 className="text-2xl text-grayLight mb-4">{option.name}:</h2>
      <div className="flex flex-wrap mb-4">
        {option.values.map((value: string, index: number) => (
          <div key={index} className="mr-3 mb-3 w-28">
            <CustomButton value={value} onClick={handleClick} isSelected={value === selectValue} />
          </div>
        ))}
      </div>
    </div>
  );
}
