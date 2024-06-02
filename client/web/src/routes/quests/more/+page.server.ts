import { getUserQuestGenerated, getUserQuestHistory } from '$lib/apis/users';

export const load = async ({ cookies, url }) => {
	const userId = JSON.parse(cookies.get('userId') || '');
	const questType = url.searchParams.get('type') || 'all';
	const questStatus = url.searchParams.get('status') || 'null';

	try {
		let quests = [];
		if (questType == 'generated') {
			const { data } = await getUserQuestGenerated(userId, 1);
			quests = data;
		} else {
			const { data } = await getUserQuestHistory(userId, questType, questStatus, 1);
			quests = data;
		}
		return { quests };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
