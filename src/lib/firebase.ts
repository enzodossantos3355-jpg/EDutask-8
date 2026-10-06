import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

let firebaseConfig: any = {};
try {
  // @ts-ignore
  firebaseConfig = await import('../../firebase-applet-config.json');
  if (firebaseConfig.default) firebaseConfig = firebaseConfig.default;
} catch {
  firebaseConfig = {};
}

// Fallback to VITE_ env variables if configured in hosting environments like Vercel
if (typeof import.meta !== 'undefined' && import.meta.env) {
  if (import.meta.env.VITE_FIREBASE_API_KEY) firebaseConfig.apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  if (import.meta.env.VITE_FIREBASE_PROJECT_ID) firebaseConfig.projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  if (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) firebaseConfig.authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  if (import.meta.env.VITE_FIREBASE_DATABASE_ID) firebaseConfig.firestoreDatabaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID;
  if (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) firebaseConfig.storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
  if (import.meta.env.VITE_FIREBASE_APP_ID) firebaseConfig.appId = import.meta.env.VITE_FIREBASE_APP_ID;
}

if (!firebaseConfig.apiKey) {
  firebaseConfig = {
    apiKey: "AIzaSyDsAo1hTSOe6Q21QcNeHmGNt650rkzBBmc",
    authDomain: "edutask-7ano-60994.firebaseapp.com",
    projectId: "edutask-7ano-60994",
    storageBucket: "edutask-7ano-60994.firebasestorage.app",
    messagingSenderId: "851306521007",
    appId: "1:851306521007:web:1eab9e88863b662fb78f5a",
    firestoreDatabaseId: "ai-studio-edutaskgestodeta-3284915b-c459-465f-8391-17d32111c03c"
  };
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);
