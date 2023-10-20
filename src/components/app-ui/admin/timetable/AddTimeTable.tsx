'use client';

import FormSubmitBtn from '@/components/shared-ui/FormSubmitBtn';
import GenDatePicker from '@/components/shared-ui/GenDatePicker';
import GenForm from '@/components/shared-ui/GenForm';
import GenInput from '@/components/shared-ui/GenInput';
import { GenSearchableMultiSelect } from '@/components/shared-ui/GenSearchableMultiSelect';
import GenSearchableSelect from '@/components/shared-ui/GenSearchableSelect';
import GenSelect from '@/components/shared-ui/GenSelect';
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
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from '@radix-ui/react-icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Delete, Plus, Trash2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FormFieldType, SelectOption } from 'types/appTypes';
import { Database } from 'types/supabase';
import { TimeTable, Teacher } from 'types/tableTypes';
import { v4 } from 'uuid';
import * as z from 'zod';

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

const formSchema = z.object({
  id: z.string(),
  class_id: z.string().nonempty('Field required'),
  class_time_table: z.array(
    z.object({
      subject_id: z.string().nonempty('Field required'),
      teacher_id: z.string().nonempty('Field required'),
      start_time: z.string().nonempty('Field required'),
      end_time: z.string().nonempty('Field required'),
      day_of_week: z.string().array().nonempty('Field required'),
    })
  ),
  created_at: z.string().or(z.null()),
});
// .refine(
//   (data) => {
//     return data.start_time < data.end_time;
//   },
//   {
//     message: 'End time cannot be earlier than start time.',
//     path: ['end_time'],
//   }
// );

interface ClassTimeTable {
  id: string;
  class_id: string;
  class_time_table: {
    start_time: string;
    end_time: string;
    day_of_week: string;
    subject_id: string;
    teacher_id: string;
  }[];
  created_at: string | null;
}

interface AddTimeTableProps {
  isEditing?: boolean;
  initialValues?: ClassTimeTable;
  refreshTimeTables?: () => void;
}

const AddTimeTable = ({
  isEditing = false,
  initialValues = {
    id: '',
    class_id: '',
    class_time_table: [
      {
        start_time: '',
        end_time: '',
        day_of_week: '',
        subject_id: '',
        teacher_id: '',
      },
    ],
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

  const addFieldRow = (fieldKey: string) => {
    const newFields: FormFieldType[] = [
      {
        name: `start_time_${fieldKey}`,
        label: 'Start Time',
        controlType: 'time',
      },
      {
        name: `end_time_${fieldKey}`,
        label: 'End Time',
        controlType: 'time',
      },
      {
        name: `teacher_id_${fieldKey}`,
        label: 'Select Teacher',
        options: teachers,
        fieldType: 'searchableSelect',
      },
      {
        name: `subject_id_${fieldKey}`,
        label: 'Select Subject',
        options: subjects,
        fieldType: 'searchableSelect',
      },
      {
        name: `day_of_week_${fieldKey}`,
        label: 'Days of Week',
        options: weekdaysOptions,
        fieldType: 'multiSelect',
      },
    ];
    setFields((prevFields) => [newFields, ...prevFields]);
  };

  useEffect(() => {
    if (teachers.length > 0 && subjects.length > 0) {
      addFieldRow(v4());
    }
  }, [subjects, teachers]);

  const [fields, setFields] = useState<(FormFieldType | FormFieldType[])[]>([]);

  const removeFieldRow = (rowIndex: number) => {
    setFields((prevFields) => [
      ...prevFields.slice(0, rowIndex),
      ...prevFields.slice(rowIndex + 1),
    ]);
  };

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

  const FormFieldComponent = ({
    name,
    label,
    placeholder = '',
    description = '',
    fieldType = 'input',
    controlType = 'text',
    options,
  }: FormFieldType) => (
    <FormField
      key={name}
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            {fieldType == 'input' && (
              <GenInput
                disabled={isSubmitting}
                placeholder={placeholder}
                field={field}
                controlType={controlType}
              />
            )}
            {fieldType == 'datepicker' && (
              <GenDatePicker
                disabled={isSubmitting}
                placeholder={placeholder}
                field={field}
              />
            )}
            {fieldType == 'select' && (
              <GenSelect
                disabled={isSubmitting}
                placeholder={placeholder}
                field={field}
                options={options}
              />
            )}
            {fieldType == 'searchableSelect' && (
              <GenSearchableSelect
                disabled={isSubmitting}
                placeholder={placeholder}
                field={field}
                options={options}
                form={form}
              />
            )}
            {fieldType == 'multiSelect' && (
              <GenSearchableMultiSelect
                disabled={isSubmitting}
                placeholder={placeholder}
                field={field}
                options={options}
                form={form}
              />
            )}
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, console.log)}
        className='space-y-8'
      >
        {fields.map((field, index) =>
          Array.isArray(field) ? (
            <>
              <div key={index} className='flex gap-12'>
                <div className='flex gap-24 flex-wrap'>
                  {field.map((subField) => (
                    <div key={subField.name} className='max-w-[200px]'>
                      <FormFieldComponent key={subField.name} {...subField} />
                    </div>
                  ))}
                </div>
                <div>
                  {index == 0 ? (
                    <Plus onClick={() => addFieldRow(v4())} />
                  ) : (
                    <Trash2Icon onClick={() => removeFieldRow(index)} />
                  )}
                </div>
              </div>
            </>
          ) : (
            <FormFieldComponent key={field.name} {...field} />
          )
        )}

        <FormSubmitBtn isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default AddTimeTable;
