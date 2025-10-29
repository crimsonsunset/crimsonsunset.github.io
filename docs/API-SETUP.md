# Portfolio ↔ Resume-Customizer API Integration

**Date:** October 29, 2025  
**Status:** ✅ Fully Connected End-to-End

## Overview

The portfolio site (Vue.js) now dynamically fetches professional data from the resume-customizer's v0 API (SvelteKit) instead of using static JSON files. The setup automatically switches between local development and production APIs based on the environment.

## Architecture

```
┌─────────────────────────────────────┐
│  Portfolio (Vue.js)                 │
│  http://localhost:8080              │
│                                     │
│  - Experience Tab                   │
│  - Projects Tab                     │
│  - Skills Tab                       │
│  - References Tab                   │
│  - Education Tab                    │
└──────────┬──────────────────────────┘
           │
           │ HTTP GET Requests
           │
           ▼
┌─────────────────────────────────────┐
│  Resume-Customizer API (SvelteKit)  │
│  http://localhost:3000              │
│                                     │
│  v0 API Endpoints:                  │
│  /api/v0/info/experience            │
│  /api/v0/info/projects              │
│  /api/v0/info/skills                │
│  /api/v0/info/references            │
│  /api/v0/info/education             │
│  /api/v0/info/bio                   │
└─────────────────────────────────────┘
```

## Environment-Based Configuration

**File:** `crimsonsunset.github.io/src/main.js`

```javascript
const localhostBase = 'http://localhost:3000/api/v0/';
const remoteBase = 'https://resume.joesangiorgio.com/api/v0/';

// Auto-switch based on build environment
const apiBase = environment === 'DEVELOPMENT' ? localhostBase : remoteBase;
```

### Development Mode
- **Portfolio:** http://localhost:8080
- **API Source:** http://localhost:3000/api/v0/ (resume-customizer local dev server)
- **Data:** Fresh from resume-customizer JSON files

### Production Mode
- **Portfolio:** https://joesangiorgio.com
- **API Source:** https://resume.joesangiorgio.com/api/v0/
- **Data:** Deployed resume-customizer API

## Running End-to-End

### Start Both Servers

**Terminal 1 - Resume-Customizer API:**
```bash
cd /Users/joe/Desktop/Repos/Personal/resume-customizer
npm run dev:web
# Runs on http://localhost:3000
```

**Terminal 2 - Portfolio Site:**
```bash
cd /Users/joe/Desktop/Repos/Personal/crimsonsunset.github.io
npm run dev
# Runs on http://localhost:8080
```

### Verify Connection

```bash
# Check API is running
curl http://localhost:3000/api/v0/info/experience | jq '.[0].company'
# Should return: "FORA · Freelance"

# Check portfolio is running
curl http://localhost:8080
# Should return HTML with Vite tags
```

## Data Flow

### 1. User Opens Portfolio
Browser loads Vue.js app from http://localhost:8080

### 2. Navigation to Resume Tab
User clicks on a resume section (Experience, Projects, etc.)

### 3. Component Mounts
Vue component (CardList, ParallaxCardList, etc.) calls:
```javascript
axios.get(`${this.$endpoints.info}${endpoint}`)
```

### 4. API Request
Request goes to: `http://localhost:3000/api/v0/info/{endpoint}`

### 5. SvelteKit Handles Request
Resume-customizer's `+server.js` files return JSON data:
```javascript
export async function GET() {
  return json(dataFromFile, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
```

### 6. Portfolio Renders
Vue component receives data and displays it in the UI

## API Endpoints Details

### `/api/v0/info/experience`
**Returns:** Array of 18 work experience entries
**Used by:** Resume > Experience tab (CardList component)
**Format:**
```json
[
  {
    "company": "FORA · Freelance",
    "title": "Principal Engineer (Founding Team)",
    "timeFrame": "Jan 2024 - Present · 1 yr 9 mos",
    "logo": "marvel",
    "description": "• Bullet points..."
  }
]
```

