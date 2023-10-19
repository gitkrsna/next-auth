"use client";

import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { SelectOption } from "types/appTypes";

const GenSelect = ({
  field,
  disabled,
  placeholder,
  options,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  disabled: boolean;
  placeholder: string;
  options?: SelectOption[];
}) => {
  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {(options || []).map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GenSelect;
