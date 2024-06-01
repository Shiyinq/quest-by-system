import { writable, type Writable } from 'svelte/store';

const createPersistedStore = (key: string, startValue: string) => {
	const storedValue = localStorage.getItem(key);

	let parsedValue;
	try {
		parsedValue = storedValue ? JSON.parse(storedValue) : startValue;
	} catch (e) {
		console.error('Error parsing stored value: ', e);
		parsedValue = storedValue;
	}

	const store = writable(parsedValue);

	store.subscribe((value) => {
		if (startValue != '') {
			localStorage.setItem(key, JSON.stringify(value));
		}
	});

	return store;
};

const toggleTheme = () => {
	const initialTheme = localStorage.getItem('theme') || 'light';
	const theme = writable(initialTheme);

	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.setAttribute('data-theme', value);
	});

	return theme;
};

export const theme = toggleTheme();
export const activeMenu = createPersistedStore('activeMenu', '/');
export const userId = createPersistedStore('userId', '');
export const dataGeneratedQuests: Writable<TypeGeneratedQuest | string> = writable();
export const dataAcceptedQuests: Writable<TypeAcceptedQuest | string> = writable();
export const dataUserInfo: Writable<TypeUserInfo | string> = writable();

interface TypeUserInfo {
	userId: string;
	username: string | null;
	name: string;
	goal: string;
	source: string;
	createdAt: string;
	updatedAt: string;
}

interface TypeGeneratedQuest {
	metadata: Metadata;
	data: Quest[];
}

interface TypeAcceptedQuest {
	metadata: Metadata;
	data: Quest[];
}

interface Metadata {
	page: number;
	limit: number;
	prevPage: number | null;
	nextPage: number | null;
	totalPage: number;
}

interface Quest {
	questId: string;
	userId: string;
	type: string;
	quest: string;
	status: string;
	createdAt: string;
	acceptedAt: string | null;
}
