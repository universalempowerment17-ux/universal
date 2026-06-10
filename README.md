# Universal Empowerment Foundation Website

Static NGO website built with React, Tailwind CSS, Sanity CMS, and Firebase Hosting.

## Pages

- **Home** — hero, impact stats, mission teaser, gallery preview
- **About Us** — organization story and values
- **Our Mission** — mission, vision, and programs
- **Gallery** — photos (uploaded to Sanity) and videos (YouTube links in Sanity)
- **Donation** — QR code scan and bank transfer details (managed in Sanity)

## Project Structure

```
universal-empowerment-foundation/
├── web/          # React + Vite frontend
├── studio/       # Sanity CMS admin panel
├── firebase.json # Firebase Hosting config
└── README.md
```

## Prerequisites

- Node.js 18+
- [Sanity account](https://www.sanity.io)
- [Firebase account](https://firebase.google.com)

## Setup

### 1. Install dependencies

```bash
cd web && npm install
cd ../studio && npm install
```

### 2. Create a Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project.
2. Copy your **Project ID**.

### 3. Configure environment variables

**Web** (`web/.env`):

```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_FORM_SUBMIT_URL=https://script.google.com/macros/s/your-script-id/exec
```

**Studio** (`studio/.env`):

```
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

Update `studio/sanity.config.js` and `studio/sanity.cli.js` with your project ID, or use the env vars above.

### 4. Configure Sanity CORS

In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **CORS origins**, add:

- `http://localhost:5173` (local dev)
- Your Firebase Hosting URL (e.g. `https://your-project.web.app`)

### 5. Run locally

```bash
# Frontend
npm run dev

# Sanity Studio (separate terminal)
npm run studio
```

Studio runs at `http://localhost:3333`.

### 6. Add content in Sanity Studio

**Donation Settings** (singleton document):

- Upload QR code image
- Add bank details and optional UPI ID

**Gallery Items**:

- **Photos**: set Media Type to "Photo" and upload an image
- **Videos**: upload to YouTube, set Media Type to "Video (YouTube)", paste the YouTube link

## Popup Form → Excel Sheet

The "Stay Updated" popup saves submissions to a **Google Sheet** (downloadable as Excel).

### Setup (one-time)

1. Create a new [Google Sheet](https://sheets.google.com).
2. Go to **Extensions → Apps Script**.
3. Paste the code from [`scripts/google-sheet-form-handler.gs`](scripts/google-sheet-form-handler.gs) and **Save**.
4. Click **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the **Web App URL** and add it to `web/.env`:

```
VITE_FORM_SUBMIT_URL=https://script.google.com/macros/s/xxxx/exec
```

6. Rebuild and redeploy the website.

Each submission adds a row: **Timestamp | Name | Phone | Email**

**Download as Excel:** In Google Sheets → **File → Download → Microsoft Excel (.xlsx)**

## Deploy

### Sanity Studio

```bash
cd studio
npm run deploy
```

This hosts your admin panel at `https://your-project.sanity.studio`.

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
4. Update `.firebaserc` with your Firebase project ID
5. Deploy:

```bash
npm run deploy
```

Or manually:

```bash
cd web && npm run build
firebase deploy --only hosting
```

## Gallery Videos (YouTube)

Videos are **not** uploaded to Sanity. The workflow is:

1. Upload the video to **YouTube**
2. Copy the YouTube URL (`youtube.com/watch?v=...`, `youtu.be/...`, or `youtube.com/shorts/...`)
3. In Sanity Studio, create a Gallery Item with Media Type = **Video (YouTube)** and paste the link
4. The website embeds the video automatically

## Tech Stack

- React 19 + Vite
- Tailwind CSS 4
- React Router
- Sanity CMS v3
- Firebase Hosting
