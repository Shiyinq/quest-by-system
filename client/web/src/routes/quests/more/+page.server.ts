import { getUserQuestGenerated, getUserQuestHistory } from '$lib/apis/users';
import { loadWithToken } from '$lib/utils/loadPage';
import type { RequestEvent } from '@sveltejs/kit';

const loadData = async (token: string, loadFunction: RequestEvent) => {
	const { url } = loadFunction;
	const questType = url.searchParams.get('type') || 'all';
	const questStatus = url.searchParams.get('status') || 'null';

	let quests = [];
	if (questType == 'generated') {
		const { data } = await getUserQuestGenerated(token, 1);
		quests = data;
	} else {
		const { data } = await getUserQuestHistory(token, questType, questStatus, 1);
		quests = data;
	}
	return { quests };
};

export const load = async (loadFunction: RequestEvent) => {
	return await loadWithToken(loadFunction, loadData);
};
