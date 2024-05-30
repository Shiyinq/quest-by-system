<script>
	import { getUserDetail, getUserQuestStats } from '$lib/apis/users';
	import UserInfo from '$lib/components/profile/UserInfo.svelte';
	import CountQuests from '$lib/components/profile/CountQuests.svelte';
	import LoadingCard from '$lib/components/LoadingCard.svelte';
	import ReFetchData from '$lib/components/ReFetchData.svelte';
	import { slide } from 'svelte/transition';
	import QuestGoal from '$lib/components/profile/QuestGoal.svelte';
	import { dataUserInfo } from '$lib/store';
	import { onMount } from 'svelte';

	const questTypes = [
		{ title: '📋 Daily Quest', key: 'daily' },
		{ title: '📋 Weekly Quest', key: 'weekly' },
		{ title: '📋 Monthly Quest', key: 'monthly' },
		{ title: '📋 Side Quest', key: 'side' }
	];

	let getQuestStats = getUserQuestStats(localStorage.userId);
	const reFetchQuestStats = () => {
		getQuestStats = getUserQuestStats(localStorage.userId);
	};

	const fetchUserInfo = async () => {
		try {
			dataUserInfo.set('loading');
			let getUserInfo = await getUserDetail(localStorage.userId);
			dataUserInfo.set(getUserInfo);
		} catch (err) {
			console.log(err);
			dataUserInfo.set('error');
		}
	};

	onMount(() => {
		fetchUserInfo();
	});
</script>

<div class="card-container" transition:slide={{ duration: 1000 }}>
	{#if $dataUserInfo == 'loading'}
		<LoadingCard />
	{:else if $dataUserInfo == 'error' || !$dataUserInfo}
		<ReFetchData actionButton={fetchUserInfo} />
	{:else if $dataUserInfo}
		<UserInfo userInfo={$dataUserInfo} />
		<QuestGoal userInfo={$dataUserInfo} />
	{/if}

	{#await getQuestStats}
		<LoadingCard />
	{:then countQuests}
		{#each questTypes as questType}
			<CountQuests title={questType.title} quest={countQuests[questType.key]} />
		{/each}
	{:catch}
		<ReFetchData actionButton={reFetchQuestStats} />
	{/await}
</div>
