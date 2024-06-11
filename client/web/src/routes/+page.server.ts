import { getUserQuestGenerated, getUserQuestHistory } from '$lib/apis/users';
import { loadWithToken } from '$lib/utils/loadPage.js';
import type { RequestEvent } from '@sveltejs/kit';

const loadData = async (token: string) => {
	const [generatedQuest, acceptedQuest] = await Promise.all([
		getUserQuestGenerated(token),
		getUserQuestHistory(token, 'all', 'in progress')
	]);

	return {
		generatedQuest,
		acceptedQuest
	};
};

export const load = async (loadFunction: RequestEvent) => {
	return await loadWithToken(loadFunction, loadData);
};
