import { getUserQuestGenerated, getUserQuestHistory } from '$lib/apis/users';

export const load = async ({ cookies, url }) => {
	const token = JSON.parse(cookies.get('token') || '');
	const questType = url.searchParams.get('type') || 'all';
	const questStatus = url.searchParams.get('status') || 'null';

	try {
		let quests = [];
		if (questType == 'generated') {
			const { data } = await getUserQuestGenerated(token, 1);
			quests = data;
		} else {
			const { data } = await getUserQuestHistory(token, questType, questStatus, 1);
			quests = data;
		}
		return { quests };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
