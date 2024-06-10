import { getUserQuestHistory } from '$lib/apis/users';

export const load = async ({ cookies }) => {
	const token = JSON.parse(cookies.get('token') || '');
	try {
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
	} catch (error) {
		console.log(error);
		throw error;
	}
};
