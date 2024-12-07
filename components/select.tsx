"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type Props = {
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
};

export const Select = ({
  value,
  disabled,
  placeholder,
  options = [],
  onChange,
  onCreate,
}: Props) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreatableSelect
      placeholder={placeholder}
      className="text-sm h-10"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#E2E8F0",
          ":hover": {
            borderColor: "#E2E8F0",
          },
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  );
};
