import { QUEBYS_API_BASE_URL } from '$lib/constants';

export const generateQuest = async (userId: string, type: string) => {
	try {
		const response = await fetch(`${QUEBYS_API_BASE_URL}/quests/generate`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: userId,
				type: type
			})
		});

		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const getQuestDetail = async (questId: string, type: string) => {
	try {
		let URL_API = '';
		if (type === 'generated') {
			URL_API = `${QUEBYS_API_BASE_URL}/quests/${questId}?type=${type}`;
		}else {
			URL_API = `${QUEBYS_API_BASE_URL}/quests/${questId}`;
		}
		const response = await fetch(URL_API);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const acceptQuest = async (questId: string) => {
	try {
		const response = await fetch(`${QUEBYS_API_BASE_URL}/quests/${questId}/accept`, {
			method: 'POST'
		});

		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const updateQuestStatus = async (questId: string, status: string) => {
	try {
		const response = await fetch(`${QUEBYS_API_BASE_URL}/quests/${questId}/status`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				status: status
			})
		});

		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
