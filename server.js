const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load .env file if exists
try {
    const envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, ...values] = line.split('=');
        if (key && values.length) {
            process.env[key.trim()] = values.join('=').trim();
        }
    });
} catch (e) {
    // .env file not found, using environment variables
}

const PORT = process.env.PORT || 8080;

// ReportPortal Configuration (from environment variables)
const RP_CONFIG = {
    host: process.env.RP_HOST || 'reportportal.qa.staging.integrator.io',
    token: process.env.RP_TOKEN || process.env.RP_API_TOKEN || '',
    project: process.env.RP_PROJECT || 'staging_suites'
};

// Validate configuration
if (!RP_CONFIG.token) {
    console.error('\n⚠️  Warning: RP_TOKEN environment variable is not set!');
    console.error('   Set it using: export RP_TOKEN=your-api-token\n');
}

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Proxy request to ReportPortal
function proxyToReportPortal(apiPath, res) {
    const options = {
        hostname: RP_CONFIG.host,
        port: 443,
        path: apiPath,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${RP_CONFIG.token}`,
            'Content-Type': 'application/json'
        },
        rejectUnauthorized: false
    };

    const proxyReq = https.request(options, (proxyRes) => {
        let data = '';
        
        proxyRes.on('data', chunk => {
            data += chunk;
        });
        
        proxyRes.on('end', () => {
            res.writeHead(proxyRes.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(data);
        });
    });

    proxyReq.on('error', (error) => {
        console.error('Proxy error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    });

    proxyReq.end();
}

// Create server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end();
        return;
    }

    // API Proxy
    if (pathname.startsWith('/api/')) {
        const apiPath = pathname + (parsedUrl.search || '');
        proxyToReportPortal(apiPath, res);
        return;
    }

    // Serve static files
    if (pathname === '/') {
        pathname = '/index.html';
    }

    const filePath = path.join(__dirname, pathname);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Not Found');
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                                                                ║');
    console.log('║   📊 ReportPortal Agent Started!                               ║');
    console.log('║                                                                ║');
    console.log(`║   🌐 URL: http://localhost:${PORT}                                ║`);
    console.log(`║   📡 ReportPortal: ${RP_CONFIG.host.substring(0, 35).padEnd(35)}  ║`);
    console.log(`║   📁 Project: ${RP_CONFIG.project.padEnd(40)}  ║`);
    console.log('║                                                                ║');
    console.log('║   Press Ctrl+C to stop                                         ║');
    console.log('║                                                                ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');
});

// Export for Vercel serverless
module.exports = server;
