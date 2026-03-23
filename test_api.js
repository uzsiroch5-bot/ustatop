const http = require('http');

function get(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

async function testAPI() {
    try {
        console.log('--- Testing Santexnik Filter ---');
        let data = await get('http://localhost:5000/api/users/workers?category=santexnik');
        console.log(`Found ${data.length} workers:`, data.map(w => w.name + ' (' + w.category + ')'));

        console.log('\n--- Testing Payvandchi Filter ---');
        data = await get('http://localhost:5000/api/users/workers?category=payvandchi');
        console.log(`Found ${data.length} workers:`, data.map(w => w.name + ' (' + w.category + ')'));

        console.log('\n--- Testing Fargona Filter ---');
        data = await get('http://localhost:5000/api/users/workers?location=fargona');
        console.log(`Found ${data.length} workers:`, data.map(w => w.name + ' (' + w.location + ')'));

        console.log('\n--- Testing Toshkent Filter ---');
        data = await get('http://localhost:5000/api/users/workers?location=toshkent');
        console.log(`Found ${data.length} workers:`, data.map(w => w.name + ' (' + w.location + ')'));
    } catch (e) {
        console.error('Test failed:', e.message);
    }
}

testAPI();
