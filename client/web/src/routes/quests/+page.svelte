<script>
	import { getUserQuestHistory } from '$lib/apis/users';
	import LoadingCard from '$lib/components/LoadingCard.svelte';
	import ReFetchData from '$lib/components/ReFetchData.svelte';
	import CardQuests from '$lib/components/quests/CardQuests.svelte';
	import { userId } from '$lib/store';
	import { slide } from 'svelte/transition';

	let getDailyQuests = getUserQuestHistory($userId, 'daily');
	let getWeeklyQuests = getUserQuestHistory($userId, 'weekly');
	let getMonthlyQuests = getUserQuestHistory($userId, 'monthly');
	let getSideQuests = getUserQuestHistory($userId, 'side');

	const reFetchDailyQuests = () => {
		getDailyQuests = getUserQuestHistory($userId, 'daily');
	};

	const reFetchWeeklyQuests = () => {
		getWeeklyQuests = getUserQuestHistory($userId, 'weekly');
	};

	const reFetchMonthlyQuests = () => {
		getMonthlyQuests = getUserQuestHistory($userId, 'monthly');
	};

	const reFetchSideQuests = () => {
		getSideQuests = getUserQuestHistory($userId, 'side');
	};
</script>

<div class="card-container" transition:slide={{ duration: 1000 }}>
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
			query="?type=daily"
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
			query="?type=weekly"
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
			query="?type=monthly"
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
			query="?type=side"
		/>
	{:catch}
		<ReFetchData actionButton={reFetchSideQuests} />
	{/await}
</div>
