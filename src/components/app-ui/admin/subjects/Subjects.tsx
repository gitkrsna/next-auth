"use client"

import * as React from "react"

import GenTable from '@/components/shared-ui/GenTable'
import { useToast } from '@/components/ui/use-toast'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from 'types/supabase'
import { Subject } from 'types/tableTypes'
import AddSubject from './AddSubject'
import useSubjectColumns from './useSubjectColumns'

export function Subjects() {
    const { toast } = useToast()
    const [subjects, setSubjects] = React.useState<Subject[]>([]);

    const fetchSubjects = async () => {
        const supabase = createClientComponentClient<Database>()
        const { error, data } = await supabase.from('subjects').select('*')
        !error && setSubjects(data)
    }

    const deleteSubject = async (record: Subject) => {
        const supabase = createClientComponentClient<Database>();
        const { error } = await supabase.from('subjects').delete().eq("id", record.id)
        if (!error) {
            toast({
                description: "Subject deleted successfully"
            })
            fetchSubjects();
        } else {
            toast({
                variant: "destructive",
                description: "Something went wrong, please try again later"
            })
        }
    }

    const columns = useSubjectColumns({ refreshSubjects: fetchSubjects, deleteSubject })

    React.useEffect(() => {
        fetchSubjects();
    }, [])


    return (
        <GenTable columns={columns} data={subjects} searchId="name" rightComponent={<AddSubject refreshSubjects={fetchSubjects} />} />
    )
}
