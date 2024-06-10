import { getQuestDetail } from '$lib/apis/quests';

export const load = async ({ params, url, cookies }) => {
	const { questId } = params;
	const token = JSON.parse(cookies.get('token') || '');
	const questType = url.searchParams.get('type') || 'null';
	try {
		const questDetail = await getQuestDetail(token, questId, questType);
		return { questDetail };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
