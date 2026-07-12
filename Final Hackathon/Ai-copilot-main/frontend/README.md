# AI Recruitment Co-Pilot Hackathon MVP

Phase 1 foundation for a Next.js public site, protected embedded Sanity Studio, FastAPI backend, and MongoDB health check.

Sensitive recruitment data must not be stored in a public Sanity dataset. Candidate records, resumes, AI outputs, private review notes, and audit logs belong in MongoDB and backend services.

## Frontend

```powershell
npm install
Copy-Item .env.local.example .env.local
npm run dev
```

Frontend URL: `http://localhost:3000`
Dashboard URL: `http://localhost:3000/dashboard`
CMS access URL: `http://localhost:3000/cms-access`
Hidden Studio route: `http://localhost:3000/control-room-7f3a`

## Sanity

Create or connect a Sanity project after dependencies install:

```powershell
npx sanity@latest init
```

Choose the existing Next.js app when prompted. Put the project ID in `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`; the dataset is usually `production`.

In Sanity project settings, add CORS origins:

```text
http://localhost:3000
https://your-vercel-domain.vercel.app
```

Enable credentials only for origins that host the embedded Studio. Invite only the authorized Sanity account as a project member with editing access. The application CMS gate is not a replacement for Sanity authorization.

## CMS Security

Generate a password hash:

```powershell
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash(process.argv[1], 12).then(console.log)" "replace-with-a-strong-password"
```

Generate a session secret:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

Set these in `.env.local`:

```text
CMS_ADMIN_EMAIL=owner@example.com
CMS_PASSWORD=generated_hash
CMS_SESSION_SECRET=generated_secret
CMS_ROUTE_PATH=/control-room-7f3a
```

To change the obscure Studio route before deployment, rename `app/control-room-7f3a` and update `CMS_ROUTE_PATH` plus `basePath` in `sanity.config.ts`. Hiding the URL is not authentication; signed HttpOnly cookies and Sanity project membership are both required.

## Backend

```powershell
Set-Location backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
.\run.ps1
```

Backend URL: `http://localhost:8000`
Health URL: `http://localhost:8000/api/health`
Swagger URL: `http://localhost:8000/docs`

For MongoDB Atlas, set `MONGODB_URI` in `backend/.env` to the Atlas connection string and keep credentials out of source control.

## Checks

```powershell
npm run lint
npm run typecheck
npm run build
```

Backend import check:

```powershell
Set-Location backend
$env:PYTHONPATH = (Get-Location).Path
python -c "from app.main import app; print(app.title)"
```

## Troubleshooting

Backend unavailable: ensure FastAPI is running on port `8000` and `NEXT_PUBLIC_API_URL=http://localhost:8000`.

MongoDB disconnected: the API continues running when MongoDB is unavailable. Start MongoDB locally or update `MONGODB_URI`.

Sanity CORS error: add the frontend origin in Sanity project CORS settings. Enable credentials for embedded Studio origins.

Sanity project ID missing: set `NEXT_PUBLIC_SANITY_PROJECT_ID`; until then the public site uses local fallback content.

Unauthorized Studio access: confirm `CMS_ADMIN_EMAIL`, `CMS_PASSWORD`, `CMS_SESSION_SECRET`, and Sanity project membership.

Next.js build failure: run `npm install`, confirm `.env.local` does not contain malformed values, then run `npm run typecheck`.
