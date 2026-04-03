// /api/config.js — Vercel Serverless Function
// Returns public Firebase + Cloudinary config from environment variables.
// Vercel injects variables defined in .env (or the Vercel dashboard) as process.env.
module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    firebase: {
      apiKey:            process.env.FIREBASE_API_KEY,
      authDomain:        process.env.FIREBASE_AUTH_DOMAIN,
      projectId:         process.env.FIREBASE_PROJECT_ID,
      storageBucket:     process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId:             process.env.FIREBASE_APP_ID,
      measurementId:     process.env.FIREBASE_MEASUREMENT_ID,
    },
    cloudinary: {
      cloudName:    process.env.CLOUDINARY_CLOUD_NAME,
      uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    },
  });
};
