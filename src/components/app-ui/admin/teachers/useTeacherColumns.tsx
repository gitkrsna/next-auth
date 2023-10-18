'use client';

import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import AddTeacher from './AddTeacher';
import { Teacher, User } from 'types/tableTypes';
import DeleteConfimModal from '@/components/shared-ui/DeleteConfimModal';
import { ReactNode } from 'react';

const useTeacherColumns = ({
  refreshTeachers,
  deleteTeacher,
}: {
  refreshTeachers: () => void;
  deleteTeacher: (record: Teacher) => Promise<void>;
}) => {
  const columns: ColumnDef<Teacher>[] = [
    {
      id: 'Emp Id',
      accessorFn: (originalRow) => {
        return originalRow.employee_id;
      },
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Emp Id
            <CaretSortIcon className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ renderValue }) => (
        <div className='ml-4'>{renderValue() as ReactNode}</div>
      ),
    },
    {
      id: 'First name',
      accessorFn: (originalRow) => {
        return originalRow.user.first_name;
      },
      header: 'First Name',
      cell: ({ renderValue }) => <div>{renderValue() as ReactNode}</div>,
    },
    {
      id: 'Last name',
      accessorFn: (originalRow) => {
        return originalRow.user.last_name;
      },
      header: 'Last name',
      cell: ({ renderValue }) => <div>{renderValue() as ReactNode}</div>,
    },
    {
      id: 'Email',
      accessorFn: (originalRow) => {
        return originalRow.user.email;
      },
      header: 'Email',
      cell: ({ renderValue }) => <div>{renderValue() as ReactNode}</div>,
    },
    {
      id: 'DOB',
      accessorFn: (originalRow) => {
        return new Date(
          originalRow.user.date_of_birth as string
        ).toLocaleDateString();
      },
      header: 'DOB',
      cell: ({ renderValue }) => <div>{renderValue() as ReactNode}</div>,
    },
    {
      id: 'Phone',
      accessorFn: (originalRow) => {
        return originalRow.user.phone_number;
      },
      header: 'Phone',
      cell: ({ renderValue }) => <div>{renderValue() as ReactNode}</div>,
    },
    {
      id: 'Qualification',
      accessorFn: (originalRow) => {
        return originalRow.qualification;
      },
      header: 'Qualification',
      cell: ({ renderValue }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='w-32 truncate hover:cursor-pointer'>
                {renderValue() as ReactNode}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{renderValue() as ReactNode}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      id: 'Joining Date',
      accessorFn: (originalRow) => {
        return new Date(originalRow.joined_date as string).toLocaleDateString();
      },
      header: 'Joining Date',
      cell: ({ renderValue }) => <div>{renderValue() as ReactNode}</div>,
    },
    {
      id: 'Address',
      accessorFn: (originalRow) => {
        return originalRow.user.address;
      },
      header: 'Address',
      cell: ({ renderValue }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='w-32 truncate hover:cursor-pointer'>
                {renderValue() as ReactNode}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{renderValue() as ReactNode}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <DotsHorizontalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <AddTeacher
                  refreshTeachers={refreshTeachers}
                  isEditing={true}
                  initialValues={row.original}
                />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteConfimModal
                  title='Delete teacher'
                  description={`Are you sure, you want to delete teacher '${row.original.user.first_name}' ?`}
                  onConfirm={() => deleteTeacher(row.original)}
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

export default useTeacherColumns;
