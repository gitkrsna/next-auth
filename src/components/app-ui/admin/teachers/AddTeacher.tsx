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
import { Teacher } from 'types/tableTypes'
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
    users: z.object({
        id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        password: z.string(),
        role: z.literal("staff"),
        date_of_birth: z.string().transform(d => new Date(d)),
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
    users: {
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
        name: "users.first_name",
        label: "First Name",
        description: "",
        placeholder: ""
    },
    {
        name: "users.last_name",
        label: "Last Name",
        description: "",
        placeholder: ""
    },
    {
        name: "users.email",
        label: "Email",
        description: "",
        placeholder: ""
    },
    {
        name: "users.password",
        label: "Password",
        description: "",
        placeholder: ""
    },
    {
        name: "users.date_of_birth",
        label: "DOB",
        description: "",
        placeholder: ""
    },
    {
        name: "users.address",
        label: "Address",
        description: "",
        placeholder: ""
    },
    {
        name: "users.phone_number",
        label: "Phone Number",
        description: "",
        placeholder: ""
    },
    {
        name: "employee_id",
        label: "Employee Id",
        description: "",
        placeholder: ""
    },
    {
        name: "qualification",
        label: "Qualification",
        description: "",
        placeholder: ""
    },
    {
        name: "joined_date",
        label: "Joined Date",
        description: "",
        placeholder: ""
    }]

    // useEffect(() => {
    //     open && form.reset()
    // }, [open, form])

    async function onSubmit(values: FieldValues) {
        setIsSubmitting(true)
        const supabase = createClientComponentClient<Database>()
        const {
            users,
            employee_id,
            qualification,
            joined_date,
        } = values
        if (isEditing) {
            await supabase.from('users').update(values).eq("id", values.user_id)
            let { status } = await supabase.from('teachers').update(values).eq("id", values.id)
            status === 204 ? showSuccess("Teacher updated successfully") : showError();
        } else {
            const id = v4();

            let { status: createUserStatus } = await supabase.from('users').insert({
                ...users,
                id,
                created_at: new Date()
            })
            if (createUserStatus != 201) {
                showError()
                setIsSubmitting(false)
                return
            }
            let { status } = await supabase.from('teachers').insert({
                user_id: id,
                employee_id,
                qualification,
                joined_date,
            })
            status === 201 ? showSuccess("Teacher created successfully") : showError();
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