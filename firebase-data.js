// ============================================================
// firebase-data.js — Load live data from Firestore
// Runs before DOMContentLoaded; overrides static globals if
// Firestore has data, then signals script.js to call init().
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc }
  from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// Signal to script.js that we're loading async data
window.__firebaseDataLoading = true;

async function loadFirestoreData() {
  try {
    // ── Fetch config from Vercel serverless function ───
    const cfgRes = await fetch('/api/config');
    if (!cfgRes.ok) throw new Error(`/api/config returned ${cfgRes.status}`);
    const cfg = await cfgRes.json();
    const firebaseConfig = cfg.firebase;

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);

    // ── Products ──────────────────────────────────────
    const productsSnap = await getDocs(collection(db, 'products'));
    if (!productsSnap.empty) {
      const firestoreProducts = {};
      productsSnap.forEach(d => {
        const data = d.data();
        if (!firestoreProducts[data.category]) firestoreProducts[data.category] = [];
        firestoreProducts[data.category].push(data);
      });
      // Sort each category by order field
      Object.keys(firestoreProducts).forEach(cat => {
        firestoreProducts[cat].sort((a, b) => (a.order || 0) - (b.order || 0));
      });
      window.products = firestoreProducts;
    }

    // ── Events ────────────────────────────────────────
    const eventsSnap = await getDocs(collection(db, 'events'));
    if (!eventsSnap.empty) {
      const firestoreEvents = [];
      eventsSnap.forEach(d => firestoreEvents.push(d.data()));
      firestoreEvents.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
      window.events = firestoreEvents;
    }

    // ── Config ────────────────────────────────────────
    const configSnap = await getDoc(doc(db, 'config', 'shopConfig'));
    if (configSnap.exists()) {
      window.shopConfig = configSnap.data();
    }
  } catch (err) {
    // Silently fall back to static data — no disruption to users
    console.info('[Flower Arena] Using static data (Firestore unavailable):', err.message);
  } finally {
    window.__firebaseDataLoading = false;
    if (typeof window.__onFirebaseDataReady === 'function') {
      window.__onFirebaseDataReady();
    }
  }
}

loadFirestoreData();
