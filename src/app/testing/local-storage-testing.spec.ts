import { createLocalStorageMock } from './local-storage-testing';

describe('createLocalStorageMock', () => {
    it('should store, read, and report the length of items', () => {
        const storage = createLocalStorageMock();

        storage.setItem('a', '1');
        storage.setItem('b', '2');

        expect(storage.getItem('a')).toBe('1');
        expect(storage.length).toBe(2);
        expect(storage.key(0)).toBe('a');
        expect(storage.key(5)).toBeNull();
    });

    it('should return null for a missing key', () => {
        const storage = createLocalStorageMock();

        expect(storage.getItem('missing')).toBeNull();
    });

    it('should remove a single item', () => {
        const storage = createLocalStorageMock();
        storage.setItem('a', '1');

        storage.removeItem('a');

        expect(storage.getItem('a')).toBeNull();
        expect(storage.length).toBe(0);
    });

    it('should clear all items', () => {
        const storage = createLocalStorageMock();
        storage.setItem('a', '1');
        storage.setItem('b', '2');

        storage.clear();

        expect(storage.length).toBe(0);
    });
});
