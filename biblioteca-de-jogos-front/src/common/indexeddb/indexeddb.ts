import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDB {
  private dbName = 'FilesDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains('files')) {
          const store = db.createObjectStore('files', {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('name', 'name', { unique: false });
          store.createIndex('type', 'type', { unique: false });
        }
      };
    });
  }

  async saveFile(file: File): Promise<string> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');

      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        data: file,
      };

      const request = store.add(fileData);

      request.onsuccess = () => resolve(request.result as string);
      request.onerror = () => reject(request.error);
    });
  }

  async getFile(id: string): Promise<File> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['files'], 'readonly');
      const store = transaction.objectStore('files');

      const request = store.get(id);

      request.onsuccess = () => {
        const fileData = request.result;
        if (fileData) {
          resolve(fileData.data);
        } else {
          reject(new Error('Arquivo não encontrado'));
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  async deleteFile(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');

      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}
