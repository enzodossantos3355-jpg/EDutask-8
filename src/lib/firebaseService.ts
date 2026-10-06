import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase.js';

export const firebaseService = {
  async getAllTasks(): Promise<any[]> {
    try {
      const snap = await getDocs(collection(db, 'tasks'));
      const tasks: any[] = [];
      snap.forEach((docSnap) => {
        tasks.push({ id: docSnap.id, ...docSnap.data() });
      });
      return tasks;
    } catch (e: any) {
      console.warn('[Firebase] Erro ao buscar tarefas do Firestore:', e?.message || e);
      return [];
    }
  },

  async saveTask(task: any): Promise<boolean> {
    try {
      await setDoc(doc(db, 'tasks', task.id), task, { merge: true });
      return true;
    } catch (e: any) {
      console.warn(`[Firebase] Erro ao salvar tarefa ${task.id} no Firestore:`, e?.message || e);
      return false;
    }
  },

  async deleteTask(taskId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      return true;
    } catch (e: any) {
      console.warn(`[Firebase] Erro ao remover tarefa ${taskId} do Firestore:`, e?.message || e);
      return false;
    }
  },

  async getAllUsers(): Promise<any[]> {
    try {
      const snap = await getDocs(collection(db, 'users'));
      const users: any[] = [];
      snap.forEach((docSnap) => {
        users.push({ id: docSnap.id, ...docSnap.data() });
      });
      return users;
    } catch (e: any) {
      console.warn('[Firebase] Erro ao buscar usuários do Firestore:', e?.message || e);
      return [];
    }
  },

  async saveUser(user: any): Promise<boolean> {
    try {
      await setDoc(doc(db, 'users', user.id), user, { merge: true });
      return true;
    } catch (e: any) {
      console.warn(`[Firebase] Erro ao salvar usuário ${user.id}:`, e?.message || e);
      return false;
    }
  },

  async getAllAnnouncements(): Promise<any[]> {
    try {
      const snap = await getDocs(collection(db, 'announcements'));
      const list: any[] = [];
      snap.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      return list;
    } catch (e: any) {
      console.warn('[Firebase] Erro ao buscar avisos:', e?.message || e);
      return [];
    }
  },

  async saveAnnouncement(ann: any): Promise<boolean> {
    try {
      await setDoc(doc(db, 'announcements', ann.id), ann, { merge: true });
      return true;
    } catch (e: any) {
      console.warn(`[Firebase] Erro ao salvar aviso ${ann.id}:`, e?.message || e);
      return false;
    }
  },

  async deleteAnnouncement(annId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'announcements', annId));
      return true;
    } catch (e: any) {
      console.warn(`[Firebase] Erro ao remover aviso ${annId}:`, e?.message || e);
      return false;
    }
  },

  async getAllCompletions(): Promise<any[]> {
    try {
      const snap = await getDocs(collection(db, 'completions'));
      const list: any[] = [];
      snap.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      return list;
    } catch (e: any) {
      console.warn('[Firebase] Erro ao buscar entregas:', e?.message || e);
      return [];
    }
  },

  async saveCompletion(comp: any): Promise<boolean> {
    try {
      const compId = `${comp.user_id}_${comp.task_id}`;
      await setDoc(doc(db, 'completions', compId), { ...comp, id: compId }, { merge: true });
      return true;
    } catch (e: any) {
      console.warn(`[Firebase] Erro ao salvar entrega:`, e?.message || e);
      return false;
    }
  }
};
