import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export const getSupabase = () => {
    if (!_supabase) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Missing Supabase environment variables');
        }
        
        _supabase = createClient(supabaseUrl, supabaseAnonKey);
    }
    return _supabase;
};

// For backwards compatibility - lazy getter
export const supabase = new Proxy({} as SupabaseClient, {
    get(_, prop) {
        return getSupabase()[prop as keyof SupabaseClient];
    }
});

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
