<script>
	import CardQuests from "$lib/components/quests/CardQuests.svelte";
	import GenerateQuest from "$lib/components/quests/GenerateQuest.svelte";

	const generatedQuests = ["Quest 1", "Quest 2", "Quest 3"];
	const acceptedQuests = ["Quest 1", "Quest 2", "Quest 3"];
</script>

<div class="card-container">
	<GenerateQuest />

	<CardQuests
		title="🌟 Generated Quests"
		description="Quests that have been generated but not yet accepted"
		quests={generatedQuests}
	/>

	<CardQuests 
		title="📜 Recently Accepted Quests"
		description="Recently received quests"
		quests={acceptedQuests}
	/>
</div>

<style>
    .card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
