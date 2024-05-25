<script>
	import { onMount } from 'svelte';
	import { dataGeneratedQuests, dataAcceptedQuests } from '$lib/store';
	import { getUserQuestGenerated, getUserQuestHistory } from '$lib/apis/users';
	import CardQuests from '$lib/components/quests/CardQuests.svelte';
	import GenerateQuest from '$lib/components/quests/GenerateQuest.svelte';
	import LoadingCard from '$lib/components/LoadingCard.svelte';
	import ReFetchData from '$lib/components/ReFetchData.svelte';

	const fetchGeneratedQuest = async () => {
		try {
			dataGeneratedQuests.set('loading');
			let getGeneratedQuest = await getUserQuestGenerated(localStorage.userId);
			dataGeneratedQuests.set(getGeneratedQuest);
		} catch (err) {
			console.log(err);
			dataGeneratedQuests.set('error');
		}
	};

	const fetchAcceptedQuest = async () => {
		try {
			dataAcceptedQuests.set('loading');
			let getAcceptedQuest = await getUserQuestHistory(localStorage.userId, 'all', 'in progress');
			dataAcceptedQuests.set(getAcceptedQuest);
		} catch (error) {
			console.log(error);
			dataAcceptedQuests.set('error');
		}
	};

	onMount(() => {
		fetchGeneratedQuest();
		fetchAcceptedQuest();
	});
</script>

<div class="card-container">
	<GenerateQuest />

	{#if $dataGeneratedQuests == 'loading'}
		<LoadingCard />
	{:else if $dataGeneratedQuests == 'error' || !dataGeneratedQuests}
		<ReFetchData actionButton={fetchGeneratedQuest} />
	{:else if $dataGeneratedQuests}
		<CardQuests
			title="🌟 Generated Quests"
			description="Quests that have been generated but not yet accepted"
			quests={$dataGeneratedQuests}
			query="?type=generated"
		/>
	{/if}

	{#if $dataAcceptedQuests == 'loading'}
		<LoadingCard />
	{:else if $dataAcceptedQuests == 'error' || !dataAcceptedQuests}
		<ReFetchData actionButton={fetchAcceptedQuest} />
	{:else if $dataAcceptedQuests}
		<CardQuests
			title="📜 Recently Accepted Quests"
			description="Recently received quests"
			quests={$dataAcceptedQuests}
			query="?type=all&status=in%20progress"
		/>
	{/if}
</div>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
