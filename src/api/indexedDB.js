import {INDEXED_DB_NAME, INDEXED_DB_TABLES} from '../constants';

export default class IndexedDB {
  static openDB() {
    return new Promise((resolve, reject) => {
      const dbRequest = indexedDB.open(INDEXED_DB_NAME, 1);

      dbRequest.onsuccess = () => resolve(dbRequest.result);
      dbRequest.onerror = () => reject(dbRequest.error);
      dbRequest.onupgradeneeded = () => {
        const db = dbRequest.result;

        if (!db.objectStoreNames.contains(INDEXED_DB_TABLES.exercises)) {
          db.createObjectStore(INDEXED_DB_TABLES.exercises, {keyPath: 'id', autoIncrement: true});
        }

        if (!db.objectStoreNames.contains(INDEXED_DB_TABLES.currentTraining)) {
          db.createObjectStore(INDEXED_DB_TABLES.currentTraining, {keyPath: 'id', autoIncrement: true});
        }
      };
    });
  }

  static async getData(storeName) {
    const db = await IndexedDB.openDB();
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  static async putData(storeName, data) {
    const db = await IndexedDB.openDB();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  static async deleteData(storeName, key) {
    const db = await IndexedDB.openDB();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const request = store.delete(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}
