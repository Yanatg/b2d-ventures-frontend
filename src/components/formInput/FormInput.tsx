import React from "react";
import { Input } from "@nextui-org/react";

interface FormInputProps {
  label: string;
  has$: boolean;
  placeholder: string;
  type: string;
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testid?: string;
}

export default function FormInput({
  label,
  has$,
  placeholder,
  type,
  value,
  onChange,
  testid,
}: FormInputProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="w-full text-[16px] text-secondary">{label}</div>
      <Input
        data-testid={testid}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        size="md"
        labelPlacement="outside"
        endContent={
          has$ && (
            <div className="pointer-events-none flex items-center">
              <span className="text-secondary text-small">$</span>
            </div>
          )
        }
        classNames={{
          mainWrapper: "w-full h-[48px]",
          inputWrapper: "shadow-none px-4 h-[62px] rounded-[8px]",
          input: "focus:outline-none text-[16px] group-data-[has-value=true]:text-secondary",
          label: "text-[16px]",
          innerWrapper: "h-[48px]",
        }}
      />
    </div>
  );
}
