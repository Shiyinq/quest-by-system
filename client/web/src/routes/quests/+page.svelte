<script lang="ts">
	import CardQuests from '$lib/components/quests/CardQuests.svelte';
	import { slide } from 'svelte/transition';

	export let data: any;
</script>

<svelte:head>
	<title>Quests</title>
	<meta name="description" content="QUEBYS - Quests" />
</svelte:head>

<div class="card-container" transition:slide={{ duration: 1000 }}>
	<div class="dialog">
		<h2>📜 Quests</h2>
		<p>Your quest history</p>
	</div>

	{#if data.dailyQuests}
		<CardQuests
			title="📅 Daily"
			description="Your daily quest"
			quests={data.dailyQuests}
			query="?type=daily"
		/>
	{/if}

	{#if data.weeklyQuests}
		<CardQuests
			title="📆 Weekly"
			description="Your weekly quest"
			quests={data.weeklyQuests}
			query="?type=weekly"
		/>
	{/if}

	{#if data.monthlyQuests}
		<CardQuests
			title="🗓️ Monthly"
			description="Your monthly quest"
			quests={data.monthlyQuests}
			query="?type=monthly"
		/>
	{/if}

	{#if data.sideQuests}
		<CardQuests
			title="🗓️ Side"
			description="Your side quest"
			quests={data.sideQuests}
			query="?type=side"
		/>
	{/if}
</div>
