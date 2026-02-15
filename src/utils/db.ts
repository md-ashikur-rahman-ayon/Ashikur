
export const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('StudioDataDB', 1);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('content')) {
                db.createObjectStore('content');
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const saveData = async (data: any) => {
    const db: any = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('content', 'readwrite');
        const store = transaction.objectStore('content');
        const request = store.put(data, 'site_data');
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
    });
};

export const loadData = async () => {
    const db: any = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('content', 'readonly');
        const store = transaction.objectStore('content');
        const request = store.get('site_data');
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
