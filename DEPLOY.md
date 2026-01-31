# 🚀 Deployment Guide - AtlasNet v2.0

## ✨ Zero-Config Deployment to Railway & Vercel

This guide will help you deploy AtlasNet in under 5 minutes with NO database setup required!

---

## 📋 Prerequisites

- GitHub account
- Railway account (free tier works!)
- Vercel account (free tier works!)

---

## Step 1: Push to GitHub (1 minute)

```bash
# If you haven't already:
cd /home/user/webapp/AtlasNet
git remote add origin https://github.com/YOUR_USERNAME/AtlasNet.git
git push -u origin main
```

---

## Step 2: Deploy Backend to Railway (2 minutes)

### Option A: Using Railway CLI (Recommended)

```bash
cd backend
npm install -g @railway/cli
railway login
railway init
railway up
```

### Option B: Using Railway Dashboard

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your **AtlasNet** repository
5. Click **"Add variables"** (optional - none needed!)
6. Railway will:
   - Auto-detect Python
   - Install dependencies from `requirements.txt`
   - Run using `Procfile` or `railway.json`
   - Generate a public URL

7. **Copy your Railway URL** (e.g., `https://atlasnet-production.up.railway.app`)

✅ Backend deployed! Test it: `https://your-url.railway.app/docs`

---

## Step 3: Deploy Frontend to Vercel (2 minutes)

### Option A: Using Vercel CLI (Recommended)

```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
# Follow prompts, set NEXT_PUBLIC_API_URL when asked
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click **"New Project"**
3. Select **"Import Git Repository"**
4. Choose your **AtlasNet** repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

6. **Add Environment Variable:**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-railway-url.railway.app/api`
   - ⚠️ **IMPORTANT**: Add `/api` at the end!

7. Click **"Deploy"**

8. Vercel will:
   - Install dependencies
   - Build your Next.js app
   - Deploy to global CDN
   - Generate a public URL

✅ Frontend deployed! Visit: `https://your-app.vercel.app`

---

## 🎉 You're Done!

Your AtlasNet is now live! Visit your Vercel URL to see:
- 📊 Dashboard with real-time stats
- ⏱️ Timeline of security events
- 🔍 Behavior analysis with charts
- 🎓 Educational attack replays
- ℹ️ About page with documentation

---

## 🔧 Configuration

### Environment Variables

**Backend (Railway):**
- No variables required! Everything works out of the box.
- Optional: `PORT` (auto-set by Railway)

**Frontend (Vercel):**
- **Required**: `NEXT_PUBLIC_API_URL` - Your Railway backend URL + `/api`
- Example: `https://atlasnet-production.up.railway.app/api`

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Backend doesn't start on Railway
**Solution:** 
- Check Railway logs in dashboard
- Verify `requirements.txt` is present
- Ensure Python 3.11+ is detected

**Problem:** API returns 500 errors
**Solution:**
- Check Railway logs for Python errors
- Verify all imports are correct
- Restart the Railway service

### Frontend Issues

**Problem:** "Failed to fetch" or CORS errors
**Solution:**
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Ensure `/api` is appended to the URL
- Check Railway backend is running
- Test backend directly: `https://your-railway-url.railway.app/docs`

**Problem:** Page shows but no data
**Solution:**
- Open browser console (F12)
- Check for API errors
- Verify backend URL in Network tab
- Ensure CORS is enabled (it is by default)

**Problem:** Build fails on Vercel
**Solution:**
- Check Vercel build logs
- Verify all dependencies in `package.json`
- Ensure TypeScript has no errors
- Try rebuilding: Deployments → Redeploy

---

## 🔄 Updating Your Deployment

### Update Backend:
```bash
git add backend/
git commit -m "Update backend"
git push origin main
# Railway auto-deploys from main branch
```

### Update Frontend:
```bash
git add frontend/
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploys from main branch
```

Both platforms support **automatic deployments** from GitHub!

---

## 📊 Monitoring

### Railway (Backend)
- **Logs**: Railway Dashboard → Your Project → Logs
- **Metrics**: CPU, Memory, Network usage
- **Health**: Check `/health` endpoint

### Vercel (Frontend)
- **Analytics**: Vercel Dashboard → Analytics tab
- **Logs**: Vercel Dashboard → Deployments → View Logs
- **Performance**: Built-in Web Vitals monitoring

---

## 💰 Costs

Both platforms offer **generous free tiers**:

**Railway Free Tier:**
- $5 free credit per month
- Perfect for hobby projects
- Auto-sleeps after inactivity
- Wake-up time: ~5 seconds

**Vercel Free Tier:**
- Unlimited personal projects
- 100GB bandwidth
- Automatic HTTPS
- Global CDN

**Total cost for AtlasNet: $0/month** 🎉

---

## 🚀 Advanced: Custom Domains

### Add Custom Domain to Railway:
1. Railway Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records as shown

### Add Custom Domain to Vercel:
1. Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records (automatic or manual)

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Backend deployed to Railway
- [ ] Railway URL copied
- [ ] Vercel project created
- [ ] Environment variable set (`NEXT_PUBLIC_API_URL`)
- [ ] Frontend deployed to Vercel
- [ ] Dashboard loads successfully
- [ ] API calls work (check browser console)
- [ ] All pages accessible (Dashboard, Timeline, Analysis, Replay, About)

---

**🎉 Congratulations! Your AtlasNet cybersecurity dashboard is now live and accessible worldwide!**
