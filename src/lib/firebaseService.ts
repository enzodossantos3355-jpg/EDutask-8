import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase.js';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): FirestoreErrorInfo {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  return errInfo;
}

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
      handleFirestoreError(e, OperationType.LIST, 'tasks');
      return [];
    }
  },

  async saveTask(task: any): Promise<boolean> {
    try {
      await setDoc(doc(db, 'tasks', task.id), task, { merge: true });
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.WRITE, `tasks/${task.id}`);
      return false;
    }
  },

  async deleteTask(taskId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.DELETE, `tasks/${taskId}`);
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
      handleFirestoreError(e, OperationType.LIST, 'users');
      return [];
    }
  },

  async saveUser(user: any): Promise<boolean> {
    try {
      await setDoc(doc(db, 'users', user.id), user, { merge: true });
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.WRITE, `users/${user.id}`);
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
      handleFirestoreError(e, OperationType.LIST, 'announcements');
      return [];
    }
  },

  async saveAnnouncement(ann: any): Promise<boolean> {
    try {
      await setDoc(doc(db, 'announcements', ann.id), ann, { merge: true });
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.WRITE, `announcements/${ann.id}`);
      return false;
    }
  },

  async deleteAnnouncement(annId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'announcements', annId));
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.DELETE, `announcements/${annId}`);
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
      handleFirestoreError(e, OperationType.LIST, 'completions');
      return [];
    }
  },

  async saveCompletion(comp: any): Promise<boolean> {
    try {
      const compId = `${comp.user_id}_${comp.task_id}`;
      await setDoc(doc(db, 'completions', compId), { ...comp, id: compId }, { merge: true });
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.WRITE, `completions/${comp.user_id}_${comp.task_id}`);
      return false;
    }
  }
};
