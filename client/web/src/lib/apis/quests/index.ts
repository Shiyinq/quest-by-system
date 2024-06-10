import { myFetch } from '$lib/utils';

export const generateQuest = async (token: string, type: string) => {
	try {
		const options = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ type: type })
		};
		const response = await myFetch('POST', token, '/quests/generate', options);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const getQuestDetail = async (token: string, questId: string, type: string) => {
	try {
		let URL_API = '';
		if (type === 'generated') {
			URL_API = `/quests/${questId}?type=${type}`;
		} else {
			URL_API = `/quests/${questId}`;
		}
		const response = await myFetch('GET', token, URL_API);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const acceptQuest = async (token: string, questId: string) => {
	try {
		const response = await myFetch('POST', token, `/quests/${questId}/accept`);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const updateQuestStatus = async (token: string, questId: string, status: string) => {
	try {
		const options = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ status: status })
		};
		const response = await myFetch('PUT', token, `/quests/${questId}/status`, options);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
