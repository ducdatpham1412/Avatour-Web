import { ReactElement, useState } from 'react';
import { XIcon } from 'lucide-react';
import { ClassValue } from 'clsx';

import { cn } from '@/lib';

import { Label } from '../ui';
import DropDown from '../DropDown';

interface Props extends PropsWithClassName {
  label?: string;
  values: Array<{
    icon?: ReactElement;
    title: string;
  }>;
  optionsDropdown: Array<{
    icon?: ReactElement;
    title: string;
  }>;
  freeText?: boolean;
  onSelectValue?: (v: string) => void;
  onDeleteValue?: (v: string) => void;
  contentClassName?: ClassValue;
}

interface FreeInputProps {
  onEnter: (v: string) => void;
}

const FreeInput = ({ onEnter: onSubmit }: FreeInputProps) => {
  const [text, setText] = useState('');

  return (
    <input
      className="w-[130px] h-[30px] border-[1px] border-gray_500 rounded-md text-[12px] px-2"
      onKeyDown={e => {
        if (e.key === 'Enter' && text) {
          e.preventDefault();
          onSubmit(text);
          setText('');
        }
        return false;
      }}
      value={text}
      onChange={e => {
        setText(e.target.value);
      }}
      type="text"
    />
  );
};

const ListFieldDropDown = ({
  label,
  values,
  freeText = false,
  optionsDropdown,
  onSelectValue,
  onDeleteValue,
  className,
  contentClassName,
}: Props) => {
  const options = optionsDropdown.filter(o => {
    const find = values.find(v => v.title === o.title);
    return !find;
  });

  return (
    <div className={cn('flex-grow', className)}>
      {!!label && <Label className="font-bold">{label}</Label>}
      <div
        className={cn(
          'rounded-[10px] border border-input bg-background px-3 mt-[8px] flex items-center gap-[8px] flex-wrap py-3',
          contentClassName,
        )}
      >
        {values.map(ot => {
          return (
            <div
              key={ot.title}
              className="px-[8px] py-[2px] bg-gray_200 rounded-full inline-flex gap-[8px] items-center"
            >
              <p className="text-sm">{ot.title}</p>
              <button type="button" onClick={() => onDeleteValue?.(ot.title)}>
                <XIcon size={12} />
              </button>
            </div>
          );
        })}

        {freeText && <FreeInput onEnter={v => onSelectValue?.(v)} />}

        <DropDown
          options={options.map(o => ({ value: o.title, label: o.title }))}
          trigger={<p className="text-sm underline">Thêm mới</p>}
          label={label}
          onCheck={v => onSelectValue?.(v)}
        />
      </div>
    </div>
  );
};

export default ListFieldDropDown;
