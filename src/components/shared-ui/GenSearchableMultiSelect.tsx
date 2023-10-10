
import * as React from 'react'
import { cn } from "@/lib/utils"

import { Check, X, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge";
import { SelectOption } from 'types/appTypes'
import { ControllerRenderProps, FieldValues, UseFormReturn } from 'react-hook-form'

interface GenSearchableMultiSelectProps {
    field: ControllerRenderProps<FieldValues, string>,
    options?: SelectOption[];
    className?: string;
    disabled: boolean,
    placeholder: string,
    form: UseFormReturn<FieldValues, any, undefined>
}

function GenSearchableMultiSelect({ field, options, className, disabled, placeholder, form, ...props }: GenSearchableMultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const name = field.name;
    const value = Array.isArray(field.value) ? field.value : (JSON.parse(field.value || '[]')) as string[]

    React.useEffect(() => {
        form.setValue(name, value)
    }, [])

    const handleUnselect = (item: string) => {
        form.setValue(name, (value.filter((i) => i !== item)))
        setOpen(true)
    }
    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger disabled={disabled} asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full justify-between ${value.length > 1 ? "h-full" : "h-10"}`}
                    onClick={() => setOpen(!open)}
                >
                    <div className="flex gap-1 flex-wrap">
                        {value.map((item) => (
                            <Badge
                                variant="secondary"
                                key={item}
                                className="mr-1 mb-1"
                                onClick={() => handleUnselect(item)}
                            >
                                {item}
                                <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(item);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(item)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command className={className}>
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup className='max-h-64 overflow-auto'>
                        {(options || []).map((option) => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => {
                                    value.includes(option.value)
                                        ? form.setValue(name, value.filter(item => item != option.value))
                                        : form.setValue(name, [...value, option.value])
                                    setOpen(true)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value.includes(option.value) ?
                                            "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover >
    )
}

export { GenSearchableMultiSelect }
