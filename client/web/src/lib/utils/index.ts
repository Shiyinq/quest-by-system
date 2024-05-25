export const getLabelNew = (createdAt: string): string => {
	const createdAtDate = new Date(createdAt);

	const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
	const nowDate = new Date(now);

	const timeDifference = Math.abs((nowDate.getTime() - createdAtDate.getTime()) / 60000);

	const label = timeDifference < 10 ? 'New!!' : '';

	return label;
};

export const numberToEmoji = (number: number) => {
	const emojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
	const numString = number.toString();
	let result = '';

	for (let i = 0; i < numString.length; i++) {
		const digit = parseInt(numString[i]);
		if (!isNaN(digit)) {
			result += emojis[digit];
		}
	}

	return result;
};

export const capitalizeWord = (word: string) => {
	if (!word) return '';
	const firstLetter = word.charAt(0).toUpperCase();
	const capitalizedWord = firstLetter + word.slice(1);
	return capitalizedWord;
};
