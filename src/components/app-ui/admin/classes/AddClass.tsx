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
    day_of_week: z.string().array(),
    room: z.string(),
    created_at: z.string().or(z.null()),

})

interface AddClassProps {
    isEditing?: boolean,
    initialValues?: Omit<Class, "user" | "courses">,
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
    created_at: null,

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
            .select('user(id, first_name, last_name)');

        if (!error) {
            const teacherOptions = (data || []).map(({ user }) => ({
                label: `${user?.first_name} ${user?.last_name}`,
                value: user?.id
            })) as SelectOption[]
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
        options: courses
    },
    {
        name: "teacher_id",
        label: "Select Teacher",
        options: teachers,
        fieldType: "searchableSelect",
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
        if (isEditing) {
            const { error: classUpdateFailed } = await supabase.from('classes').update(values).eq("id", values.id)
            if (classUpdateFailed) {
                showError()
                return
            }

            showSuccess("Class updated successfully")
        } else {
            const id = v4();
            const { error: userCreationFailed } = await supabase.from('classes').insert({
                ...values,
                id
            }).select('*')

            if (userCreationFailed) {
                setIsSubmitting(false)
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