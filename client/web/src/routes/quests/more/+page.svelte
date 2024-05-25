<script lang="ts">
	interface InfiniteEventDetail {
		loaded: () => void;
		complete: () => void;
	}

	import InfiniteLoading from 'svelte-infinite-loading';
	import QuestDetail from '$lib/components/quests/QuestDetail.svelte';
	import { page } from '$app/stores';
	import { getUserQuestHistory } from '$lib/apis/users';
	import { capitalizeWord } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let questType = $page.url.searchParams.get('type') || 'all';
	let questStatus = $page.url.searchParams.get('status') || 'null';

	let list: any[] = [];
	let pages = 1;

	const infiniteHandler = async (event: CustomEvent<InfiniteEventDetail>) => {
		const { loaded, complete } = event.detail;
		try {
			const { metadata, data } = await getUserQuestHistory(
				localStorage.userId,
				questType,
				questStatus,
				pages
			);
			if (pages == 1) {
				list = [...list, ...data];
				pages += 1;
				loaded();
			} else if (metadata.nextPage) {
				pages = metadata.nextPage;
				list = [...list, ...data];
				loaded();
			} else {
				complete();
			}
		} catch (error) {
			complete();
		}
	};

	const filterButton = async (status: string) => {
		pages = 1;
		questStatus = status;
		const { data } = await getUserQuestHistory(localStorage.userId, questType, questStatus, pages);
		list = data;

		goto(`${window.location.origin}/quests/more?type=${questType}&status=${questStatus}`);
	};

	onMount(async () =>{
		const { data } = await getUserQuestHistory(localStorage.userId, questType, questStatus, pages);
		list = data;
	})
</script>

<div class="card-container">
	{#if questType != 'generated'}
		<div class="dialog">
			<h2>📜 {capitalizeWord(questType)} Quests</h2>
			<div class="filter-button">
				<button class="nb-button blue" on:click={async () => await filterButton('null')}>All</button>
				<button class="nb-button blue" on:click={async () => await filterButton('in progress')}
					>In progress</button
				>
				<button class="nb-button blue" on:click={async () => await filterButton('completed')}
					>Completed</button
				>
				<button class="nb-button blue" on:click={async () => await filterButton('not completed')}
					>Not Completed</button
				>
			</div>
		</div>
	{/if}

	{#each list as quest}
		<QuestDetail {quest} showFullContent={false} />
	{/each}
</div>

<InfiniteLoading on:infinite={infiniteHandler} />
<br />

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.dialog {
		width: 620px;
		padding: 20px;
		border-radius: 10px;
		margin-bottom: 20px;
	}

	.dialog h2 {
		margin: 0 0 10px;
		color: #0077b6;
	}

	h2 {
		font-size: 24px;
		margin-top: 30px;
		margin-bottom: 10px;
		color: #0077b6;
	}

	button {
		cursor: pointer;
	}
</style>
