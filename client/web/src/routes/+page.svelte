<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { dataGeneratedQuests, dataAcceptedQuests } from '$lib/store';

	import CardQuests from '$lib/components/quests/CardQuests.svelte';
	import GenerateQuest from '$lib/components/quests/GenerateQuest.svelte';

	export let data: any;

	onMount(() => {
		dataGeneratedQuests.set(data.generatedQuest);
		dataAcceptedQuests.set(data.acceptedQuest);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="QUEBYS - Home" />
</svelte:head>


<div class="card-container" transition:slide={{ duration: 1000 }}>
	<GenerateQuest />

	{#if $dataGeneratedQuests}
		<CardQuests
			title="🌟 Generated Quests"
			description="Quests that have been generated but not yet accepted"
			quests={$dataGeneratedQuests}
			query="?type=generated"
		/>
	{/if}

	{#if $dataAcceptedQuests}
		<CardQuests
			title="📜 Recently Accepted Quests"
			description="Recently received quests"
			quests={$dataAcceptedQuests}
			query="?type=all&status=in%20progress"
		/>
	{/if}
</div>
