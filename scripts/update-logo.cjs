const https = require('https');

const data = JSON.stringify({
    content: {
        hero: {
            images: [
                "https://ukpnnviyfkxpnpwwdhut.supabase.co/storage/v1/object/public/images/uploads/x15stpdjzbf_1771294766012.png",
                "https://ukpnnviyfkxpnpwwdhut.supabase.co/storage/v1/object/public/images/uploads/3vyqxusno4h_1771294780461.png",
                "https://ukpnnviyfkxpnpwwdhut.supabase.co/storage/v1/object/public/images/uploads/3gqc3bmp0pq_1771294789881.png",
                "https://ukpnnviyfkxpnpwwdhut.supabase.co/storage/v1/object/public/images/uploads/mmwezwk1f4_1771294798305.png"
            ]
        },
        collage: {
            image1: "https://ukpnnviyfkxpnpwwdhut.supabase.co/storage/v1/object/public/images/uploads/0k4g8heydvno_1771293396830.png",
            image2: "https://ukpnnviyfkxpnpwwdhut.supabase.co/storage/v1/object/public/images/uploads/zycit9x2a6b_1771293229514.png",
            image4: "https://ukpnnviyfkxpnpwwdhut.supabase.co/storage/v1/object/public/images/uploads/uo47cxa2hpb_1771293239132.png"
        },
        branding: {
            logoDark: "https://ukpnnviyfkxpnpwwdhut.supabase.co/storage/v1/object/public/images/uploads/5scxc35xb07_1771384434806.png",
            logoLight: "https://ukpnnviyfkxpnpwwdhut.supabase.co/storage/v1/object/public/images/uploads/rkfjgnjtk8_1771381625777.png",
            logoFallback: "https://ukpnnviyfkxpnpwwdhut.supabase.co/storage/v1/object/public/images/uploads/7d4t8ttq9g3_1771381367938.png"
        }
    }
});

const options = {
    hostname: 'ukpnnviyfkxpnpwwdhut.supabase.co',
    path: '/rest/v1/pages?id=eq.51d923a2-52c0-4fc5-b177-128c663ebaa4',
    method: 'PATCH',
    headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcG5udml5Zmt4cG5wd3dkaHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MTYxMjcsImV4cCI6MjA4Mzk5MjEyN30.Xfa1ms4FyblzPrzrjlrRyp_jcc1L-NIH33MZ9JRUheQ',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcG5udml5Zmt4cG5wd3dkaHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MTYxMjcsImV4cCI6MjA4Mzk5MjEyN30.Xfa1ms4FyblzPrzrjlrRyp_jcc1L-NIH33MZ9JRUheQ',
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.write(data);
req.end();
