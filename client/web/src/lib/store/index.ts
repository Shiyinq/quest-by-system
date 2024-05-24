import { writable } from 'svelte/store';

const createPersistedStore = (key: string, startValue: string) => {
    const storedValue = localStorage.getItem(key);
    const store = writable(storedValue ? JSON.parse(storedValue) : startValue);

    store.subscribe(value => {
        if (startValue != '') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    });

    return store;
}

export const userId = createPersistedStore('userId', '');