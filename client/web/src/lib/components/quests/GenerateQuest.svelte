<script lang="ts">
	import { generateQuest } from '$lib/apis/quests';
	import { getUserQuestGenerated } from '$lib/apis/users';
	import { dataGeneratedQuests } from '$lib/store';
	import LoadingCard from '$lib/components/LoadingCard.svelte';
	import QuestDetail from '$lib/components/quests/QuestDetail.svelte';

	let generating = false;
	let quest = '';
	$: colorButton = generating ? 'default disabled' : 'blue';

	const fetchGeneratedQuest = async () => {
		try {
			let getGeneratedQuest = await getUserQuestGenerated(localStorage.userId);
			dataGeneratedQuests.set(getGeneratedQuest);
		} catch (err) {
			console.log(err);
		}
	};

	const generatingQuest = async (questType: string) => {
		generating = true;
		quest = '';
		try {
			quest = await generateQuest(localStorage.userId, questType);
			await fetchGeneratedQuest();
			generating = false;
		} catch (err) {
			console.log(err);
			generating = false;
		}
	};
</script>

<div class="dialog">
	<h2>🔄 Generate Quest</h2>
	<p>Generate and receive quests based on the type you choose</p>
	<div class="button-container">
		<button
			class={'nb-button rounded ' + colorButton}
			on:click={() => generatingQuest('daily')}
			disabled={generating}>Daily</button
		>
		<button
			class={'nb-button rounded ' + colorButton}
			on:click={() => generatingQuest('weekly')}
			disabled={generating}>Weekly</button
		>
		<button
			class={'nb-button rounded ' + colorButton}
			on:click={() => generatingQuest('monthly')}
			disabled={generating}>Monthly</button
		>
		<button
			class={'nb-button rounded ' + colorButton}
			on:click={() => generatingQuest('side')}
			disabled={generating}>Side</button
		>
	</div>
</div>

{#if generating}
	<LoadingCard text="🔄 Generating quest for you, please wait..." />
{/if}

{#if quest}
	<QuestDetail {quest} />
{/if}

<style>
	.button-container {
		display: flex;
		gap: 10px;
		width: 100%;
		overflow-x: scroll;
	}

	.disabled {
		pointer-events: none;
		cursor: default;
	}
</style>
