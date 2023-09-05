import { Database } from 'types/supabase';

export type Course = Database['public']['Tables']['courses']['Row'];
export type Subject = Database['public']['Tables']['subjects']['Row'];
