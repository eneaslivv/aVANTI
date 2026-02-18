import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ukpnnviyfkxpnpwwdhut.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcG5udml5Zmt4cG5wd3dkaHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MTYxMjcsImV4cCI6MjA4Mzk5MjEyN30.Xfa1ms4FyblzPrzrjlrRyp_jcc1L-NIH33MZ9JRUheQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectResourcesPage() {
    console.log('Inspecting resources page...');

    const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', 'resources');

    if (error) {
        console.error('Error fetching pages:', error);
        return;
    }

    console.log('Found pages:', JSON.stringify(data, null, 2));
}

inspectResourcesPage();