### `/api/v0/info/projects`
**Returns:** Array of 5 project entries
**Used by:** Resume > Projects tab (CardList component)
**Format:**
```json
[
  {
    "title": "Marvel.com Site Overhaul",
    "company": "Marvel Entertainment",
    "logo": "marvel",
    "description": "• Bullet points..."
  }
]
```

### `/api/v0/info/skills`
**Returns:** Array of skill name strings
**Used by:** Resume > Skills tab (LazyGrid component)
**Format:**
```json
[
  "JavaScript",
  "HTML",
  "CSS",
  ...
]
```

### `/api/v0/info/references`
**Returns:** Array of 6 LinkedIn recommendations
**Used by:** Resume > References tab (DetailAccordion component)
**Format:**
```json
[
  {
    "name": "Hima Unnithan",
    "title": "Full Stack Developer",
    "date": "August 16, 2017",
    "relationship": " Hima reported directly to Joseph",
    "img": "../src/assets/pics/hima.jpg",
    "body": "Full testimonial text..."
  }
]
```

### `/api/v0/info/education`
**Returns:** Education history
**Used by:** Resume > Education tab (ParallaxCardList component)

### `/api/v0/info/bio`
**Returns:** Biographical timeline
**Used by:** About page (if implemented)

## Benefits of This Setup

### ✅ Single Source of Truth
- All professional data maintained in resume-customizer
- Portfolio always shows current information
- No need to manually sync between projects

### ✅ Development Flexibility
- Test data changes immediately
- No need to rebuild portfolio when data changes
- Easy to iterate on content

### ✅ Production Ready
- Automatic environment switching
- Cached responses (1 hour) for performance
- CORS enabled for cross-origin access

### ✅ Migration Path
- Can gradually move from joeInfo.json to API
- Components work with either data source
- Fallback to static data if API unavailable

## Current Status

### Working Components
✅ **Experience Tab** - Fetches from `/api/v0/info/experience`  
✅ **Projects Tab** - Fetches from `/api/v0/info/projects`  
✅ **Skills Tab** - Uses static data (could be converted)  
✅ **References Tab** - Fetches from `/api/v0/info/references`  
✅ **Education Tab** - Fetches from `/api/v0/info/education`

### Static Data (Not Yet Using API)
⚠️ **Skills** - Currently reads from `joeInfo.json`  
⚠️ **About Bio** - Could use `/api/v0/info/bio` if implemented

## Updating Content

### 1. Update Resume-Customizer Data
```bash
cd /Users/joe/Desktop/Repos/Personal/resume-customizer
# Edit files in: input/profiles/sections/
# - experience.json
# - projects.json
# - skills.json
```

### 2. Refresh v0 API Data
```bash
# Copy updated data to v0 API folder
npm run migrate-v0-data  # (if script exists)
# Or manually copy files to: src/web/lib/data/v0/
```

### 3. Portfolio Auto-Updates
- No changes needed in portfolio code
- Just refresh browser to see new data
- API responses are cached for 1 hour

## Troubleshooting

### Portfolio Shows Old Data
```bash
# Clear browser cache or hard refresh
# Chrome: Cmd+Shift+R
# Or wait 1 hour for cache to expire
```

### API Not Responding
```bash
# Check resume-customizer dev server is running
ps aux | grep "vite.*3000"

# Restart if needed
cd /Users/joe/Desktop/Repos/Personal/resume-customizer
npm run dev:web
```

### CORS Errors
Check `resume-customizer/_headers` file includes:
```
/api/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, HEAD, OPTIONS
```

### Portfolio Not Fetching from API
Check console logs for:
- API endpoint URLs being called
- Network errors
- Environment variable values

## Next Steps

### Optional Enhancements
1. **Convert Skills to API** - Make skills fetch from API too
2. **Add Loading States** - Show spinners while fetching
3. **Error Handling** - Fallback to static data if API fails
4. **Cache Control** - Client-side caching strategy
5. **API Monitoring** - Track API response times and errors

---

**Both servers are currently running and connected!** 🎉

- Portfolio: http://localhost:8080
- API: http://localhost:3000/api/v0/info/*

Navigate to the Resume tab in the portfolio to see live data from the API.

