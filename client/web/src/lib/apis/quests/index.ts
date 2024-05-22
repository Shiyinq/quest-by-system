import { QUEBYS_API_BASE_URL } from '$lib/constants';

export const getQuestDetail = async (questId: string) => {
	try {
		const response = await fetch(`${QUEBYS_API_BASE_URL}/quests/${questId}`);
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
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				status: status
			})
		});

		const data = await response.json();
		return data
	} catch (err) {
		console.log(err);
		throw err;
	}
}
