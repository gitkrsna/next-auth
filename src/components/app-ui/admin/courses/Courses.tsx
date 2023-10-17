"use client"

import * as React from "react"

import GenTable from '@/components/shared-ui/GenTable'
import { useToast } from '@/components/ui/use-toast'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from 'types/supabase'
import { Course } from 'types/tableTypes'
import AddCourse from './AddCourse'
import useCourseColumns from './useCourseColumns'

export function Courses() {
    const { toast } = useToast()
    const [courses, setCourses] = React.useState<Course[]>([]);

    const fetchCourses = async () => {
        const supabase = createClientComponentClient<Database>()
        const { error, data } = await supabase.from('courses').select('*')
        !error && setCourses(data)
    }

    const deleteCourse = async (record: Course) => {
        const supabase = createClientComponentClient<Database>();
        const { error } = await supabase.from('courses').delete().eq("id", record.id)
        if (!error) {
            toast({
                description: "Course deleted successfully"
            })
            fetchCourses();
        } else {
            toast({
                variant: "destructive",
                description: "Something went wrong, please try again later"
            })
        }
    }

    const columns = useCourseColumns({ refreshCourses: fetchCourses, deleteCourse })

    React.useEffect(() => {
        fetchCourses();
    }, [])

    return (
        <GenTable columns={columns} data={courses} searchId="Course name" rightComponent={<AddCourse refreshCourses={fetchCourses} />} />
    )
}
