import cookie from 'cookie';
import { jwtDecode } from 'jwt-decode';
import { writable, type Writable } from 'svelte/store';

const createPersistedStore = (key: string, startValue: string) => {
	let parsedValue = startValue;

	if (typeof document !== 'undefined') {
		const cookies = cookie.parse(document.cookie);
		const storedValue = cookies[key];

		try {
			parsedValue = storedValue ? JSON.parse(storedValue) : startValue;
		} catch (e) {
			console.error('Error parsing stored value: ', e);
			parsedValue = startValue;
		}
	}

	const store = writable(parsedValue);

	if (typeof document !== 'undefined') {
		store.subscribe((value) => {
			if (value !== '') {
				let maxAge = 365 * 24 * 60 * 60;
				if (key === 'token') {
					const { exp } = jwtDecode(value);
					if (exp) {
						const currentTime = Math.floor(Date.now() / 1000);
						maxAge = exp - currentTime;
						if (maxAge < 0) {
							maxAge = 0;
						}
					} else {
						maxAge = -1;
					}
				}
				document.cookie = cookie.serialize(key, JSON.stringify(value), {
					path: '/',
					maxAge: maxAge
				});
			}
		});
	}

	return store;
};

const toggleTheme = () => {
	let initialTheme = 'light';

	if (typeof document !== 'undefined') {
		const cookies = cookie.parse(document.cookie);
		initialTheme = cookies['theme'] || 'light';
	}

	const theme = writable(initialTheme);

	if (typeof document !== 'undefined') {
		theme.subscribe((value) => {
			document.cookie = cookie.serialize('theme', value, {
				path: '/',
				maxAge: 365 * 24 * 60 * 60
			});
			document.documentElement.setAttribute('data-theme', value);
		});
	}

	return theme;
};

export const theme = toggleTheme();
export const activeMenu = createPersistedStore('activeMenu', '/');
export const token = createPersistedStore('token', '');
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
