import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
    if (!supabaseClient) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required');
        }

        supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    }
    return supabaseClient;
}

// Lazy initialization - only creates client when accessed at runtime
// This prevents build-time errors when env vars aren't available
export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        const client = getSupabaseClient();
        const value = client[prop as keyof SupabaseClient];
        // If it's a function, bind it to the client
        if (typeof value === 'function') {
            return value.bind(client);
        }
        // If it's an object (like .from()), return a proxy for it too
        if (typeof value === 'object' && value !== null) {
            return value;
        }
        return value;
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
