"use client"

import FormSubmitBtn from '@/components/shared-ui/FormSubmitBtn'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
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
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from '@radix-ui/react-icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Database } from 'types/supabase'
import * as z from "zod"
import { Teacher, User } from 'types/tableTypes'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import GenForm from '@/components/shared-ui/GenForm'
import { FormFieldType } from 'types/appTypes'
import { v4 } from "uuid";

const formSchema = z.object({
    created_at: z.string(),
    employee_id: z.string(),
    id: z.string(),
    joined_date: z.string(),
    qualification: z.string(),
    user_id: z.string(),
    user: z.object({
        id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        password: z.string(),
        role: z.literal("staff"),
        date_of_birth: z.date().transform(d => new Date(d)),
        address: z.string(),
        phone_number: z.string(),
        created_at: z.string(),
    }),
})

interface AddTeacherProps {
    isEditing?: boolean,
    initialValues?: Teacher,
    refreshTeachers?: () => void
}

const AddTeacher = ({ isEditing = false, initialValues = {
    created_at: "",
    employee_id: "",
    id: "",
    joined_date: "",
    qualification: "",
    user_id: "",
    user: {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "staff",
        date_of_birth: "",
        address: "",
        phone_number: "",
        created_at: "",
    },

}, refreshTeachers }: AddTeacherProps) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm<FieldValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues as any,
    })

    const fields: FormFieldType[] = [{
        name: "user.first_name",
        label: "First Name",
    },
    {
        name: "user.last_name",
        label: "Last Name",
    },
    {
        name: "user.email",
        label: "Email",
    },
    {
        name: "user.password",
        label: "Password",
    },
    {
        name: "user.date_of_birth",
        label: "DOB",
        fieldType: "datepicker"
    },
    {
        name: "user.address",
        label: "Address",
    },
    {
        name: "user.phone_number",
        label: "Phone Number",
    },
    {
        name: "employee_id",
        label: "Employee Id",
    },
    {
        name: "qualification",
        label: "Qualification",
    },
    {
        name: "joined_date",
        label: "Joined Date",
        fieldType: "datepicker",
        placeholder: "select joining date"
    }]

    // useEffect(() => {
    //     open && form.reset()
    // }, [open, form])

    async function onSubmit(values: FieldValues) {
        setIsSubmitting(true)
        const supabase = createClientComponentClient<Database>()
        const {
            user,
            employee_id,
            qualification,
            joined_date,
            id
        } = values
        if (isEditing) {
            const { error: userUpdateFailed } = await supabase.from('user').update(user).eq("id", user.id)

            if (userUpdateFailed) {
                showError()
                return
            }

            const { error: teacherUpdateFailed } = await supabase.from('teacher').update({
                employee_id,
                qualification,
                joined_date,
            }).eq("id", id)

            if (teacherUpdateFailed) {
                showError()
                return
            }

            showSuccess("Teacher updated successfully")

        } else {
            const id = v4();

            const { error: userCreationFailed } = await supabase.from('user').insert({
                ...user,
                created_at: new Date(),
                id
            })

            if (userCreationFailed) {
                setIsSubmitting(false)
                showError()
                return
            }

            const { error: teacherCreationFailed } = await supabase.from('teacher').insert({
                user_id: id,
                employee_id,
                qualification,
                joined_date,
            })

            if (teacherCreationFailed) {
                showError()
                return
            }

            showSuccess("Teacher created successfully")
        }

        refreshTeachers?.()
        setIsSubmitting(false)
        setOpen(false)
    }

    function showSuccess(msg: string) {
        toast({
            description: msg,
        })
    }

    function showError() {
        toast({
            variant: "destructive",
            description: "Something went wrong, please try again later.",
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{isEditing ? <DropdownMenuItem onSelect={(e) => e.preventDefault()} >Edit</DropdownMenuItem> : <Button className="ml-5">Add Teacher  <PlusIcon className="ml-2 h-4 w-4" /></Button>}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit" : "Add"} teacher</DialogTitle>
                    <DialogDescription>
                        Add changes to teacher here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <GenForm form={form} isSubmitting={isSubmitting} fields={fields} onSubmit={onSubmit} />
            </DialogContent>

        </Dialog>
    )
}

export default AddTeacher