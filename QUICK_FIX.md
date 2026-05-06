# 🚀 Quick Fix Guide for Deployment Issues

## Your Current Issues:
❌ **404 Error on Render backend**
❌ **AI Cover Letter generation not working**
❌ **No database persistence**

---

## ✅ IMMEDIATE ACTION ITEMS (Next 15 minutes)

### 1️⃣ Get Your Gemini API Key (5 min)
Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)** → Click "Get API Key"
- Create new project if needed
- Copy the key
- Keep it safe! You'll need it

### 2️⃣ Push Code to GitHub (2 min)
```bash
cd backend
git add render.yaml .env.example
git commit -m "Add Render configuration and environment setup"
git push
```

### 3️⃣ Configure Render Dashboard (8 min)

**Go to:** https://dashboard.render.com → Your job-tracker-backend service

#### Option A: If you have a service already:
1. Click **Settings** → **Environment Variables**
2. Add these 2 variables:
   ```
   GEMINI_API_KEY = [your key from step 1]
   JWT_SECRET = [generate new: use online tool or `openssl rand -base64 32`]
   ```
3. Click **Save**
4. Go back to service, click **Redeploy**

#### Option B: If you don't have a service yet:
1. Create new **Web Service**
2. Connect your GitHub repo
3. Select `backend` folder
4. Name: `job-tracker-backend`
5. Runtime: `Docker`
6. Plan: `Starter`
7. Add Environment Variables (step 2 above)
8. Create Service

---

## 🧪 Test If It Works

### Test 1: Backend is running
```
GET https://job-application-tracker-zlen.onrender.com/api/auth/login
```
Should return **405 (Method Not Allowed)**, NOT 404

### Test 2: Cover Letter Generation
```bash
curl -X POST https://job-application-tracker-zlen.onrender.com/api/cover-letter/generate \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "Seeking React developer",
    "skills": "5 years React experience"
  }'
```
Should return generated text, NOT error

### Test 3: In Your App
1. Go to https://job-application-tracker-ten-wine.vercel.app/
2. Login / Sign up
3. Add a job with description
4. Click "Generate Cover Letter"
5. Should show generated text ✅

---

## ❓ Troubleshooting

### Still getting 404?
1. Check Render logs: Dashboard → Your service → Logs
2. Look for errors about `GEMINI_API_KEY` or `JWT_SECRET`
3. If missing: Add them to Environment Variables and redeploy
4. Wait 30-60 seconds for redeploy to complete

### Cover letter still not generating?
1. Make sure `GEMINI_API_KEY` is set (check dashboard)
2. Check the Render logs for API errors
3. Verify your key is valid by visiting: https://aistudio.google.com/app/apikey

### Need MySQL Database?
If you want persistent data (recommended for production):
1. In Render Dashboard → Create New → PostgreSQL
   - Or MySQL if available
2. Note the connection details
3. Copy URL to `SPRING_DATASOURCE_URL` environment variable
4. Redeploy

---

## 📝 Files Created/Updated

- ✅ `backend/render.yaml` - Render deployment config
- ✅ `backend/.env.example` - Example environment variables
- ✅ `DEPLOYMENT_ISSUES_FIX.md` - Detailed troubleshooting guide
- ✅ `backend/src/main/resources/application.yml` - Updated for MySQL support

---

## 🎯 Expected Results After Fix

✅ Backend responds on Render (no 404)
✅ Cover letter generation works
✅ Data persists across app restarts
✅ Smooth workflow from Vercel frontend to Render backend

---

## 💡 Pro Tips

- Keep your `GEMINI_API_KEY` secret - don't commit it to Git
- Check Render logs frequently during debugging
- Use the `.env` file locally for development
- Test in local environment before pushing to Render

---

**Need help?** Check `DEPLOYMENT_ISSUES_FIX.md` for detailed explanations of each issue and solution.
