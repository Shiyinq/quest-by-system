import { getUserQuestHistory } from '$lib/apis/users';

export const load = async ({ cookies }) => {
	const userId = JSON.parse(cookies.get('userId') || '');
	try {
		const [dailyQuests, weeklyQuests, monthlyQuests, sideQuests] = await Promise.all([
			getUserQuestHistory(userId, 'daily'),
			getUserQuestHistory(userId, 'weekly'),
			getUserQuestHistory(userId, 'monthly'),
			getUserQuestHistory(userId, 'side')
		]);

		return {
			dailyQuests,
			weeklyQuests,
			monthlyQuests,
			sideQuests
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
};
