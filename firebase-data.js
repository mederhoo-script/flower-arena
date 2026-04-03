// ============================================================
// firebase-data.js — Load live data from Firestore
// Runs before DOMContentLoaded; overrides static globals if
// Firestore has data, then signals script.js to call init().
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc }
  from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const env = window.__ENV || {};
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID
};

// Signal to script.js that we're loading async data
window.__firebaseDataLoading = true;

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

async function loadFirestoreData() {
  try {
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
