import { getUserDetail, getUserQuestStats } from '$lib/apis/users';

export const load = async ({ cookies }) => {
	const userId = JSON.parse(cookies.get('userId') || '');
	try {
		const [userInfo, userQuestStats] = await Promise.all([
			getUserDetail(userId),
			getUserQuestStats(userId)
		]);

		return {
			userInfo,
			userQuestStats
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
};
