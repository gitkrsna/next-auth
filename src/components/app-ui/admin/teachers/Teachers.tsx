"use client"

import * as React from "react"
import GenTable from '@/components/shared-ui/GenTable'
import { useToast } from '@/components/ui/use-toast'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from 'types/supabase'
import { Teacher } from 'types/tableTypes'
import AddTeacher from './AddTeacher'
import useTeacherColumns from './useTeacherColumns'

export function Teachers() {
    const { toast } = useToast()

    const [teachers, setTeachers] = React.useState<Teacher[]>([]);

    const fetchTeachers = async () => {
        const supabase = createClientComponentClient<Database>()

        const { data, error } = await supabase
            .from('teacher')
            .select('*, user(*)');
        !error && setTeachers(data as Teacher[])
    }

    const deleteTeacher = async (record: Teacher) => {
        const supabase = createClientComponentClient<Database>();
        const { error } = await supabase.from('user').delete().eq("id", record.user.id)
        if (!error) {
            toast({
                description: "Teacher deleted successfully"
            })
            fetchTeachers();
        } else {
            toast({
                variant: "destructive",
                description: "Something went wrong, please try again later"
            })
        }
    }

    const columns = useTeacherColumns({ refreshTeachers: fetchTeachers, deleteTeacher })

    React.useEffect(() => {
        fetchTeachers();
    }, [])

    return (
        <GenTable columns={columns} data={teachers} searchId="First name" rightComponent={<AddTeacher refreshTeachers={fetchTeachers} />} />
    )
}
