<script lang="ts">
	import QuestDetail from '$lib/components/quests/QuestDetail.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>Quest Detail</title>
	<meta name="description" content="QUEBYS - Quest Detail" />
</svelte:head>


<div class="card-container">
	{#if data.questDetail}
		<QuestDetail quest={data.questDetail} showFullContent={true} />
	{/if}
</div>
