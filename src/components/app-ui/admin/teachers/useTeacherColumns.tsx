"use client"

import {
    CaretSortIcon,
    DotsHorizontalIcon
} from "@radix-ui/react-icons"
import {
    ColumnDef
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import AddTeacher from './AddTeacher'
import { Teacher, User } from 'types/tableTypes'
import DeleteConfimModal from '@/components/shared-ui/DeleteConfimModal'


const useTeacherColumns = ({ refreshTeachers, deleteTeacher }: { refreshTeachers: () => void, deleteTeacher: (record: Teacher) => Promise<void> }) => {
    const columns: ColumnDef<Teacher>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "user",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        First Name
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{(row.getValue("user") as User).first_name}</div>
            ),
        },
        {
            accessorKey: "user",
            header: "Last name",
            cell: ({ row }) => <div className="lowercase">{(row.getValue("user") as User).last_name}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <AddTeacher refreshTeachers={refreshTeachers} isEditing={true} initialValues={row.original} /></DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <DeleteConfimModal title='Delete teacher' description={`Are you sure, you want to delete teacher '${row.original.user.first_name}' ?`} onConfirm={() => deleteTeacher(row.original)} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return columns;
}

export default useTeacherColumns