import { getQuestDetail } from '$lib/apis/quests';
import { loadWithToken } from '$lib/utils/loadPage';
import type { RequestEvent } from '@sveltejs/kit';

const loadData = async (token: string, loadFunction: RequestEvent) => {
	const { params, url } = loadFunction;
	const { questId } = params;
	const questType = url.searchParams.get('type') || 'null';

	const questDetail = await getQuestDetail(token, questId || '', questType);
	return { questDetail };
};

export const load = async (loadFunction: RequestEvent) => {
	return await loadWithToken(loadFunction, loadData);
};
