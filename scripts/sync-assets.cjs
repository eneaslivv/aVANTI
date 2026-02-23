const https = require('https');
const fs = require('fs');

// Load the fetched data
const content = fs.readFileSync('all_pages_data.json', 'utf8');
const allPages = JSON.parse(content.charCodeAt(0) === 0xFEFF ? content.slice(1) : content);

// Define the assets to sync
const ASSETS_TO_SYNC = {
    home: ['branding'],
    about: ['hero'],
    resources: ['hero'],
    contact: ['hero']
};

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'ukpnnviyfkxpnpwwdhut.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY; // We'll pass this via env var or hardcode for this script run if needed

// Helper to update a page
function updatePage(slug, content) {
    const data = JSON.stringify({ content });

    const options = {
        hostname: SUPABASE_URL,
        path: `/rest/v1/pages?slug=eq.${slug}&language=eq.en`,
        method: 'PATCH',
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcG5udml5Zmt4cG5wd3dkaHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MTYxMjcsImV4cCI6MjA4Mzk5MjEyN30.Xfa1ms4FyblzPrzrjlrRyp_jcc1L-NIH33MZ9JRUheQ',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcG5udml5Zmt4cG5wd3dkaHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MTYxMjcsImV4cCI6MjA4Mzk5MjEyN30.Xfa1ms4FyblzPrzrjlrRyp_jcc1L-NIH33MZ9JRUheQ',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const req = https.request(options, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => responseBody += chunk);
        res.on('end', () => {
            console.log(`Updated ${slug} (en): Status ${res.statusCode}`);
            if (res.statusCode >= 400) {
                console.error(`Error details: ${responseBody}`);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`Error updating ${slug}:`, e);
    });

    req.write(data);
    req.end();
}

// Main logic
Object.keys(ASSETS_TO_SYNC).forEach(slug => {
    const esPage = allPages.find(p => p.slug === slug && p.language === 'es');
    const enPage = allPages.find(p => p.slug === slug && p.language === 'en');

    if (esPage && enPage) {
        let updatedContent = { ...enPage.content };
        let hasChanges = false;

        ASSETS_TO_SYNC[slug].forEach(field => {
            // Logic for deep merging if necessary, specifically for 'hero' which might have title/subtitle in English
            if (field === 'hero' && esPage.content.hero && updatedContent.hero) {
                // If English has title/subtitle, preserve them and only add image/images
                if (esPage.content.hero.image) {
                    updatedContent.hero.image = esPage.content.hero.image;
                    hasChanges = true;
                }
                if (esPage.content.hero.images) {
                    updatedContent.hero.images = esPage.content.hero.images;
                    hasChanges = true;
                }
            } else if (field === 'branding') {
                updatedContent.branding = esPage.content.branding;
                hasChanges = true;
            } else if (!updatedContent[field] && esPage.content[field]) {
                // Direct copy if missing
                updatedContent[field] = esPage.content[field];
                hasChanges = true;
            }
        });

        if (hasChanges) {
            console.log(`Syncing assets for ${slug}...`);
            updatePage(slug, updatedContent);
        } else {
            console.log(`No changes needed for ${slug}`);
        }
    } else {
        console.warn(`Missing pair for ${slug}: ES=${!!esPage}, EN=${!!enPage}`);
    }
});
