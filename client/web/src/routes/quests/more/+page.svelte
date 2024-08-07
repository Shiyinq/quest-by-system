<script lang="ts">
	interface InfiniteEventDetail {
		loaded: () => void;
		complete: () => void;
	}

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { token } from '$lib/store';
	import { goto } from '$app/navigation';
	import { capitalizeWord } from '$lib/utils';
	import { getUserQuestHistory, getUserQuestGenerated } from '$lib/apis/users';

	import InfiniteLoading from 'svelte-infinite-loading';

	import QuestDetail from '$lib/components/quests/QuestDetail.svelte';

	export let data: any;
	let questType = $page.url.searchParams.get('type') || 'all';
	let questStatus = $page.url.searchParams.get('status') || 'null';

	let list: any[] = [];
	let pages = 1;

	const infiniteHandler = async (event: CustomEvent<InfiniteEventDetail>) => {
		const { loaded, complete } = event.detail;
		try {
			let meta: any = {};
			let datas: any[] = [];
			if (questType == 'generated') {
				const { metadata, data } = await getUserQuestGenerated($token, pages);
				meta = metadata;
				datas = data;
			} else {
				const { metadata, data } = await getUserQuestHistory($token, questType, questStatus, pages);

				meta = metadata;
				datas = data;
			}
			if (pages == 1) {
				list = [...list, ...datas];
				pages += 1;
				loaded();
			} else if (meta.nextPage) {
				pages = meta.nextPage;
				list = [...list, ...datas];
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
		const { data } = await getUserQuestHistory($token, questType, questStatus, pages);
		list = data;

		goto(`${window.location.origin}/quests/more?type=${questType}&status=${questStatus}`);
	};

	onMount(async () => {
		list = data.quests;
	});
</script>

<svelte:head>
	<title>Quests {questType}</title>
	<meta name="description" content="QUEBYS - Quests {questType}" />
</svelte:head>

<div class="card-container">
	{#if questType != 'generated'}
		<div class="dialog">
			<h2>📜 {capitalizeWord(questType)} Quests</h2>
			<div class="filter-button">
				<button class="nb-button blue rounded" on:click={async () => await filterButton('null')}
					>All</button
				>
				<button
					class="nb-button blue rounded"
					on:click={async () => await filterButton('in progress')}>In progress</button
				>
				<button
					class="nb-button blue rounded"
					on:click={async () => await filterButton('completed')}>Completed</button
				>
				<button
					class="nb-button blue rounded"
					on:click={async () => await filterButton('not completed')}>Not Completed</button
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
	.dialog {
		width: 620px;
	}

	button {
		cursor: pointer;
	}

	@media (max-width: 480px) {
		.dialog {
			width: 98%;
		}
		.filter-button {
			display: flex;
			gap: 10px;
			width: 100%;
			overflow-x: scroll;
		}

		button {
			font-size: 15px !important;
		}
	}
</style>
