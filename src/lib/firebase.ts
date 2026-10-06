import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

let firebaseConfig: any = {};
try {
  // @ts-ignore
  firebaseConfig = await import('../../firebase-applet-config.json');
  if (firebaseConfig.default) firebaseConfig = firebaseConfig.default;
} catch {
  firebaseConfig = {
    apiKey: "AIzaSyDummyKeyForAppletConfigPlaceholder",
    authDomain: "edutask-applet.firebaseapp.com",
    projectId: "edutask-applet",
    storageBucket: "edutask-applet.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456",
    firestoreDatabaseId: "(default)"
  };
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);
