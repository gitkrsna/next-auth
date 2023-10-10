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
import AddClass from './AddClass'
import { Class, Course, User } from 'types/tableTypes'
import DeleteConfimModal from '@/components/shared-ui/DeleteConfimModal'
import { ReactNode } from 'react'



const useClassColumns = ({ refreshClasss, deleteClass }: { refreshClasss: () => void, deleteClass: (record: Class) => Promise<void> }) => {
    const columns: ColumnDef<Class>[] = [
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
            id: "Class teacher",
            accessorFn: (originalRow) => {
                const { user } = originalRow;
                const { first_name, last_name } = user || {};
                return `${first_name} ${last_name}`
            },
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Class teacher
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ renderValue }) =>
                <div className="capitalize">{renderValue() as ReactNode}</div>
            ,
        },
        {
            id: "Class name",
            accessorFn: (originalRow) => {
                return originalRow.courses?.name
            },
            header: "Class name",
            cell: ({ renderValue }) => <div className="lowercase">{renderValue() as ReactNode}</div>,
        },
        {
            id: "Days",
            accessorFn: (originalRow) => {
                return JSON.parse(originalRow.day_of_week ?? '[]').join(',')
            },
            header: "Days",
            cell: ({ renderValue }) => <div className="lowercase">{renderValue() as ReactNode}</div>,
        },
        {
            id: "Room",
            accessorFn: (originalRow) => {
                return originalRow.room
            },
            header: "Room",
            cell: ({ renderValue }) => <div className="lowercase">{renderValue() as ReactNode}</div>,
        },
        {
            id: "Timing",
            accessorFn: (originalRow) => {
                return `${originalRow.start_time} - ${originalRow.end_time}`
            },
            header: "Timing",
            cell: ({ renderValue }) => <div className="lowercase">{renderValue() as ReactNode}</div>,
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
                                <AddClass refreshClasss={refreshClasss} isEditing={true} initialValues={row.original} /></DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <DeleteConfimModal title='Delete class' description={`Are you sure, you want to delete this class?`} onConfirm={() => deleteClass(row.original)} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return columns;
}

export default useClassColumns