# Deployment Issues & Solutions

## Issues Found

### 1. **404 Error on Render Backend** ❌
**Problem:** `https://job-application-tracker-zlen.onrender.com/api` returns 404
**Root Causes:**
- Missing or incomplete Render deployment configuration
- Backend service might not be running or properly configured
- Possible port mismatch

### 2. **AI Cover Letter Generation Not Working** ❌
**Problem:** Cover letter generation fails silently
**Root Causes:**
- `GEMINI_API_KEY` environment variable NOT set on Render
- The ChatClient cannot initialize without this API key
- Backend needs Google Gemini API configuration

### 3. **Database Configuration Issue** ⚠️
**Problem:** Using H2 in-memory database (loses data on restart)
**Current Setup:**
- Using H2 embedded database by default
- All data is lost when the Render dyno restarts
- Need persistent database (MySQL or PostgreSQL)

---

## Solution Steps

### **STEP 1: Set Up Render Configuration File** 📋

Create a `render.yaml` file in your backend root directory:

```yaml
services:
  - type: web
    name: job-tracker-backend
    env: docker
    dockerfilePath: ./Dockerfile
    plan: starter
    envVars:
      - key: SPRING_DATASOURCE_URL
        value: ${DATABASE_URL}
      - key: SPRING_DATASOURCE_USERNAME
        fromDatabase:
          name: job_tracker_db
          property: username
      - key: SPRING_DATASOURCE_PASSWORD
        fromDatabase:
          name: job_tracker_db
          property: password
      - key: SPRING_DATASOURCE_DRIVER_CLASS_NAME
        value: com.mysql.cj.jdbc.Driver
      - key: GEMINI_API_KEY
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: PORT
        value: 8080

databases:
  - name: job_tracker_db
    databaseName: job_tracker_db
    plan: starter
    ipWhitelist: []
```

**Location:** `backend/render.yaml`

### **STEP 2: Get Gemini API Key** 🔑

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click "Get API Key" 
3. Create a new project or select existing
4. Copy the API key
5. Save it securely

### **STEP 3: Configure Render Environment Variables** ⚙️

Log into [Render Dashboard](https://dashboard.render.com):

1. Go to your backend service (`job-tracker-backend`)
2. Click **Settings** → **Environment Variables**
3. Add these variables:

| Variable Name | Value |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `JWT_SECRET` | Your JWT secret (generate: `openssl rand -base64 32`) |
| `SPRING_DATASOURCE_DRIVER_CLASS_NAME` | `com.mysql.cj.jdbc.Driver` |

### **STEP 4: Update Backend Configuration** 📝

Update `backend/src/main/resources/application.yml`:

```yaml
spring:
  application:
    name: job-tracker
  
  datasource:
    url: ${SPRING_DATASOURCE_URL:jdbc:mysql://localhost:3306/job_tracker}
    username: ${SPRING_DATASOURCE_USERNAME:root}
    password: ${SPRING_DATASOURCE_PASSWORD:}
    driver-class-name: ${SPRING_DATASOURCE_DRIVER_CLASS_NAME:com.mysql.cj.jdbc.Driver}

  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect

  ai:
    openai:
      api-key: ${GEMINI_API_KEY:}
      base-url: https://generativelanguage.googleapis.com/v1beta/openai
      chat:
        options:
          model: gemini-2.5-flash
          temperature: 0.7

server:
  port: ${PORT:8080}
```

### **STEP 5: Update Frontend API URL (if Render URL changes)** 🔗

If you get a new Render backend URL, update:
`frontend/src/services/api.js`

```javascript
const API_URL = 'https://YOUR-NEW-RENDER-URL.onrender.com/api';
```

### **STEP 6: Test Locally First** 🧪

Before deploying to Render:

1. Create `.env` file in backend root:
```
GEMINI_API_KEY=your_gemini_key_here
JWT_SECRET=your_jwt_secret_here
SPRING_DATASOURCE_URL=jdbc:h2:mem:job_tracker
SPRING_DATASOURCE_USERNAME=sa
SPRING_DATASOURCE_PASSWORD=
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.h2.Driver
```

2. Run locally:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

3. Test cover letter generation:
```bash
curl -X POST http://localhost:8080/api/cover-letter/generate \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "Looking for Java developer",
    "skills": "5 years Java experience"
  }'
```

---

## Testing Checklist

- [ ] Backend deploys successfully on Render
- [ ] `/api/auth/login` endpoint responds (test: `GET https://your-render-url.onrender.com/api/auth/login` - should return 405, not 404)
- [ ] Database connection works
- [ ] `GEMINI_API_KEY` is set and accessible
- [ ] Cover letter generation API works
- [ ] Frontend can reach backend
- [ ] Login/Signup works
- [ ] Cover letter modal generates text

---

## Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| 404 on `/api/*` | Backend not deployed | Check Render logs, verify render.yaml |
| Cover letter returns error message | No API key | Set `GEMINI_API_KEY` env var |
| Data disappears on restart | Using H2 in-memory | Add MySQL database |
| CORS errors | Frontend/Backend mismatch | Update API_URL in frontend |

---

## Next Steps

1. **Create `render.yaml`** with the configuration above
2. **Add MySQL database** via Render dashboard
3. **Set environment variables** on Render
4. **Push changes** to GitHub
5. **Render will auto-deploy**
6. **Test all endpoints**

Your backend service should auto-redeploy when you push. Check the Render dashboard logs if issues persist.

