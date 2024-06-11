import { getUserQuestHistory } from '$lib/apis/users';
import { loadWithToken } from '$lib/utils/loadPage.js';
import type { RequestEvent } from '@sveltejs/kit';

const loadData = async (token: string) => {
	const [dailyQuests, weeklyQuests, monthlyQuests, sideQuests] = await Promise.all([
		getUserQuestHistory(token, 'daily'),
		getUserQuestHistory(token, 'weekly'),
		getUserQuestHistory(token, 'monthly'),
		getUserQuestHistory(token, 'side')
	]);

	return {
		dailyQuests,
		weeklyQuests,
		monthlyQuests,
		sideQuests
	};
};

export const load = async (loadFunction: RequestEvent) => {
	return await loadWithToken(loadFunction, loadData);
};
