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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Database } from 'types/supabase'
import * as z from "zod"
import { Course } from './types'

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Course name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    id: z.string(),
    created_at: z.string(),
})

interface AddCourseProps {
    isEditing?: boolean,
    initialValues?: Course,
    refreshCourses?: () => void
}

const AddCourse = ({ isEditing = false, initialValues = {
    id: "",
    created_at: "",
    name: "",
    description: "",
}, refreshCourses }: AddCourseProps) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues as any,
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        const supabase = createClientComponentClient<Database>()
        if (isEditing) {
            let { status } = await supabase.from('courses').update(values).eq("id", values.id)
            status === 204 ? showSuccess("Course updated successfully") : showError();
            refreshCourses?.()
        } else {
            let { status } = await supabase.from('courses').insert(values)
            status === 201 ? showSuccess("Course created successfully") : showError();
        }
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
            <DialogTrigger asChild>{isEditing ? <div>Edit</div> : <Button className="ml-5">Add Course  <PlusIcon className="ml-2 h-4 w-4" /></Button>}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit" : "Add"} course</DialogTitle>
                    <DialogDescription>
                        Add changes to course here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="course name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the course name you want to create
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="course description" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the course description
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormSubmitBtn isSubmitting={isSubmitting} />
                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    )
}

export default AddCourse