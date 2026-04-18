import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tybebkidedofqavukggj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5YmVia2lkZWRvZ2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTI5NjEsImV4cCI6MjA4OTY2ODk2MX0.L-ZuwKzEcyZgYMjh6ePrp7pB1jjTkzDhEIo1UyYBSlo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  email: string;
  role: 'student' | 'admin';
  name?: string;
  first_name?: string;
  last_name?: string;
  grade?: string;
  division?: string;
  governorate?: string;
  city?: string;
  student_phone?: string;
  parent_phone?: string;
  birth_date?: string;
  gender?: string;
  wallet?: number;
  status?: 'active' | 'blocked';
  created_at?: string;
}
