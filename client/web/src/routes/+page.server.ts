import { getUserQuestGenerated, getUserQuestHistory } from '$lib/apis/users';

export const load = async ({ cookies }) => {
	const token = JSON.parse(cookies.get('token') || '');
	try {
		const [generatedQuest, acceptedQuest] = await Promise.all([
			getUserQuestGenerated(token),
			getUserQuestHistory(token, 'all', 'in progress')
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
