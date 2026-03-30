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

## Deployment

Configured as a static site deployment with `publicDir: "."`.
