<script lang="ts">
	import { onMount } from 'svelte';
	import { dataUserInfo } from '$lib/store';
	import { slide } from 'svelte/transition';

	import UserInfo from '$lib/components/profile/UserInfo.svelte';
	import QuestGoal from '$lib/components/profile/QuestGoal.svelte';
	import CountQuests from '$lib/components/profile/CountQuests.svelte';

	export let data: any;

	const questTypes = [
		{ title: '📋 Daily Quest', key: 'daily' },
		{ title: '📋 Weekly Quest', key: 'weekly' },
		{ title: '📋 Monthly Quest', key: 'monthly' },
		{ title: '📋 Side Quest', key: 'side' }
	];

	onMount(() => {
		dataUserInfo.set(data.userInfo);
	});
</script>

<div class="card-container" transition:slide={{ duration: 1000 }}>
	{#if $dataUserInfo}
		<UserInfo userInfo={$dataUserInfo} />
		<QuestGoal userInfo={$dataUserInfo} />
	{/if}

	{#if data.userQuestStats}
		{#each questTypes as questType}
			<CountQuests title={questType.title} quest={data.userQuestStats[questType.key]} />
		{/each}
	{/if}
</div>
