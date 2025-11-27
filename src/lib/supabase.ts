import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

console.log('Supabase Init:', { 
  url: supabaseUrl, 
  hasKey: !!supabaseAnonKey, 
  isPlaceholder: supabaseUrl === 'https://placeholder.supabase.co' 
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
    id: string;
    email: string;
    subscription_tier: 'free' | 'pro' | 'unlimited';
    credits_remaining: number;
    stripe_customer_id?: string;
    stripe_subscription_id?: string;
    created_at: string;
}

export interface Project {
    id: string;
    user_id: string;
    status: 'uploading' | 'processing' | 'ready' | 'failed';
    source_url: string;
    duration: number;
    transcript_json?: any;
    created_at: string;
}

export interface Clip {
    id: string;
    project_id: string;
    start_time: number;
    end_time: number;
    title: string;
    aspect_ratio: '9:16' | '1:1' | '16:9';
    caption_settings?: any;
    export_url?: string;
}
