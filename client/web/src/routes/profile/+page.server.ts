import { getUserDetail, getUserQuestStats } from '$lib/apis/users';
import { loadWithToken } from '$lib/utils/loadPage.js';
import type { RequestEvent } from '@sveltejs/kit';

const loadData = async (token: string) => {
	const [userInfo, userQuestStats] = await Promise.all([
		getUserDetail(token),
		getUserQuestStats(token)
	]);

	return {
		userInfo,
		userQuestStats
	};
};

export const load = async (loadFunction: RequestEvent) => {
	return await loadWithToken(loadFunction, loadData);
};
