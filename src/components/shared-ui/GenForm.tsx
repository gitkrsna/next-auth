"use client"

import FormSubmitBtn from '@/components/shared-ui/FormSubmitBtn'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { FormFieldType } from 'types/appTypes'


const GenForm = ({ form, onSubmit, isSubmitting, fields, }: { form: UseFormReturn<FieldValues, any, undefined>, onSubmit: SubmitHandler<FieldValues>, isSubmitting: boolean, fields: FormFieldType[] }) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {fields.map(({ name, label, placeholder, description }: FormFieldType) => (<FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                                <Input disabled={isSubmitting} placeholder={placeholder} {...field} />
                            </FormControl>
                            <FormDescription>
                                {description}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />))}

                <FormSubmitBtn isSubmitting={isSubmitting} />
            </form>
        </Form>
    )
}

export default GenForm