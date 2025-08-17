const express = require("express");
const app = express();
const dotenv = require("dotenv")

dotenv.config()

const BACKEND_URL = "https://adda247-0u72.onrender.com/health";
console.warn("🚀 ~ BACKEND_URL:", BACKEND_URL)

async function hitBackend() {
    console.warn("🚀 ~ hitBackend : triggered")
    try {
        const response = await fetch(BACKEND_URL);
        console.log('Backend hit:', response.status);
    } catch (error) {
        console.log('Error:', error.message);
    }
}

app.get("/", (req, res) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Keep-It-Up: Keep Your Backend Up 🔥</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6; color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .hero {
            text-align: center; background: white; border-radius: 20px;
            padding: 40px 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        .hero h1 {
            font-size: 2.5rem; margin-bottom: 15px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .status {
            background: #f8f9fa; border-radius: 15px; padding: 20px;
            margin-bottom: 30px; border-left: 5px solid #28a745;
        }
        .status h3 { color: #28a745; margin-bottom: 10px; }
        .section {
            background: white; border-radius: 15px; padding: 30px;
            margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .footer { text-align: center; padding: 20px; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <div class="hero">
            <h1>Keep-It-Up: Keep Your Backend Up 🔥</h1>
            <p>Say goodbye to cold starts forever! Keep your free-tier apps awake and ready.</p>
        </div>
        <div class="status">
            <h3>🟢 Service Status: Active</h3>
            <p>Your backend ping service is running smoothly!</p>
        </div>
        <div class="section">
            <h2>🥶 The Problem: The Cold Start</h2>
            <p>Ever hit a URL for your personal project and had to wait for it to load? That's a "cold start" - Keep-It-Up fixes that! ✨</p>
        </div>
    </div>
    <div class="footer">
        <p>Made with ❤️ for developers who hate cold starts</p>
    </div>
</body>
</html>
  `;
    res.send(html);
});

app.listen(3000, () => {
    console.warn("Server ready on port 3000.");
    setInterval(hitBackend, 1000);
});

module.exports = app;