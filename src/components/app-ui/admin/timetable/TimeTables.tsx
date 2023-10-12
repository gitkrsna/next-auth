"use client"

import * as React from "react"
import GenTable from '@/components/shared-ui/GenTable'
import { useToast } from '@/components/ui/use-toast'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from 'types/supabase'
import { TimeTable } from 'types/tableTypes'
import AddTimeTable from './AddTimeTable'
import useTimeTableColumns from './useTimeTableColumns'

export function TimeTables() {
    const { toast } = useToast()

    const [timeTables, setTimeTables] = React.useState<TimeTable[]>([]);

    const fetchTimeTables = async () => {
        const supabase = createClientComponentClient<Database>()

        const { data, error } = await supabase
            .from('timetable')
            .select('id, class_id, subject_id, teacher_id, start_time, end_time, day_of_week, classes(*), teacher(id, user(id, first_name, last_name)), subjects(*), created_at');

        !error && setTimeTables(data as unknown as TimeTable[])

    }

    const deleteTimeTable = async (record: TimeTable) => {
        const supabase = createClientComponentClient<Database>();
        const { error } = await supabase.from('timetable').delete().eq("id", record.id)
        if (!error) {
            toast({
                description: "TimeTable deleted successfully"
            })
            fetchTimeTables();
        } else {
            toast({
                variant: "destructive",
                description: "Something went wrong, please try again later"
            })
        }
    }

    const columns = useTimeTableColumns({ refreshTimeTables: fetchTimeTables, deleteTimeTable })

    React.useEffect(() => {
        fetchTimeTables();
    }, [])

    return (
        <GenTable columns={columns} data={timeTables} searchId="Class name" rightComponent={<AddTimeTable refreshTimeTables={fetchTimeTables} />} />
    )
}
