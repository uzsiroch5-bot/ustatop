const http = require('http');

function get(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error('Invalid JSON: ' + data));
                }
            });
        }).on('error', reject);
    });
}

async function testUserAPI() {
    try {
        console.log('--- Testing getUserById ---');
        // sefsefs ID from previous check: 69bd7a2cbb3f4cbb190e0509
        const userId = '69bd7a2cbb3f4cbb190e0509';
        let data = await get(`http://localhost:5000/api/auth/user/${userId}`);
        console.log('User found:', data.name);
    } catch (e) {
        console.error('Test failed:', e.message);
    }
}

testUserAPI();
