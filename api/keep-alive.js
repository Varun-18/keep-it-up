// api/keep-alive.js
export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Replace with your actual Render backend URL + health endpoint
        const RENDER_URL = process.env.RENDER_URL || 'https://your-app.onrender.com/health';

        console.log(`Pinging server: ${RENDER_URL}`);

        // Make a GET request to your Render server
        const response = await fetch(RENDER_URL, {
            method: 'GET',
            headers: {
                'User-Agent': 'Vercel-KeepAlive/1.0',
            },
            // Set a timeout to avoid hanging
            signal: AbortSignal.timeout(30000), // 30 second timeout
        });

        const timestamp = new Date().toISOString();

        if (response.ok) {
            console.log(`✅ Server pinged successfully at ${timestamp}`);
            return res.status(200).json({
                success: true,
                message: 'Server pinged successfully',
                timestamp,
                status: response.status,
                url: RENDER_URL
            });
        } else {
            console.log(`⚠️ Server responded with status ${response.status} at ${timestamp}`);
            return res.status(200).json({
                success: false,
                message: `Server responded with status ${response.status}`,
                timestamp,
                status: response.status,
                url: RENDER_URL
            });
        }

    } catch (error) {
        const timestamp = new Date().toISOString();
        console.error(`❌ Error pinging server at ${timestamp}:`, error.message);

        return res.status(200).json({
            success: false,
            message: 'Failed to ping server',
            error: error.message,
            timestamp,
            url: process.env.RENDER_URL || 'URL not configured'
        });
    }
}