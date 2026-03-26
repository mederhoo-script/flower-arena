// ============================================================
// products.js — Flower Arena Product Data
//
// #10 — Dates are now set relative to TODAY so the carousels
//        always populate correctly regardless of the calendar date.
//
// Helper to get YYYY-MM-DD offset from today:
//   daysAgo(0) = today, daysAgo(1) = yesterday, daysAgo(2) = earlier
// ============================================================

function daysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().split("T")[0];
}

const products = {

  // ── Roses ──────────────────────────────────────────────────
  Roses: [
    {
      name: "Ever Red Rose",
      image: "Roses/ever-red.jpg",
      description: "Elegant red roses for special occasions 🌹",
      Old: daysAgo(6),   // expires in 6 days from reference
      New: daysAgo(0)    // available today
    },
    {
      name: "Fiorella Sunset Mix",
      image: "Roses/fiorella.jpg",
      description: "Beautiful orange and red rose arrangement 🌺",
      Old: daysAgo(11),
      New: daysAgo(1)    // available yesterday
    },
    {
      name: "Pink Rose",
      image: "Roses/pink-rose.jpg",
      description: "Soft pink roses radiating warmth and love 💗",
      Old: daysAgo(8),
      New: daysAgo(1)    // available yesterday
    },
    {
      name: "Pink Rose with Leaves",
      image: "Roses/pink-rose+leaves.jpg",
      description: "Pink roses with lush green leafy accents 🌿",
      Old: daysAgo(9),
      New: daysAgo(2)    // available two days ago
    },
    {
      name: "White Rose",
      image: "Roses/white-rose.jpg",
      description: "Pure white roses symbolising elegance and purity 🤍",
      Old: daysAgo(14),
      New: daysAgo(0)    // available today
    },
    {
      name: "White Rose with Leaves",
      image: "Roses/white-rose+leaves.jpg",
      description: "Crisp white roses paired with vibrant green leaves 🌿",
      Old: daysAgo(15),
      New: daysAgo(2)    // available two days ago
    },
    {
      name: "Yellow Rose",
      image: "Roses/yellow-rose.jpg",
      description: "Cheerful yellow roses to brighten any day ☀️",
      Old: daysAgo(16),
      New: daysAgo(1)    // available yesterday
    }
  ],

  // ── Mums ───────────────────────────────────────────────────
  Mums: [
    {
      name: "Gold Mums Arrangement",
      image: "Mums/gold-mums.jpg",
      description: "Vibrant golden mums for a warm autumn feel 🍂",
      Old: daysAgo(16),
      New: daysAgo(0)    // available today
    },
    {
      name: "Lollipop Mums",
      image: "Mums/lollipop.jpg",
      description: "Fun round lollipop mums in mixed playful colours 🍭",
      Old: daysAgo(18),
      New: daysAgo(1)    // available yesterday
    },
    {
      name: "Maroon Mums",
      image: "Mums/maroon.jpg",
      description: "Rich maroon mums with a deep, luxurious hue 🍷",
      Old: daysAgo(19),
      New: daysAgo(2)    // available two days ago
    },
    {
      name: "Pink Mums Bouquet",
      image: "Mums/pink-mums.jpg",
      description: "Delicate pink mums perfect for any celebration 🌸",
      Old: daysAgo(20),
      New: daysAgo(0)    // available today
    },
    {
      name: "White Mums",
      image: "Mums/white-mums.jpg",
      description: "Classic white mums exuding freshness and purity 🤍",
      Old: daysAgo(21),
      New: daysAgo(2)    // available two days ago
    },
    {
      name: "Yellow Mums",
      image: "Mums/yellow-mums.jpg",
      description: "Bright yellow mums that bring sunshine indoors ☀️",
      Old: daysAgo(22),
      New: daysAgo(1)    // available yesterday
    }
  ],

  // ── Tulips ─────────────────────────────────────────────────
  Tulips: [
    {
      name: "Cerise Tulip",
      image: "Tulips/cerise-tulip.jpg",
      description: "Vivid cerise tulips bursting with spring colour 🌷",
      Old: daysAgo(21),
      New: daysAgo(0)    // available today
    },
    {
      name: "Sparta Tulip",
      image: "Tulips/sparta-tulip.jpg",
      description: "Bold red Sparta tulips — a timeless spring classic 🌷",
      Old: daysAgo(23),
      New: daysAgo(2)    // available two days ago
    }
  ]

};
