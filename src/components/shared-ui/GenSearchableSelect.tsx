"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    FormControl
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ControllerRenderProps, FieldValues, UseFormReturn } from 'react-hook-form'
import { SelectOption } from 'types/appTypes'

const GenSearchableSelect = ({ field, disabled, placeholder, options, form }: { field: ControllerRenderProps<FieldValues, string>, disabled: boolean, placeholder: string, options?: SelectOption[], form: UseFormReturn<FieldValues, any, undefined> }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        disabled={disabled}
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "w-[100%] justify-between",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value
                            ? (options || []).find(
                                (option) => option.value === field.value
                            )?.label
                            : (placeholder || "Select")}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50 text-right" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[100%] p-0">
                <Command>
                    <CommandInput
                        placeholder={placeholder}
                        className="h-9"
                    />
                    <CommandEmpty>No record found.</CommandEmpty>
                    <CommandGroup>
                        {(options || []).map((option) => (
                            <CommandItem
                                value={option.label}
                                key={option.value}
                                onSelect={() => form.setValue(field.name, option.value)}
                            >
                                {option.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        option.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default GenSearchableSelect