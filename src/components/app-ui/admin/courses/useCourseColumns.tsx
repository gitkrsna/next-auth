"use client"

import {
    CaretSortIcon,
    DotsHorizontalIcon
} from "@radix-ui/react-icons"
import {
    ColumnDef
} from "@tanstack/react-table"

import DeleteConfimModal from '@/components/shared-ui/DeleteConfimModal'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ReactNode } from 'react'
import { Course } from 'types/tableTypes'
import AddCourse from './AddCourse'


const useCourseColumns = ({ refreshCourses, deleteCourse }: { refreshCourses: () => void, deleteCourse: (record: Course) => Promise<void> }) => {
    const columns: ColumnDef<Course>[] = [
        {
            id: "Course name",
            accessorFn: (originalRow) => {
                return originalRow.name
            },
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Course Name
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ renderValue }) => (
                <div className="capitalize">{renderValue() as ReactNode}</div>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
        },
        {
            id: "actions",
            header: "Actions",
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
                                <AddCourse refreshCourses={refreshCourses} isEditing={true} initialValues={row.original} /></DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <DeleteConfimModal title='Delete course' description={`Are you sure, you want to delete course '${row.original.name}' ?`} onConfirm={() => deleteCourse(row.original)} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return columns;
}

export default useCourseColumns