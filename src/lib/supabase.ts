import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
    if (supabaseClient) {
        return supabaseClient;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Only create client if we have valid credentials
    if (!supabaseUrl || !supabaseAnonKey) {
        // Return a mock client that will fail gracefully at runtime
        // Use a valid URL format to pass Supabase's validation
        supabaseClient = createClient(
            'https://placeholder.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwiaWF0IjoxNjQwOTk5OTk5LCJleHAiOjE5NTY1NzU5OTl9.placeholder'
        );
        return supabaseClient;
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseClient;
}

export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        return getSupabaseClient()[prop as keyof SupabaseClient];
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
