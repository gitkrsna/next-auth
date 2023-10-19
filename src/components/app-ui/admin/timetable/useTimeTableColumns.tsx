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
import AddTimeTable from './AddTimeTable';
import { TimeTable, Course, User } from 'types/tableTypes';
import DeleteConfimModal from '@/components/shared-ui/DeleteConfimModal';
import { ReactNode } from 'react';

const useTimeTableColumns = ({
  refreshTimeTables,
  deleteTimeTable,
}: {
  refreshTimeTables: () => void;
  deleteTimeTable: (record: TimeTable) => Promise<void>;
}) => {
  const columns: ColumnDef<TimeTable>[] = [
    {
      id: 'Teacher name',
      accessorFn: (originalRow) => {
        const { user } = originalRow.teacher;
        const { first_name, last_name } = user || {};
        return `${first_name} ${last_name}`;
      },
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Teacher name
            <CaretSortIcon className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ renderValue }) => (
        <div className='ml-4'>{renderValue() as ReactNode}</div>
      ),
    },
    {
      id: 'Class name',
      accessorFn: (originalRow) => {
        return originalRow.classes?.name;
      },
      header: 'Class name',
      cell: ({ renderValue }) => (
        <div className='lowercase'>{renderValue() as ReactNode}</div>
      ),
    },
    {
      id: 'Subject',
      accessorFn: (originalRow) => {
        return originalRow.subjects?.name;
      },
      header: 'Subject',
      cell: ({ renderValue }) => (
        <div className='lowercase'>{renderValue() as ReactNode}</div>
      ),
    },
    {
      id: 'Days',
      accessorFn: (originalRow) => {
        return JSON.parse(originalRow.day_of_week ?? '[]').join(',');
      },
      header: 'Days',
      cell: ({ renderValue }) => (
        <div className='lowercase'>{renderValue() as ReactNode}</div>
      ),
    },
    {
      id: 'Timing',
      accessorFn: (originalRow) => {
        return `${originalRow.start_time} - ${originalRow.end_time}`;
      },
      header: 'Timing',
      cell: ({ renderValue }) => (
        <div className='lowercase'>{renderValue() as ReactNode}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
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
                <AddTimeTable
                  refreshTimeTables={refreshTimeTables}
                  isEditing={true}
                  initialValues={row.original}
                />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteConfimModal
                  title='Delete class'
                  description={`Are you sure, you want to delete this class?`}
                  onConfirm={() => deleteTimeTable(row.original)}
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

export default useTimeTableColumns;
