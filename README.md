# keep-it-up Project Structure

```
vercel-keep-alive/
├── api/
│   └── keep-alive.js              # Main serverless function
├── public/                        # (Optional) Static files
│   └── favicon.ico
├── .env.local                     # Environment variables for local development
├── .env.example                   # Example environment file
├── .gitignore                     # Git ignore file
├── vercel.json                    # Vercel configuration with cron jobs
├── package.json                   # Project dependencies (optional)
└── README.md                      # Project documentation
```

## File Contents:

### `/api/keep-alive.js`

Your main serverless function (already provided above)

### `/vercel.json`

```json
{
  "functions": {
    "api/keep-alive.js": {
      "maxDuration": 60
    }
  },
  "crons": [
    {
      "path": "/api/keep-alive",
      "schedule": "*/10 * * * *"
    }
  ]
}
```

### `/.env.local`

```bash
RENDER_URL=https://your-backend-app.onrender.com/health
```

### `/.env.example`

```bash
# Copy this to .env.local and fill in your values
RENDER_URL=https://your-backend-app.onrender.com/health
```

### `/.gitignore`

```
# Dependencies
node_modules/

# Environment variables
.env
.env.local
.env.production

# Vercel
.vercel

# Logs
*.log

# OS generated files
.DS_Store
Thumbs.db
```

### `/package.json` (Optional - only if you need dependencies)

```json
{
  "name": "vercel-keep-alive",
  "version": "1.0.0",
  "description": "Keep Render backend server alive with Vercel cron jobs",
  "scripts": {
    "dev": "vercel dev",
    "build": "echo 'No build step needed for serverless functions'"
  },
  "dependencies": {},
  "devDependencies": {
    "vercel": "^32.0.0"
  }
}
```

### `/README.md`

````markdown
# 🚀 Render Keep-Alive with Vercel Cron Jobs

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Frender-keep-alive)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=flat&logo=vercel&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)

> **Never let your Render.com free-tier backend sleep again!** 💤➡️⚡

A lightweight, serverless solution that automatically pings your Render backend every 10 minutes to prevent cold starts and keep your application responsive 24/7.

## 🎯 Why This Exists

Render.com's free tier spins down inactive applications after 15 minutes of no traffic. This causes:

- ❌ Cold start delays (10-30 seconds)
- ❌ Poor user experience
- ❌ Failed API calls during spin-up
- ❌ Timeouts and 503 errors

**This solution fixes all of that!** ✨

## ✨ Features

- 🔄 **Automatic pinging** every 10 minutes
- 🎯 **Health check endpoint** support
- 📊 **Detailed logging** and monitoring
- ⚡ **Zero maintenance** - set it and forget it
- 🆓 **Completely free** to run on Vercel
- 🛡️ **Error handling** and timeout protection
- 📱 **JSON responses** for easy debugging

## 🚀 Quick Start

### 1-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Frender-keep-alive)

### Manual Setup

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/render-keep-alive.git
   cd render-keep-alive
   ```
````

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Render URL
   ```

3. **Deploy to Vercel**

   ```bash
   npm i -g vercel
   vercel
   ```

4. **Configure environment variables in Vercel Dashboard**
   - Go to your project settings
   - Add `RENDER_URL` with your backend URL
   - Redeploy if needed

## 🔧 Configuration

### Environment Variables

| Variable     | Description                                          | Example                             |
| ------------ | ---------------------------------------------------- | ----------------------------------- |
| `RENDER_URL` | Your Render backend URL (preferably health endpoint) | `https://myapp.onrender.com/health` |

### Customizing the Schedule

Edit `vercel.json` to change the ping frequency:

```json
{
  "crons": [
    {
      "path": "/api/keep-alive",
      "schedule": "*/10 * * * *" // Every 10 minutes
    }
  ]
}
```

**Common schedules:**

- `*/5 * * * *` - Every 5 minutes (more aggressive)
- `*/15 * * * *` - Every 15 minutes (just before Render timeout)
- `0 */1 * * *` - Every hour (minimal pings)

## 📊 Monitoring & Debugging

### Check if it's working

Visit your function URL to see the status:

```
https://your-vercel-app.vercel.app/api/keep-alive
```

### Sample Response

```json
{
  "success": true,
  "message": "Server pinged successfully",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "status": 200,
  "url": "https://myapp.onrender.com/health"
}
```

### View Logs

- Go to Vercel Dashboard → Your Project → Functions tab
- Click on `/api/keep-alive` to see execution logs
- Check for any errors or failed pings

## 🏗️ Backend Health Endpoint (Recommended)

Create a simple health endpoint in your backend for efficient pings:

### Express.js Example

```javascript
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});
```

### FastAPI Example

```python
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}
```

### Flask Example

```python
@app.route('/health')
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}
```

## 💰 Cost Analysis

| Service                         | Cost      | Notes                       |
| ------------------------------- | --------- | --------------------------- |
| **Vercel Hobby**                | ❌ Free   | Cron jobs not supported     |
| **Vercel Pro**                  | $20/month | Unlimited cron jobs         |
| **Alternative: GitHub Actions** | ✅ Free   | 2000 minutes/month          |
| **Alternative: Uptime Robot**   | ✅ Free   | 50 monitors, 5min intervals |

## ⚠️ Important Notes

- **Vercel Pro Required**: Cron jobs need Vercel Pro plan ($20/month)
- **Rate Limits**: Be respectful with ping frequency
- **Render Limits**: Even with keep-alive, Render free tier has monthly hour limits
- **Cold Starts**: First request after deployment might still be slow

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Ideas for contributions:

- [ ] Support for multiple backend URLs
- [ ] Slack/Discord notifications on failures
- [ ] Dashboard for monitoring multiple services
- [ ] Support for different cloud providers
- [ ] Health check with custom headers/auth

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the Vercel team for serverless functions and cron jobs
- Inspired by the developer community's need for reliable free hosting
- Built with ❤️ for developers using Render.com free tier

## ⭐ Star History

If this project helped you, please consider giving it a star! It helps others discover this solution.

---

**Made with ❤️ by the community, for the community**

_Have questions? Open an issue or start a discussion!_

````

## Quick Setup Commands:

```bash
# Create project directory
mkdir vercel-keep-alive
cd vercel-keep-alive

# Create folders
mkdir api
mkdir public

# Create files (you'll need to add the content manually)
touch api/keep-alive.js
touch vercel.json
touch .env.local
touch .env.example
touch .gitignore
touch package.json
touch README.md
````

## Deployment Steps:

1. **Initialize Git** (if not already):

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Deploy to Vercel**:

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

3. **Set Environment Variable**:
   - Go to your Vercel dashboard
   - Navigate to your project → Settings → Environment Variables
   - Add: `RENDER_URL` = `https://your-backend-app.onrender.com/health`
   - Redeploy if needed

That's the complete folder structure! The most important files are `api/keep-alive.js` and `vercel.json` - everything else is optional but recommended for a complete project.
