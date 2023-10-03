import React from 'react'
import { FormControl } from '../ui/form'
import { Input } from '../ui/input'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

const GenInput = ({ field, disabled, placeholder }: { field: ControllerRenderProps<FieldValues, string>, disabled: boolean, placeholder: string }) => {
    return (
        <FormControl>
            <Input disabled={disabled} placeholder={placeholder} {...field} />
        </FormControl>
    )
}

export default GenInput