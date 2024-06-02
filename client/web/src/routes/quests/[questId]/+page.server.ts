import { getQuestDetail } from '$lib/apis/quests';

export const load = async ({ params, url }) => {
	const { questId } = params;
	const questType = url.searchParams.get('type') || 'null';
	try {
		const questDetail = await getQuestDetail(questId, questType);
		return { questDetail };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
