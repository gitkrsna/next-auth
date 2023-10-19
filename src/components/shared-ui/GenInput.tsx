import React from "react";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

const GenInput = ({
  field,
  disabled,
  placeholder,
  controlType,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  disabled: boolean;
  placeholder: string;
  controlType: string;
}) => {
  return (
    <FormControl>
      <Input
        type={controlType}
        disabled={disabled}
        placeholder={placeholder}
        {...field}
      />
    </FormControl>
  );
};

export default GenInput;
