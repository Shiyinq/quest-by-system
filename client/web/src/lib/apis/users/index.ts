import { QUEBYS_API_BASE_URL } from '$lib/constants';

export const userRegister = async (
	name: string,
	username: string,
	password: string
) => {
	try {
		const response = await fetch(`${QUEBYS_API_BASE_URL}/users/register`, {
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
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const getUserDetail = async (userId: string) => {
	try {
		const response = await fetch(`${QUEBYS_API_BASE_URL}/users/${userId}/detail`);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const setUserGoal = async (userId: string, goal: string) => {
	try {
		const response = await fetch(`${QUEBYS_API_BASE_URL}/users/${userId}/goal`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				goal: goal
			})
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const getUserQuestGenerated = async (
	userId: string,
	page: number = 1,
	limit: number = 5
) => {
	try {
		const response = await fetch(
			`${QUEBYS_API_BASE_URL}/users/${userId}/quests/generated?page=${page}&limit=${limit}`
		);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const getUserQuestHistory = async (
	userId: string,
	type: string = 'all',
	status: string = 'null',
	page: number = 1,
	limit: number = 5
) => {
	try {
		const response = await fetch(
			`${QUEBYS_API_BASE_URL}/users/${userId}/quests/history?type=${type}&status=${status}&page=${page}&limit=${limit}`
		);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const getUserQuestStats = async (userId: string) => {
	try {
		const response = await fetch(`${QUEBYS_API_BASE_URL}/users/${userId}/quests/stats`);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
