<script>
	import { getUserQuestHistory } from '$lib/apis/users';
	import LoadingCard from '$lib/components/LoadingCard.svelte';
	import ReFetchData from '$lib/components/ReFetchData.svelte';
	import CardQuests from '$lib/components/quests/CardQuests.svelte';

	let getDailyQuests = getUserQuestHistory(localStorage.userId, 'daily');
	let getWeeklyQuests = getUserQuestHistory(localStorage.userId, 'weekly');
	let getMonthlyQuests = getUserQuestHistory(localStorage.userId, 'monthly');
	let getSideQuests = getUserQuestHistory(localStorage.userId, 'side');

	const reFetchDailyQuests = () => {
		getDailyQuests = getUserQuestHistory(localStorage.userId, 'daily');
	};

	const reFetchWeeklyQuests = () => {
		getWeeklyQuests = getUserQuestHistory(localStorage.userId, 'weekly');
	};

	const reFetchMonthlyQuests = () => {
		getMonthlyQuests = getUserQuestHistory(localStorage.userId, 'monthly');
	};

	const reFetchSideQuests = () => {
		getSideQuests = getUserQuestHistory(localStorage.userId, 'side');
	};
</script>

<div class="card-container">
	<div class="dialog">
		<h2>📜 Quests</h2>
		<p>Your quest history</p>
	</div>

	{#await getDailyQuests}
		<LoadingCard />
	{:then dailyQuests}
		<CardQuests
			title="📅 Daily"
			description="Your daily quest"
			quests={dailyQuests}
			moreQuestType={'daily'}
		/>
	{:catch}
		<ReFetchData actionButton={reFetchDailyQuests} />
	{/await}

	{#await getWeeklyQuests}
		<LoadingCard />
	{:then weeklyQuests}
		<CardQuests
			title="📆 Weekly"
			description="Your weekly quest"
			quests={weeklyQuests}
			moreQuestType="weekly"
		/>
	{:catch}
		<ReFetchData actionButton={reFetchWeeklyQuests} />
	{/await}

	{#await getMonthlyQuests}
		<LoadingCard />
	{:then monthlyQuests}
		<CardQuests
			title="🗓️ Monthly"
			description="Your monthly quest"
			quests={monthlyQuests}
			moreQuestType="monthly"
		/>
	{:catch}
		<ReFetchData actionButton={reFetchMonthlyQuests} />
	{/await}

	{#await getSideQuests}
		<LoadingCard />
	{:then sideQuests}
		<CardQuests
			title="🗓️ Side"
			description="Your side quest"
			quests={sideQuests}
			moreQuestType="side"
		/>
	{:catch}
		<ReFetchData actionButton={reFetchSideQuests} />
	{/await}
</div>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.dialog {
		width: 480px;
		padding: 20px;
		border-radius: 10px;
		margin-bottom: 20px;
	}

	.dialog h2 {
		margin: 0 0 10px;
		color: #0077b6;
	}

	h2 {
		font-size: 24px;
		margin-top: 30px;
		margin-bottom: 10px;
		color: #0077b6;
	}

	p {
		font-size: 18px;
		margin-bottom: 20px;
	}
</style>
