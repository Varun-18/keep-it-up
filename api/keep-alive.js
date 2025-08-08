// api/keep-alive.js
export default function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const RENDER_URL = process.env.RENDER_URL || 'https://your-app.onrender.com/health';

    // Function to ping the Render server
    const pingServer = async () => {
        try {
            console.log(`Pinging server: ${RENDER_URL}`);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

            const response = await fetch(RENDER_URL, {
                method: 'GET',
                headers: { 'User-Agent': 'Vercel-KeepAlive/1.0' },
                signal: controller.signal
            });

            clearTimeout(timeout);
            const timestamp = new Date().toISOString();

            if (response.ok) {
                console.log(`✅ Server pinged successfully at ${timestamp}`);
            } else {
                console.log(`⚠️ Server responded with status ${response.status} at ${timestamp}`);
            }
        } catch (error) {
            console.error(`❌ Error pinging server: ${error.message}`);
        }
    };

    // Start the interval (every 10 minutes)
    pingServer(); // First run immediately
    setInterval(pingServer, 10 * 60 * 1000);

    res.status(200).json({
        message: `Keep-alive process started. Pinging ${RENDER_URL} every 10 minutes.`,
        intervalMinutes: 10
    });
}