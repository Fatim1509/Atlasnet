# 🛡️ AtlasNet v2.0 - Zero-Config Deployment

<div align="center">

![AtlasNet](https://img.shields.io/badge/AtlasNet-v2.0.0-00d9ff?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge)

**Educational Cybersecurity Observation Dashboard**
**✨ Zero Database • ⚡ Instant Deploy • 🚀 Railway & Vercel Ready**

</div>

---

## 🎯 What's New in v2.0

- ✅ **NO Database Required** - Pure in-memory data storage
- ✅ **Zero Configuration** - Works out of the box
- ✅ **One-Click Deploy** - Railway + Vercel deployment ready
- ✅ **500 Pre-generated Events** - Instant data on startup
- ✅ **Production Optimized** - Fast, lightweight, scalable

---

## 🚀 Quick Deploy (5 Minutes)

### 1. Clone from GitHub

```bash
git clone https://github.com/Fatim1509/Atlasnet.git
cd Atlasnet
```

**Repository:** https://github.com/Fatim1509/Atlasnet

### 2. Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your AtlasNet repository
4. Set **Root Directory**: `backend`
5. Railway auto-detects Python and deploys!
6. Copy your Railway URL (e.g., `https://your-app.railway.app`)

### 3. Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project" → Import your GitHub repo
3. Set **Root Directory**: `frontend`
4. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-railway-url.railway.app/api`
5. Deploy!

**Done! Your AtlasNet is live! 🎉**

---

## 💻 Local Development

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
# Backend runs on http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

---

## 📦 Features

### 📊 Dashboard
- Real-time statistics (Total Events, Active Decoys, Unique IPs)
- Activity timeline chart (last 7 days)
- Top attacker IPs table
- Risk metrics and severity distributions

### ⏱️ Timeline
- Chronological event view
- Filter by time range (24h, 7d, 30d)
- Event details with severity indicators
- Source IP and target service tracking

### 🔍 Analysis
- Attack type distribution (Pie chart)
- Category breakdowns with percentages
- Activity heatmap (hourly/daily patterns)
- Severity analysis per category

### 🎓 Replay
- Step-by-step attack walkthroughs
- Educational notes for each event
- Mitigation strategies
- Multiple scenarios (brute force, reconnaissance, fuzzing, DoS)

### ℹ️ About
- Project information
- Technology stack details
- Ethical use guidelines
- Quick deployment guide

---

## 🛠️ Technology Stack

**Backend:**
- Python 3.11+
- FastAPI (Web framework)
- In-memory data storage (No database!)
- Pre-generated 500 security events

**Frontend:**
- Next.js 14 (React framework)
- TypeScript (Type safety)
- Tailwind CSS (Styling)
- Recharts (Data visualization)

**Deployment:**
- Railway (Backend hosting)
- Vercel (Frontend hosting)
- Zero configuration required

---

## 📁 Project Structure

```
AtlasNet/
├── backend/
│   ├── main.py              # FastAPI app with in-memory data
│   ├── requirements.txt     # Python dependencies
│   ├── railway.json         # Railway configuration
│   └── Procfile            # Alternative deployment config
│
├── frontend/
│   ├── app/                # Next.js pages
│   │   ├── page.tsx        # Dashboard
│   │   ├── timeline/       # Timeline page
│   │   ├── analysis/       # Analysis page
│   │   ├── replay/         # Replay page
│   │   └── about/          # About page
│   ├── components/         # React components
│   ├── lib/                # API utilities
│   ├── styles/             # Global styles
│   └── package.json        # Node dependencies
│
└── README.md               # This file
```

---

## 🔥 API Endpoints

All endpoints return JSON data:

- `GET /` - API info and health check
- `GET /api/stats` - Dashboard statistics
- `GET /api/timeline?days=7` - Time-series event data
- `GET /api/behavior` - Attack category distribution
- `GET /api/heatmap` - Hourly activity heatmap
- `GET /api/replay?scenario=brute_force` - Educational scenarios
- `GET /api/events?limit=100` - Paginated event list
- `GET /api/top-ips?limit=10` - Top attacker IPs
- `GET /api/decoys` - Decoy service information
- `GET /health` - Health check

**Interactive Docs:** Visit `/docs` on your deployed backend!

---

## 🎓 Educational Value

This platform helps you learn:
- **Attack Pattern Recognition** - Identify different attack types
- **Risk Assessment** - Understand severity and scoring
- **Defensive Strategies** - Learn mitigation techniques
- **Security Monitoring** - Practice event analysis
- **Incident Response** - Develop threat prioritization skills

**Use Cases:**
- University cybersecurity courses
- SOC analyst training
- Security certification prep
- Personal skill development
- Portfolio projects

---

## ⚖️ Ethical & Legal Notice

⚠️ **EDUCATIONAL USE ONLY**

This software is designed exclusively for:
- ✅ Educational purposes
- ✅ Research and learning
- ✅ Defensive security training
- ✅ Controlled environments

**Prohibited uses:**
- ❌ Attacking systems you don't own
- ❌ Unauthorized monitoring
- ❌ Malicious activities
- ❌ Violating laws

**All data is simulated. This is not an offensive security tool.**

---

## 🐛 Troubleshooting

### Backend won't start
- Check Python version: `python --version` (need 3.11+)
- Reinstall dependencies: `pip install -r requirements.txt`

### Frontend can't connect to API
- Verify `NEXT_PUBLIC_API_URL` environment variable
- Check if backend is running
- Ensure CORS is enabled (it is by default)

### Railway deployment fails
- Ensure root directory is set to `backend`
- Check Railway logs for errors
- Verify requirements.txt is present

### Vercel deployment fails
- Ensure root directory is set to `frontend`
- Check build logs
- Verify environment variables are set

---

## 📊 Sample Data

The backend generates 500 simulated security events on startup:

- **7 Attack Types**: brute_force, reconnaissance, fuzzing, dos_attempt, credential_stuffing, exploit_attempt, suspicious_traffic
- **4 Severity Levels**: low, medium, high, critical
- **5 Decoy Services**: SSH, HTTP, HTTPS, FTP, API
- **17 Countries**: Simulated global attack sources
- **7-Day Timespan**: Events distributed over past week

Data regenerates on each backend restart for fresh scenarios.

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

**Ethical Use Clause:** By using this software, you agree to use it only for educational and defensive security purposes in compliance with all applicable laws.

---

## 🌟 Acknowledgments

- **FastAPI** - Modern Python web framework
- **Next.js** - Powerful React framework
- **Recharts** - Beautiful data visualizations
- **Railway** - Effortless backend hosting
- **Vercel** - Seamless frontend deployment

---

<div align="center">

**Made with ❤️ for the cybersecurity community**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/Fatim1509/Atlasnet/issues) • [Request Feature](https://github.com/Fatim1509/Atlasnet/issues)

</div>
