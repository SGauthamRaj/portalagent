# 📊 ReportPortal Agent

An intelligent Test Report Analytics Dashboard for ReportPortal. Easily browse and view your test suite results with a beautiful, modern interface.

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

## ✨ Features

- 🔍 **Searchable Suite Dropdown** - Quickly find test suites from 400+ options
- 📈 **Real-time Statistics** - View pass/fail rates, duration, and more
- ❌ **Failed Test Details** - See exactly which tests failed
- 🔗 **Direct Links** - Jump straight to ReportPortal for detailed analysis
- 🎨 **Modern Dark UI** - Beautiful, eye-friendly interface
- 🚀 **Zero Dependencies** - Pure Node.js, no npm install needed!

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/portalagent.git
cd portalagent
```

### 2. Configure Environment

```bash
# Copy the example config
cp env.example .env

# Edit with your ReportPortal credentials
nano .env
```

Set these values in `.env`:
```
# ReportPortal API Configuration
RP_HOST=your-reportportal-host.com
RP_TOKEN=your-api-token
RP_PROJECT=your-project-name

# REST API Reports Portal (Basic Auth)
REST_REPORTS_HOST=reporting-portal.qa.staging.integrator.io
REST_REPORTS_USER=your-username
REST_REPORTS_PASS=your-password
```

**⚠️ Security Note:** Never commit your `.env` file! It should already be in `.gitignore`.

### 3. Start the Server

```bash
node server.js
```

### 4. Open in Browser

```
http://localhost:8080
```

## ☁️ Deploy to Cloud

### Deploy to Vercel

1. Fork this repository
2. Import to Vercel: https://vercel.com/new
3. Add environment variables:
   - `RP_HOST`
   - `RP_TOKEN`
   - `RP_PROJECT`
   - `REST_REPORTS_HOST`
   - `REST_REPORTS_USER`
   - `REST_REPORTS_PASS`
4. Deploy!

### Deploy to Render

1. Fork this repository
2. Create new Web Service on Render
3. Connect your repo
4. Add environment variables
5. Deploy!

### Deploy to Railway

```bash
railway login
railway init
railway add
railway variables set RP_HOST=your-host RP_TOKEN=your-token RP_PROJECT=your-project
railway up
```

## ⚙️ Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `RP_HOST` | ReportPortal server hostname | Yes |
| `RP_TOKEN` | API Bearer Token | Yes |
| `RP_PROJECT` | Project name in ReportPortal | Yes |
| `REST_REPORTS_HOST` | REST API Reports Portal hostname | Yes |
| `REST_REPORTS_USER` | REST Reports username | Yes |
| `REST_REPORTS_PASS` | REST Reports password | Yes |
| `PORT` | Server port | No (default: 8080) |

### Getting Your API Token

1. Log in to ReportPortal
2. Go to **Profile** (click your avatar)
3. Navigate to **API Keys**
4. Generate a new API key
5. Copy and use as `RP_TOKEN`

## 🏗️ Project Structure

```
portalagent/
├── index.html           # Main UI (single page app)
├── live-dashboard.html  # Live dashboard for REST reports
├── server.js            # Node.js proxy server
├── package.json         # Project metadata
├── vercel.json          # Vercel deployment config
├── env.example          # Example environment config
├── .env                 # Your credentials (DO NOT COMMIT!)
├── .gitignore           # Git ignore rules
├── SECURITY.md          # Security best practices
└── README.md            # This file
```

## 🖥️ Usage

1. **Select Environment** - Choose your ReportPortal environment
2. **Select Test Suite** - Use the dropdown to find your suite
3. **View Results** - See statistics, pass rate, and failed tests
4. **Click "View in ReportPortal"** - Jump to full details

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS (no frameworks!)
- **Backend**: Node.js (simple proxy server)
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Plus Jakarta Sans, JetBrains Mono

## 🔒 Security

**All credentials are stored server-side only!** ✅

- ✅ **Server-side credential storage** - Credentials never sent to client
- ✅ **Dynamic URL generation** - Authenticated URLs created on-demand via API endpoint
- ✅ **Environment-based config** - Easy credential management via `.env` file
- ✅ **No client-side secrets** - Clean separation of concerns
- ✅ **CORS handled by proxy** - Secure cross-origin requests
- ✅ **SSL/TLS communication** - Encrypted connections to ReportPortal

**📖 See [SECURITY.md](./SECURITY.md) for detailed security practices and deployment guidelines.**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Acknowledgments

- [ReportPortal](https://reportportal.io/) - Test reporting platform
- Built with ❤️ for QA teams everywhere
