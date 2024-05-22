<script>
	import { getUserQuestGenerated, getUserQuestHistory } from "$lib/apis/users";
	import CardQuests from "$lib/components/quests/CardQuests.svelte";
	import GenerateQuest from "$lib/components/quests/GenerateQuest.svelte";
	import LoadingCard from "$lib/components/LoadingCard.svelte";
	import ReFetchData from "$lib/components/ReFetchData.svelte";

	let userId = "123";
	let getGeneratedQuest = getUserQuestGenerated(userId);
	let getAcceptedQuest = getUserQuestHistory(userId, "all", "in progress");

	const reFetchGeneratedQuest = () => {
		getGeneratedQuest = getUserQuestGenerated(userId);
	}

	const reFetchAcceptedQuest = () => {
		getAcceptedQuest = getUserQuestHistory(userId, "all", "in progress");
	}
</script>

<div class="card-container">
	<GenerateQuest />
	{#await getGeneratedQuest}
		<LoadingCard />
	{:then generatedQuests}
		<CardQuests
			title="🌟 Generated Quests"
			description="Quests that have been generated but not yet accepted"
			quests={generatedQuests}
		/>
	{:catch}
		<ReFetchData actionButton={reFetchGeneratedQuest} />
	{/await}
    
	{#await getAcceptedQuest }
		<LoadingCard />
	{:then acceptedQuests}
		<CardQuests 
			title="📜 Recently Accepted Quests"
			description="Recently received quests"
			quests={acceptedQuests}
		/>
	{:catch}
		<ReFetchData actionButton={reFetchAcceptedQuest} />
	{/await}
</div>

<style>
    .card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
