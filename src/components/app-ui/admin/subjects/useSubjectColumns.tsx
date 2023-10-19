"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import DeleteConfimModal from "@/components/shared-ui/DeleteConfimModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
import { Subject } from "types/tableTypes";
import AddSubject from "./AddSubject";

const useSubjectColumns = ({
  refreshSubjects,
  deleteSubject,
}: {
  refreshSubjects: () => void;
  deleteSubject: (record: Subject) => Promise<void>;
}) => {
  const columns: ColumnDef<Subject>[] = [
    {
      id: "Subject name",
      accessorFn: (originalRow) => {
        return originalRow.name;
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Subject Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ renderValue }) => (
        <div className="ml-4">{renderValue() as ReactNode}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("description")}</div>
      ),
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
                <AddSubject
                  refreshSubjects={refreshSubjects}
                  isEditing={true}
                  initialValues={row.original}
                />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteConfimModal
                  title="Delete subject"
                  description={`Are you sure, you want to delete subject '${row.original.name}' ?`}
                  onConfirm={() => deleteSubject(row.original)}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};

export default useSubjectColumns;
