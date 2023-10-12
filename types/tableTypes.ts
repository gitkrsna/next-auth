import { Database } from 'types/supabase';

export type User = Database['public']['Tables']['user']['Row'];
export type Course = Database['public']['Tables']['courses']['Row'];
export type Subject = Database['public']['Tables']['subjects']['Row'];
export type Teacher = Database['public']['Tables']['teacher']['Row'] & {
  user: User;
};
export type Class = Database['public']['Tables']['classes']['Row'] & {
  user: User;
} & { courses: Course };
export type TimeTable = Database['public']['Tables']['timetable']['Row'] & {
  teacher: Teacher;
} & { classes: Class } & { subjects: Subject };
