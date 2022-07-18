interface CustomButtonProps {
  value: string;
  onClick: (value: string) => void;
  isSelected?: boolean;
}

export function CustomButton({ value, onClick, isSelected = false }: CustomButtonProps) {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`items-center h-12 w-full rounded-xl p-2 ${
          isSelected ? `bg-black` : 'border-2 border-grayLight'
        }`}>
        <p className={`text-xs text-center ${isSelected && 'text-white'}`}>{value}</p>
      </button>
    </>
  );
}
