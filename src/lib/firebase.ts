import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

function initFirestore() {
  if (firebaseConfig && firebaseConfig.firestoreDatabaseId) {
    try {
      return getFirestore(app, firebaseConfig.firestoreDatabaseId);
    } catch (err) {
      console.warn('[Firebase] Falha ao conectar ao banco nomeado, usando (default):', err);
    }
  }
  return getFirestore(app);
}

export const db = initFirestore();
export const auth = getAuth(app);

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firebase] Conectado ao Firestore:', firebaseConfig.firestoreDatabaseId);
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Verifique sua conexão com o Firebase.');
    } else {
      console.log('[Firebase] Conexão com Firestore inicializada.');
    }
  }
}
testConnection();
