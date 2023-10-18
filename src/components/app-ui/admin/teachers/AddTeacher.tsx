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
import { FormFieldType } from 'types/appTypes';
import { Database } from 'types/supabase';
import { Teacher } from 'types/tableTypes';
import { v4 } from 'uuid';
import * as z from 'zod';

const formSchema = z.object({
  created_at: z.string(),
  employee_id: z.string().nonempty('Employee id required'),
  id: z.string(),
  joined_date: z.string().nonempty('Joining date required').or(z.date()),
  qualification: z.string().nonempty('Qualification required'),
  user_id: z.string(),
  user: z.object({
    id: z.string(),
    first_name: z.string().max(50).nonempty('First name required'),
    last_name: z.string().max(50).nonempty('Last name required'),
    email: z.string().email().nonempty('Email required'),
    password: z.string().nonempty('Password required'),
    role: z.literal('staff'),
    date_of_birth: z.string().nonempty('DOB required').or(z.date()),
    address: z.string().nonempty('Address required'),
    phone_number: z
      .string()
      .nonempty('Phone number required')
      .refine((value) => /^[6789]\d{9}$/.test(value), {
        message: 'Invalid phone number',
      }),
    created_at: z.string(),
  }),
});

interface AddTeacherProps {
  isEditing?: boolean;
  initialValues?: Teacher;
  refreshTeachers?: () => void;
}

const AddTeacher = ({
  isEditing = false,
  initialValues = {
    created_at: '',
    employee_id: '',
    id: '',
    joined_date: '',
    qualification: '',
    user_id: '',
    user: {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'staff',
      date_of_birth: '',
      address: '',
      phone_number: '',
      created_at: '',
    },
  },
  refreshTeachers,
}: AddTeacherProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues as any,
  });

  const fields: FormFieldType[] = [
    {
      name: 'user.first_name',
      label: 'First Name',
    },
    {
      name: 'user.last_name',
      label: 'Last Name',
    },
    {
      name: 'user.email',
      label: 'Email',
    },
    {
      name: 'user.password',
      label: 'Password',
    },
    {
      name: 'user.date_of_birth',
      label: 'DOB',
      fieldType: 'datepicker',
      placeholder: 'Select dob',
    },
    {
      name: 'user.address',
      label: 'Address',
    },
    {
      name: 'user.phone_number',
      label: 'Phone Number',
    },
    {
      name: 'employee_id',
      label: 'Employee Id',
    },
    {
      name: 'qualification',
      label: 'Qualification',
    },
    {
      name: 'joined_date',
      label: 'Joined Date',
      fieldType: 'datepicker',
      placeholder: 'Select joining date',
    },
  ];

  // useEffect(() => {
  //     open && form.reset()
  // }, [open, form])

  useEffect(() => {
    const supabase = createClientComponentClient<Database>();
    (async () => {
      const response = supabase.functions.invoke('actions', {
        body: {
          actionName: 'BULK_CREATE_STUDENT',
        },
      });
      console.log({ response });
    })();
  }, []);

  async function onSubmit(values: FieldValues) {
    setIsSubmitting(true);
    const supabase = createClientComponentClient<Database>();
    const { user, employee_id, qualification, joined_date, id } = values;
    if (isEditing) {
      const { error: userUpdateFailed } = await supabase
        .from('user')
        .update(user)
        .eq('id', user.id);

      if (userUpdateFailed) {
        showError();
        return;
      }

      const { error: teacherUpdateFailed } = await supabase
        .from('teacher')
        .update({
          employee_id,
          qualification,
          joined_date,
        })
        .eq('id', id);

      if (teacherUpdateFailed) {
        showError();
        return;
      }

      showSuccess('Teacher updated successfully');
    } else {
      const id = v4();

      const { error: userCreationFailed } = await supabase.from('user').insert({
        ...user,
        created_at: new Date(),
        id,
      });

      if (userCreationFailed) {
        setIsSubmitting(false);
        showError();
        return;
      }

      const { error: teacherCreationFailed } = await supabase
        .from('teacher')
        .insert({
          user_id: id,
          employee_id,
          qualification,
          joined_date,
        });

      if (teacherCreationFailed) {
        showError();
        return;
      }

      showSuccess('Teacher created successfully');
    }

    refreshTeachers?.();
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
            Add Teacher <PlusIcon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} teacher</DialogTitle>
          <DialogDescription>
            Add changes to teacher here. Click save when you&apos;re done.
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

export default AddTeacher;
