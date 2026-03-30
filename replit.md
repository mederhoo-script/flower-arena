# Flower Arena

A mobile-responsive static website for a floral boutique called "Flower Arena".

## Tech Stack

- **Frontend**: Pure HTML5, Vanilla JavaScript (ES6+), Tailwind CSS (Play CDN), Google Fonts
- **No build tools** — fully static, served via Python's built-in HTTP server

## Project Structure

```
.
├── index.html      # Main entry point
├── styles.css      # Custom CSS (animations, overrides)
├── script.js       # Core UI logic (product rendering, modals, filtering)
├── config.js       # Shop contact details (WhatsApp, Email)
├── products.js     # Product catalog data
├── events.js       # Seasonal events data
└── images/         # Product and event images
    ├── events/
    ├── Mums/
    ├── Roses/
    └── Tulips/
```

## Running the App

The app is served with Python's HTTP server on port 5000:

```
python3 -m http.server 5000 --bind 0.0.0.0
```

## Key Features

- Dynamic product filtering by freshness (In-Stock / Day One / Earlier Arrivals) based on current date
- WhatsApp integration — product modals generate pre-filled WhatsApp message links
- Seasonal events section
- Mobile-first responsive design with hamburger menu
- CSS-based infinite marquee for the "All Products" section

## Admin Panel (`/admin.html`)

A Firebase-powered admin dashboard at `/admin.html` (linked discreetly from the footer).

### Features
- **Login** — Firebase Auth (email/password). Create users in the Firebase Console.
- **Products** — Full CRUD. Add/edit/delete flowers across Roses, Mums, Tulips categories. Freshness labels show live status (In-Stock / Day One / Two Days Old). Includes a "Seed from Site Data" button to import the static products.js catalog into Firestore.
- **Events** — Full CRUD. Add/edit/delete upcoming seasonal events.
- **Settings** — Edit WhatsApp number, phone, email, and modal button visibility. Changes are live immediately.

### Firebase Setup Required

1. **Auth**: In the Firebase Console → Authentication → Sign-in method, enable **Email/Password**. Create an admin user under "Users".
2. **Firestore**: In Firebase Console → Firestore Database, create a database. Set security rules to allow authenticated users to read/write:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### How data flows
- `firebase-data.js` (module script) loads on every page visit and tries to fetch products/events/config from Firestore.
- If Firestore has data → it overrides the static `products.js`, `events.js`, `config.js` globals before the site renders.
- If Firestore is empty or unreachable → static files are used as fallback (site always works).

### Firebase Config
- Project: `vtu-platform`
- Collections used: `products`, `events`, `config` (document: `shopConfig`)

## Deployment

Configured as a static site deployment with `publicDir: "."`.
