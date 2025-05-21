import { PlusIcon } from 'lucide-react';

import DropDown, { DropDownProps } from './DropDown';

interface Props {
  options?: DropDownProps['options'];
  onClick?: () => void;
}

const CreateBtn = ({ options, onClick }: Props) => {
  const Trigger = (
    <button
      className="w-[70px] h-[40px] rounded-full inline-flex items-center justify-center border-[1px] gap-x-2 border-black bg-background hover-slow"
      onClick={e => {
        e.preventDefault();
        onClick?.();
      }}
    >
      <PlusIcon strokeWidth={2} size={16} />
      <p className="font-medium text-[12px]">New</p>
    </button>
  );

  if (options) {
    return <DropDown label="New" options={options} trigger={Trigger} />;
  }

  return Trigger;
};

export default CreateBtn;
