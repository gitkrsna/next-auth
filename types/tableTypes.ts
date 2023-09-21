import { Database } from 'types/supabase';

export type User = Database['public']['Tables']['users']['Row'];
export type Course = Database['public']['Tables']['courses']['Row'];
export type Subject = Database['public']['Tables']['subjects']['Row'];
export type Teacher = Database['public']['Tables']['teachers']['Row'] & {
  users: User;
};
