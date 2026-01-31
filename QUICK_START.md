# 🚀 AtlasNet Quick Start Guide

## 📍 GitHub Repository
**https://github.com/Fatim1509/Atlasnet**

---

## ⚡ 5-Minute Deployment

### 1️⃣ Deploy Backend (2 minutes)

**Railway**: https://railway.app

1. New Project → Deploy from GitHub
2. Select: `Fatim1509/Atlasnet`
3. Root Directory: `backend`
4. Deploy!
5. Copy your URL: `https://xxxxx.railway.app`

### 2️⃣ Deploy Frontend (2 minutes)

**Vercel**: https://vercel.com

1. New Project → Import Git
2. Select: `Fatim1509/Atlasnet`
3. Root Directory: `frontend`
4. Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://xxxxx.railway.app/api` ⚠️ Add `/api`!
5. Deploy!

### 3️⃣ Test & Enjoy! (1 minute)

- Visit your Vercel URL
- Check all pages work
- View Interactive API Docs: `https://xxxxx.railway.app/docs`

---

## 💻 Local Development

```bash
# Clone
git clone https://github.com/Fatim1509/Atlasnet.git
cd Atlasnet

# Backend
cd backend
pip install -r requirements.txt
python main.py
# Running on http://localhost:8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
# Running on http://localhost:3000
```

---

## 📦 What You Get

✅ **Dashboard** - Real-time cybersecurity statistics
✅ **Timeline** - Chronological event tracking
✅ **Analysis** - Attack pattern visualization
✅ **Replay** - Educational attack scenarios
✅ **About** - Project documentation

---

## 🎯 Key Features

- ✨ Zero database configuration
- 🚀 500 pre-generated security events
- 🎓 Educational cybersecurity content
- 💰 100% free deployment
- 🌍 Global edge deployment
- 📊 Interactive data visualizations

---

## 🆘 Need Help?

- **Documentation**: See [README.md](./README.md)
- **Deployment Guide**: See [DEPLOY.md](./DEPLOY.md)
- **Full Details**: See [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)
- **Issues**: https://github.com/Fatim1509/Atlasnet/issues

---

## 🎓 Built With

**Backend**: Python + FastAPI
**Frontend**: Next.js 14 + TypeScript + Tailwind CSS
**Hosting**: Railway + Vercel (Free Tiers)

---

<div align="center">

**Made for Cybersecurity Education**

⭐ Star on GitHub: https://github.com/Fatim1509/Atlasnet

</div>
