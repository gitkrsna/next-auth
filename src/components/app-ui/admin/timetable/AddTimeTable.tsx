'use client';

import GenForm from '@/components/shared-ui/GenForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from '@radix-ui/react-icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FormFieldType, SelectOption } from 'types/appTypes';
import { Database } from 'types/supabase';
import { TimeTable, Teacher } from 'types/tableTypes';
import { v4 } from 'uuid';
import * as z from 'zod';

const formSchema = z
  .object({
    id: z.string(),
    start_time: z.string().nonempty('Field required'),
    end_time: z.string().nonempty('Field required'),
    day_of_week: z.string().array().nonempty('Field required'),
    class_id: z.string().nonempty('Field required'),
    subject_id: z.string().nonempty('Field required'),
    teacher_id: z.string().nonempty('Field required'),
    created_at: z.string().or(z.null()),
  })
  .refine(
    (data) => {
      return data.start_time < data.end_time;
    },
    {
      message: 'End time cannot be earlier than start time.',
      path: ['end_time'],
    }
  );

interface AddTimeTableProps {
  isEditing?: boolean;
  initialValues?: Omit<TimeTable, 'teacher' | 'classes' | 'subjects'>;
  refreshTimeTables?: () => void;
}

const AddTimeTable = ({
  isEditing = false,
  initialValues = {
    id: '',
    start_time: '',
    end_time: '',
    day_of_week: '',
    class_id: '',
    subject_id: '',
    teacher_id: '',
    created_at: null,
  },
  refreshTimeTables,
}: AddTimeTableProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues as any,
  });

  const [teachers, setTeachers] = useState<SelectOption[]>([]);
  const [classes, setClasses] = useState<SelectOption[]>([]);
  const [subjects, setSubjects] = useState<SelectOption[]>([]);
  const weekdaysOptions: SelectOption[] = [
    {
      label: 'Mon',
      value: 'Mon',
    },
    {
      label: 'Tue',
      value: 'Tue',
    },
    {
      label: 'Wed',
      value: 'Wed',
    },
    {
      label: 'Thu',
      value: 'Thu',
    },
    {
      label: 'Fri',
      value: 'Fri',
    },
    {
      label: 'Sat',
      value: 'Sat',
    },
  ];

  const fetchTeachers = async () => {
    const supabase = createClientComponentClient<Database>();

    const { data, error } = await supabase
      .from('teacher')
      .select('id, user(id, first_name, last_name)');

    if (!error) {
      const teacherOptions = (data || []).map(({ id, user }) => ({
        label: `${user?.first_name} ${user?.last_name}`,
        value: id,
      })) as SelectOption[];
      setTeachers(teacherOptions);
    }
  };

  const fetchClasses = async () => {
    const supabase = createClientComponentClient<Database>();

    const { data, error } = await supabase.from('classes').select('id, name');

    if (!error) {
      const classOptions = (data || []).map(({ id, name }) => ({
        label: name,
        value: id,
      })) as SelectOption[];
      setClasses(classOptions);
    }
  };

  const fetchSubject = async () => {
    const supabase = createClientComponentClient<Database>();

    const { data, error } = await supabase.from('subjects').select('id, name');

    if (!error) {
      const subjectOptions = (data || []).map(({ id, name }) => ({
        label: name,
        value: id,
      })) as SelectOption[];
      setSubjects(subjectOptions);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
    fetchSubject();
  }, []);

  const fields: FormFieldType[] = [
    {
      name: 'class_id',
      label: 'Select Class',
      fieldType: 'searchableSelect',
      options: classes,
    },
    {
      name: 'teacher_id',
      label: 'Select Teacher',
      options: teachers,
      fieldType: 'searchableSelect',
    },
    {
      name: 'subject_id',
      label: 'Select Subject',
      options: subjects,
      fieldType: 'searchableSelect',
    },
    {
      name: 'start_time',
      label: 'Start Time',
      controlType: 'time',
    },
    {
      name: 'end_time',
      label: 'End Time',
      controlType: 'time',
    },
    {
      name: 'day_of_week',
      label: 'Days of Week',
      options: weekdaysOptions,
      fieldType: 'multiSelect',
    },
  ];

  // useEffect(() => {
  //     open && form.reset()
  // }, [open, form])

  async function onSubmit(values: FieldValues) {
    setIsSubmitting(true);
    const supabase = createClientComponentClient<Database>();

    if (isEditing) {
      const { error: timeTableUpdateFailed } = await supabase
        .from('timetable')
        .update(values)
        .eq('id', values.id);
      if (timeTableUpdateFailed) {
        showError();
        return;
      }

      showSuccess('TimeTable updated successfully');
    } else {
      const id = v4();
      const { error: timetableCreationFailed } = await supabase
        .from('timetable')
        .insert({
          ...values,
          id,
        })
        .select('*');

      if (timetableCreationFailed) {
        setIsSubmitting(false);
        showError();
        return;
      }

      showSuccess('TimeTable created successfully');
    }

    refreshTimeTables?.();
    setIsSubmitting(false);
    setOpen(false);
  }

  function showSuccess(msg: string) {
    toast({
      description: msg,
    });
  }

  function showError() {
    toast({
      variant: 'destructive',
      description: 'Something went wrong, please try again later.',
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Edit
          </DropdownMenuItem>
        ) : (
          <Button className='ml-5'>
            Add TimeTable <PlusIcon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} timeTable</DialogTitle>
          <DialogDescription>
            Add changes to timeTable here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <GenForm
          form={form}
          isSubmitting={isSubmitting}
          fields={fields}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddTimeTable;
