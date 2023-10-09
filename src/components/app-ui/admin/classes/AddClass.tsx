"use client"

import GenForm from '@/components/shared-ui/GenForm'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from '@radix-ui/react-icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { FormFieldType, SelectOption } from 'types/appTypes'
import { Database } from 'types/supabase'
import { Class, Teacher } from 'types/tableTypes'
import { v4 } from "uuid"
import * as z from "zod"

const formSchema = z.object({
    id: z.string(),
    course_id: z.string(),
    teacher_id: z.string(),
    start_time: z.string(),
    end_time: z.string(),
    day_of_week: z.string(),
    room: z.string(),
    created_at: z.string(),

})

interface AddClassProps {
    isEditing?: boolean,
    initialValues?: Class,
    refreshClasss?: () => void
}

const AddClass = ({ isEditing = false, initialValues = {
    id: "",
    course_id: "",
    teacher_id: "",
    start_time: "",
    end_time: "",
    day_of_week: "",
    room: "",
    created_at: "",

}, refreshClasss }: AddClassProps) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm<FieldValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues as any,
    })

    const [teachers, setTeachers] = useState<SelectOption[]>([])
    const [courses, setCourses] = useState<SelectOption[]>([])

    const weekdaysOptions: SelectOption[] = [{
        label: "Mon",
        value: "Mon",
    },
    {
        label: "Tue",
        value: "Tue",
    },
    {
        label: "Wed",
        value: "Wed",
    },
    {
        label: "Thu",
        value: "Thu",
    },
    {
        label: "Fri",
        value: "Fri",
    },
    {
        label: "Sat",
        value: "Sat",
    }]
    const fetchTeachers = async () => {
        const supabase = createClientComponentClient<Database>()

        const { data, error } = await supabase
            .from('teacher')
            .select('id, user(first_name, last_name)');
        if (!error) {
            const teacherOptions = (data || []).map(({ id, user }) => ({
                label: `${user?.first_name} ${user?.last_name}`,
                value: id
            }))
            setTeachers(teacherOptions)
        }

    }

    const fetchCourses = async () => {
        const supabase = createClientComponentClient<Database>()

        const { data, error } = await supabase
            .from('courses')
            .select('id, name');
        if (!error) {
            const courseOptions = (data || []).map(({ id, name }) => ({
                label: name,
                value: id
            }))
            setCourses(courseOptions)
        }

    }

    useEffect(() => {
        fetchTeachers()
        fetchCourses()
    }, [])

    const fields: FormFieldType[] = [{
        name: "course_id",
        label: "Select Course",
        fieldType: "searchableSelect",
        options: courses,
        onSelect: (option: SelectOption) => {
            form.setValue("course_id", option.value)
        }
    },
    {
        name: "teacher_id",
        label: "Select Teacher",
        options: teachers,
        fieldType: "searchableSelect",
        onSelect: (option: SelectOption) => {
            form.setValue("teacher_id", option.value)
        }
    },
    {
        name: "start_time",
        label: "Start Time",
        controlType: 'time'
    },
    {
        name: "end_time",
        label: "End Time",
        controlType: 'time'
    },
    {
        name: "day_of_week",
        label: "Days of Week",
        options: weekdaysOptions,
        fieldType: 'multiSelect',
        onSelect: (value: string[]) => {
            form.setValue("day_of_week", value)
        }
    },
    {
        name: "room",
        label: "Room No.",
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

            const { error: classUpdateFailed } = await supabase.from('class').update({
                employee_id,
                qualification,
                joined_date,
            }).eq("id", id)

            if (classUpdateFailed) {
                showError()
                return
            }

            showSuccess("Class updated successfully")

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

            const { error: classCreationFailed } = await supabase.from('class').insert({
                user_id: id,
                employee_id,
                qualification,
                joined_date,
            })

            if (classCreationFailed) {
                showError()
                return
            }

            showSuccess("Class created successfully")
        }

        refreshClasss?.()
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
            <DialogTrigger asChild>{isEditing ? <DropdownMenuItem onSelect={(e) => e.preventDefault()} >Edit</DropdownMenuItem> : <Button className="ml-5">Add Class  <PlusIcon className="ml-2 h-4 w-4" /></Button>}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit" : "Add"} class</DialogTitle>
                    <DialogDescription>
                        Add changes to class here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <GenForm form={form} isSubmitting={isSubmitting} fields={fields} onSubmit={onSubmit} />
            </DialogContent>

        </Dialog>
    )
}

export default AddClass