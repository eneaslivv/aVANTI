import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ukpnnviyfkxpnpwwdhut.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcG5udml5Zmt4cG5wd3dkaHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MTYxMjcsImV4cCI6MjA4Mzk5MjEyN30.Xfa1ms4FyblzPrzrjlrRyp_jcc1L-NIH33MZ9JRUheQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpsert() {
    console.log('Testing Upsert for Resources page...');

    const upsertData = {
        slug: 'resources',
        language: 'es',
        title: 'Recursos y Perspectivas',
        hero_image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop', // Default image
        is_published: true,
        content: {}
    };

    console.log('Upsert Data:', upsertData);

    const { data, error } = await supabase
        .from('pages')
        .upsert(upsertData, { onConflict: 'slug, language' })
        .select();

    if (error) {
        console.error('Upsert failed:', error);
    } else {
        console.log('Upsert successful:', data);
    }
}

testUpsert();
