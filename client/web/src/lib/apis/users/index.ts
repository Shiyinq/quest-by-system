import { myFetch } from '$lib/utils';
import { QUEBYS_API_BASE_URL } from '$lib/constants';

export const userSignIn = async (username: string, password: string) => {
	const response = await fetch(`${QUEBYS_API_BASE_URL}/auth/sign-in`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			username: username,
			password: password
		}).toString()
	});

	if (!response.ok) throw await response.json();
	return await response.json();
};

export const userSignUp = async (name: string, username: string, password: string) => {
	const response = await fetch(`${QUEBYS_API_BASE_URL}/auth/sign-up`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name,
			username: username,
			password: password,
			source: 'web'
		})
	});
	if (!response.ok) throw await response.json();
	return await response.json();
};

export const getUserDetail = async (token: string) => {
	const response = await myFetch('GET', token, '/users/me');
	if (!response.ok) throw await response.json();
	return await response.json();
};

export const setUserGoal = async (token: string, goal: string) => {
	const options = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			goal: goal
		})
	};
	const response = await myFetch('PUT', token, '/users/goal', options);
	if (!response.ok) throw await response.json();
	return await response.json();
};

export const getUserQuestGenerated = async (token: string, page: number = 1, limit: number = 5) => {
	const response = await myFetch(
		'GET',
		token,
		`/users/quests/generated?page=${page}&limit=${limit}`
	);
	if (!response.ok) throw await response.json();
	return await response.json();
};

export const getUserQuestHistory = async (
	token: string,
	type: string = 'all',
	status: string = 'null',
	page: number = 1,
	limit: number = 5
) => {
	const response = await myFetch(
		'GET',
		token,
		`/users/quests/history?type=${type}&status=${status}&page=${page}&limit=${limit}`
	);
	if (!response.ok) throw await response.json();
	return await response.json();
};

export const getUserQuestStats = async (token: string) => {
	const response = await myFetch('GET', token, '/users/quests/stats');
	if (!response.ok) throw await response.json();
	return await response.json();
};
