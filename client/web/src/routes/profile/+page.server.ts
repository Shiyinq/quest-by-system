import { getUserDetail, getUserQuestStats } from '$lib/apis/users';

export const load = async ({ cookies }) => {
	const token = JSON.parse(cookies.get('token') || '');
	try {
		const [userInfo, userQuestStats] = await Promise.all([
			getUserDetail(token),
			getUserQuestStats(token)
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
