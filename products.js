// ============================================================
// products.js — Flower Arena Product Data
//
// Dates are stored as static strings (YYYY-MM-DD). 
// The system automatically moves products from "Today" to 
// "Yesterday" as the real-world date passes.
// ============================================================

var products = {

  // ── Roses ──────────────────────────────────────────────────
  Roses: [
    {
      name: "Ever Red Rose",
      image: "Roses/ever-red.jpg",
      description: "Elegant red roses for special occasions 🌹",
      Old: "2026-03-20",
      New: "2026-03-29"    // Today
    },
    {
      name: "Fiorella Sunset Mix",
      image: "Roses/fiorella.jpg",
      description: "Beautiful orange and red rose arrangement 🌺",
      Old: "2026-03-15",
      New: "2026-03-26"    // Yesterday
    },
    {
      name: "Pink Rose",
      image: "Roses/pink-rose.jpg",
      description: "Soft pink roses radiating warmth and love 💗",
      Old: "2026-03-18",
      New: "2026-03-26"    // Yesterday
    },
    {
      name: "Pink Rose with Leaves",
      image: "Roses/pink-rose+leaves.jpg",
      description: "Pink roses with lush green leafy accents 🌿",
      Old: "2026-03-17",
      New: "2026-03-29"    // expired
    },
    {
      name: "White Rose",
      image: "Roses/white-rose.jpg",
      description: "Pure white roses symbolising elegance and purity 🤍",
      Old: "2026-03-12",
      New: "2026-03-29"    // Today
    },
    {
      name: "White Rose with Leaves",
      image: "Roses/white-rose+leaves.jpg",
      description: "Crisp white roses paired with vibrant green leaves 🌿",
      Old: "2026-03-11",
      New: "2026-03-25"    // Earlier
    },
    {
      name: "Yellow Rose",
      image: "Roses/yellow-rose.jpg",
      description: "Cheerful yellow roses to brighten any day ☀️",
      Old: "2026-03-10",
      New: "2026-03-22"    // expired
    }
  ],

  // ── Mums ───────────────────────────────────────────────────
  Mums: [
    {
      name: "Gold Mums Arrangement",
      image: "Mums/gold-mums.jpg",
      description: "Vibrant golden mums for a warm autumn feel 🍂",
      Old: "2026-03-10",
      New: "2026-03-29"    // today
    },
    {
      name: "Lollipop Mums",
      image: "Mums/lollipop.jpg",
      description: "Fun round lollipop mums in mixed playful colours 🍭",
      Old: "2026-03-08",
      New: "2026-03-29"    // today
    },
    {
      name: "Maroon Mums",
      image: "Mums/maroon.jpg",
      description: "Rich maroon mums with a deep, luxurious hue 🍷",
      Old: "2026-03-07",
      New: "2026-03-25"    // today
    },
    {
      name: "Pink Mums Bouquet",
      image: "Mums/pink-mums.jpg",
      description: "Delicate pink mums perfect for any celebration 🌸",
      Old: "2026-03-06",
      New: "2026-03-29"    // Today
    },
    {
      name: "White Mums",
      image: "Mums/white-mums.jpg",
      description: "Classic white mums exuding freshness and purity 🤍",
      Old: "2026-03-05",
      New: "2026-03-25"    // Earlier
    },
    {
      name: "Yellow Mums",
      image: "Mums/yellow-mums.jpg",
      description: "Bright yellow mums that bring sunshine indoors ☀️",
      Old: "2026-03-04",
      New: "2026-03-26"    // Yesterday
    }
  ],

  // ── Tulips ─────────────────────────────────────────────────
  Tulips: [
    {
      name: "Cerise Tulip",
      image: "Tulips/cerise-tulip.jpg",
      description: "Vivid cerise tulips bursting with spring colour 🌷",
      Old: "2026-03-05",
      New: "2026-03-29"    // Today
    },
    {
      name: "Sparta Tulip",
      image: "Tulips/sparta-tulip.jpg",
      description: "Bold red Sparta tulips — a timeless spring classic 🌷",
      Old: "2026-03-03",
      New: "2026-03-25"    // Earlier
    }
  ],

  // ── Chrysanthemums ─────────────────────────────────────────
  Chrysanthemums: [],

  // ── Carnations ─────────────────────────────────────────────
  Carnations: [],

  // ── Gypsophilla ────────────────────────────────────────────
  Gypsophilla: [],

  // ── Other Fillers ──────────────────────────────────────────
  "Other Fillers": []

};
