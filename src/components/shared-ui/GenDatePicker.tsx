"use client";

import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isDate, parse } from "date-fns";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

import { CalendarIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { useState } from "react";

const GenDatePicker = ({
  field,
  disabled,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  disabled: boolean;
  placeholder: string;
}) => {
  const initialDate = field.value
    ? new Date(field.value).toLocaleDateString()
    : "";
  const [inputDate, setInputDate] = useState<string | undefined>(initialDate);
  return (
    <Popover>
      <div className="flex relative">
        <FormControl>
          <Input
            disabled={disabled}
            placeholder={"DD/MM/YYYY"}
            {...field}
            onChange={(e) => {
              const inputValue = e.target.value;
              const date = parse(inputValue, "dd/MM/yyyy", new Date());
              field.onChange(date);
              setInputDate(inputValue);
            }}
            value={inputDate}
          />
        </FormControl>
        <PopoverTrigger asChild>
          <CalendarIcon className="absolute right-2 top-2 hover:cursor-pointer" />
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(field.value)}
          onSelect={(date) => {
            field.onChange(date);
            setInputDate(date?.toLocaleDateString("en-IN"));
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default GenDatePicker;
