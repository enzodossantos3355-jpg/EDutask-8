import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
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
  // Tasks
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

  // Users
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

  async deleteUser(userId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'users', userId));
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.DELETE, `users/${userId}`);
      return false;
    }
  },

  // Subjects
  async getAllSubjects(): Promise<any[]> {
    try {
      const snap = await getDocs(collection(db, 'subjects'));
      const subjects: any[] = [];
      snap.forEach((docSnap) => {
        subjects.push({ id: docSnap.id, ...docSnap.data() });
      });
      return subjects;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.LIST, 'subjects');
      return [];
    }
  },

  async saveSubject(subject: any): Promise<boolean> {
    try {
      await setDoc(doc(db, 'subjects', subject.id), subject, { merge: true });
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.WRITE, `subjects/${subject.id}`);
      return false;
    }
  },

  async deleteSubject(subjectId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'subjects', subjectId));
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.DELETE, `subjects/${subjectId}`);
      return false;
    }
  },

  // Announcements
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

  // Completions
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
  },

  async deleteCompletion(userId: string, taskId: string): Promise<boolean> {
    try {
      const compId = `${userId}_${taskId}`;
      await deleteDoc(doc(db, 'completions', compId));
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.DELETE, `completions/${userId}_${taskId}`);
      return false;
    }
  },

  // Comments
  async getAllComments(): Promise<any[]> {
    try {
      const snap = await getDocs(collection(db, 'comments'));
      const list: any[] = [];
      snap.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      return list;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.LIST, 'comments');
      return [];
    }
  },

  async saveComment(comment: any): Promise<boolean> {
    try {
      await setDoc(doc(db, 'comments', comment.id), comment, { merge: true });
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.WRITE, `comments/${comment.id}`);
      return false;
    }
  },

  async deleteComment(commentId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.DELETE, `comments/${commentId}`);
      return false;
    }
  },

  // System Settings / Config
  async getSettings(id: string): Promise<any | null> {
    try {
      const snap = await getDoc(doc(db, 'settings', id));
      if (snap.exists()) {
        return snap.data();
      }
      return null;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.GET, `settings/${id}`);
      return null;
    }
  },

  async saveSettings(id: string, data: any): Promise<boolean> {
    try {
      await setDoc(doc(db, 'settings', id), data, { merge: true });
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.WRITE, `settings/${id}`);
      return false;
    }
  },

  // Student Answers
  async getAllStudentAnswers(): Promise<any[]> {
    try {
      const snap = await getDocs(collection(db, 'student_answers'));
      const list: any[] = [];
      snap.forEach((docSnap) => {
        list.push({ key: docSnap.id, ...docSnap.data() });
      });
      return list;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.LIST, 'student_answers');
      return [];
    }
  },

  async saveStudentAnswer(key: string, data: any): Promise<boolean> {
    try {
      await setDoc(doc(db, 'student_answers', key), data, { merge: true });
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.WRITE, `student_answers/${key}`);
      return false;
    }
  },

  // Files & Attachments Storage
  async getAllFiles(): Promise<any[]> {
    try {
      const snap = await getDocs(collection(db, 'files'));
      const list: any[] = [];
      snap.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      return list;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.LIST, 'files');
      return [];
    }
  },

  async getFile(fileId: string): Promise<any | null> {
    try {
      const snap = await getDoc(doc(db, 'files', fileId));
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() };
      }
      return null;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.GET, `files/${fileId}`);
      return null;
    }
  },

  async saveFile(fileRecord: any): Promise<boolean> {
    try {
      await setDoc(doc(db, 'files', fileRecord.id), fileRecord, { merge: true });
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.WRITE, `files/${fileRecord.id}`);
      return false;
    }
  },

  async deleteFile(fileId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'files', fileId));
      return true;
    } catch (e: any) {
      handleFirestoreError(e, OperationType.DELETE, `files/${fileId}`);
      return false;
    }
  }
};
