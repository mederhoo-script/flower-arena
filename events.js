// ============================================================
// events.js — Flower Arena Upcoming Events Data
//
// Event object fields:
//   name        — event display name
//   date        — event date (YYYY-MM-DD)
//   description — short description shown on the event card
//   image       — relative path from /images/
//               ⚠ No event images exist on disk yet.
//               Set each image to "" to use the emoji fallback,
//               or add your files to images/events/ and update below.
// ============================================================

var events = [

    // ── Valentine's Day ────────────────────────────────────────
    {
        name: "Valentine's Day",
        date: "2026-02-14",
        description: "Special love-themed bouquets available 💐",
        image: "events/valentines.jpg"   // TODO: add images/events/valentines.jpg
    },

    // ── Mother's Day ───────────────────────────────────────────
    {
        name: "Mother's Day",
        date: "2026-05-10",
        description: "Celebrate moms with beautiful flower arrangements 🌸",
        image: "events/mothers_day.jpeg"   // TODO: add images/events/mothers_day.jpg
    },

    // ── Spring Festival ────────────────────────────────────────
    {
        name: "Spring Festival",
        date: "2026-04-20",
        description: "Fresh spring blooms for the season 🌷",
        image: "events/spring_festival.jpeg"   // TODO: add images/events/spring_festival.jpg
    }

];
