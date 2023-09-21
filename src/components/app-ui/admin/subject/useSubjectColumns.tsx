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
import AddSubject from './AddSubject'
import { Subject } from 'types/tableTypes'
import DeleteConfimModal from '@/components/shared-ui/DeleteConfimModal'


const useSubjectColumns = ({ refreshSubjects, deleteSubject }: { refreshSubjects: () => void, deleteSubject: (record: Subject) => Promise<void> }) => {
    const columns: ColumnDef<Subject>[] = [
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
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
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
                                <AddSubject refreshSubjects={refreshSubjects} isEditing={true} initialValues={row.original} /></DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <DeleteConfimModal title='Delete subject' description={`Are you sure, you want to delete subject '${row.original.name}' ?`} onConfirm={() => deleteSubject(row.original)} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return columns;
}

export default useSubjectColumns