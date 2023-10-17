"use client"

import { Calendar } from "@/components/ui/calendar"
import {
    FormControl
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { parse } from "date-fns"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

import { CalendarIcon } from '@radix-ui/react-icons'
import { Input } from '../ui/input'
import { useState } from 'react'

const GenDatePicker = ({ field, disabled, placeholder }: { field: ControllerRenderProps<FieldValues, string>, disabled: boolean, placeholder: string }) => {
    return (
        <Popover>
            <div className='flex relative'>
                <FormControl>
                    <Input disabled={disabled} placeholder={"DD/MM/YYYY"} {...field} />
                </FormControl>
                <PopoverTrigger asChild>
                    <CalendarIcon className='absolute right-2 top-2 hover:cursor-pointer' />
                </PopoverTrigger>
            </div>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={parse(field.value, 'dd/MM/yyyy', new Date())}
                    onSelect={date => {
                        field.onChange(date?.toLocaleDateString("en-IN"))
                    }}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default GenDatePicker