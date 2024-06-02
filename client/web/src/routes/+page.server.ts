import { getUserQuestGenerated, getUserQuestHistory } from '$lib/apis/users';

export const load = async ({ cookies }) => {
	const userId = JSON.parse(cookies.get('userId') || '');
	try {
		const [generatedQuest, acceptedQuest] = await Promise.all([
			getUserQuestGenerated(userId),
			getUserQuestHistory(userId, 'all', 'in progress')
		]);

		return {
			generatedQuest,
			acceptedQuest
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
};
