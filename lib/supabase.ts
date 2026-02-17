import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'undefined');

if (!isSupabaseConfigured) {
  console.error('❌ Supabase configuration missing! Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to environment variables.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          id: string;
          slug: string;
          language: 'es' | 'en';
          title: string;
          subtitle: string | null;
          description: string | null;
          hero_image_url: string | null;
          content: Record<string, any>;
          meta_title: string | null;
          meta_description: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['pages']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['pages']['Insert']>;
      };
      services: {
        Row: {
          id: string;
          service_key: string;
          language: 'es' | 'en';
          title: string;
          description: string | null;
          bullets: string[];
          sub_sections: Array<{ title: string; content: string }>;
          image_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          language: 'es' | 'en';
          title: string;
          excerpt: string | null;
          content: string | null;
          category: string | null;
          tags: string[];
          author: string | null;
          image_url: string | null;
          is_featured: boolean;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
      messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          reason: string | null;
          message: string;
          is_read: boolean;
          is_archived: boolean;
          responded_at: string | null;
          response_notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at' | 'is_read' | 'is_archived'>;
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      media: {
        Row: {
          id: string;
          name: string;
          url: string;
          file_type: string | null;
          file_size: number | null;
          alt_text: string | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['media']['Insert']>;
      };
    };
  };
}
