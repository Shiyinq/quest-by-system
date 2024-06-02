import { getUserQuestGenerated, getUserQuestHistory } from '$lib/apis/users';

const fetchGeneratedQuest = async (userId: string) => {
	try {
		const getGeneratedQuest = await getUserQuestGenerated(userId);
		return getGeneratedQuest;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const fetchAcceptedQuest = async (userId: string) => {
	try {
		const getAcceptedQuest = await getUserQuestHistory(userId, 'all', 'in progress');
		return getAcceptedQuest;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const load = async ({ cookies }) => {
	const userId = JSON.parse(cookies.get('userId') || '');
	try {
		const [generatedQuest, acceptedQuest] = await Promise.all([
			fetchGeneratedQuest(userId),
			fetchAcceptedQuest(userId)
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
