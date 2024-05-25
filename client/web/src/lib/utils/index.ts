export const getLabelNew = (createdAt: string): string => {
	const createdAtDate = new Date(createdAt);

	const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
	const nowDate = new Date(now);

	const timeDifference = Math.abs((nowDate.getTime() - createdAtDate.getTime()) / 60000);

	const label = timeDifference < 10 ? 'New!!' : '';

	return label;
};
