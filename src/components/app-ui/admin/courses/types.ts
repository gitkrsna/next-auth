import { Database } from 'types/supabase';

export type Course = Database['public']['Tables']['courses']['Row'];
