# Universal Empowerment Foundation Website

A professional NGO website for **Universal Empowerment Foundation**, built with React, Vite, Tailwind CSS, Sanity CMS, and Firebase Hosting.

Live website:
- https://universal-empowerment-a5422.web.app

Live Sanity Studio:
- https://universalempowermentfoundation.sanity.studio/

## What This Project Includes

- Responsive public website with a clean NGO-focused design
- Rotating homepage hero images from Sanity
- Animated homepage impact counters from Sanity
- About, Our Work, Programs, Gallery, Donation, and Contact pages
- Founder message and belief sections on the homepage
- Stories of change section powered by Sanity
- Gallery with photos and YouTube videos
- Donation page with QR / bank details from Sanity
- Contact and volunteer forms that send submissions directly to WhatsApp
- Firebase Hosting deployment for the website
- Sanity Studio deployment for content editing

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- React Router
- Sanity CMS v3
- Firebase Hosting

## Repository Structure

```bash
universal-empowerment-foundation/
|-- web/                   # Public website
|-- studio/                # Sanity Studio
|-- firebase.json          # Firebase Hosting config
|-- package.json           # Root commands
`-- scripts/               # Optional helper scripts
```

## Main Website Pages

- **Home**: hero slider, belief section, founder message, our work summary, interventions, impact counters, stories, gallery preview
- **About Us**: mission and organization story
- **Our Work**: what the foundation does and how it supports communities
- **Programs**: program cards and programme-focused content
- **Gallery**: image and video gallery with expandable viewing
- **Donate**: donation details, QR code, and donation note
- **Contact Us**: contact details, map/link buttons, and contact form

## Sanity-Powered Content

The public website reads content from these Sanity documents:

- `siteSettings`
  - home hero images
  - belief/about image
  - impact stats
  - founder image
  - page hero images
- `donationSettings`
  - QR code
  - UPI ID
  - bank account details
  - donation note
- `galleryItem`
  - image or YouTube video
  - publish date
  - order
- `storyItem`
  - name
  - location
  - image
  - excerpt
  - full story
  - order

## Forms and WhatsApp Flow

The volunteer and contact forms:

- collect name, phone, email, and message
- enforce field limits for basic safety
- limit repeated submissions per session
- open WhatsApp with a prefilled message to the admin number

Configure the admin WhatsApp number with:

```env
VITE_ADMIN_WHATSAPP_NUMBER=91XXXXXXXXXX
```

If the value is a 10-digit Indian number, the app automatically prefixes `91`.

## Environment Variables

### `web/.env`

```env
VITE_SANITY_PROJECT_ID=ko39xasb
VITE_SANITY_DATASET=production
VITE_ADMIN_WHATSAPP_NUMBER=91XXXXXXXXXX
```

### `studio/.env`

```env
SANITY_STUDIO_PROJECT_ID=ko39xasb
SANITY_STUDIO_DATASET=production
```

## Local Setup

### 1) Install dependencies

```bash
cd web
npm install
cd ../studio
npm install
```

### 2) Start the website locally

From the project root:

```bash
npm run dev
```

The Vite app runs on:

- http://localhost:5173

### 3) Start Sanity Studio locally

```bash
npm run studio
```

The Studio runs on:

- http://localhost:3333

## Sanity Content Setup

After opening the Studio, create or update the following content:

### Site Settings

- Add 2 to 4 homepage hero images
- Add the homepage belief/about image
- Add impact stats as label/value pairs
- Add the founder image
- Add hero images for About, Our Work, Programs, Gallery, Donation, and Contact pages

### Impact Stats

Each impact card should include:

- `Label`
- `Value`

Example:

- `Lives touched` - `10,000+`
- `Community programs` - `30+`
- `Women trained` - `500+`

### Gallery Items

- **Photo**: upload an image
- **Video (YouTube)**: paste a valid YouTube link
- lower `order` values appear first

### Story Items

- `Name`
- `Location`
- `Excerpt`
- `Story`
- optional image
- lower `order` values appear first

### Donation Settings

- QR code image
- UPI ID
- account holder name
- bank name
- account number
- IFSC code
- branch
- donation note

## Build and Deploy

### Build the website

```bash
npm run build
```

This builds the frontend into `web/dist`.

### Deploy to Firebase Hosting

```bash
npm run deploy
```

This runs the production build and deploys the website to Firebase Hosting.

You can also deploy manually:

```bash
cd web
npm run build
cd ..
firebase deploy --only hosting
```

### Deploy Sanity Studio

```bash
cd studio
npm exec sanity -- deploy -y
```

If Sanity asks for a hostname, choose the existing studio hostname:

- `universalempowermentfoundation`

## Firebase Hosting

Firebase serves the compiled frontend from `web/dist` and rewrites all routes to `index.html`, so React Router works correctly on refresh.

The current Firebase project is:

- `universal-empowerment-a5422`

## Helpful Notes

- The site is designed to be responsive across desktop, tablet, and mobile screens.
- The homepage impact counters animate from `0` up to the configured value.
- The hero background rotates through multiple Sanity images.
- The gallery supports both photos and YouTube videos.
- The website currently uses Firebase instead of Vercel.

## Useful Commands

```bash
npm run dev       # Start the website locally
npm run studio    # Start Sanity Studio locally
npm run build     # Build the website
npm run deploy    # Build and deploy to Firebase Hosting
```
