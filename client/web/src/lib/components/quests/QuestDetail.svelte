<script lang="ts">
	import { updateQuestStatus, acceptQuest } from '$lib/apis/quests';
	import { getUserQuestGenerated, getUserQuestHistory } from '$lib/apis/users';
	import { dataGeneratedQuests, dataAcceptedQuests } from '$lib/store';
	import { marked } from 'marked';

	export let quest;
	export let showFullContent = false;

	let statusChange = false;
	let loading = false;

	$: trimContent = showFullContent ? 'dialog' : 'dialog trim-content';
	$: showMoreButton = showFullContent;
	$: statusChanged = statusChange;
	$: loadingStatusChange = loading;

	marked.setOptions({
		breaks: true
	});

	const showMore = () => {
		showFullContent = !showFullContent;
	};

	const fetchGeneratedQuest = async () => {
		try {
			let getGeneratedQuest = await getUserQuestGenerated(localStorage.userId);
			dataGeneratedQuests.set(getGeneratedQuest);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchAcceptedQuest = async () => {
		try {
			let getAcceptedQuest = await getUserQuestHistory(localStorage.userId, 'all', 'in progress');
			dataAcceptedQuests.set(getAcceptedQuest);
		} catch (error) {
			console.log(error);
		}
	};

	const changeStatusQuest = async (questId: string, status: string) => {
		try {
			loading = true;
			await updateQuestStatus(questId, status);
			statusChange = true;
			loading = true;
		} catch (error) {
			loading = false;
		}
	};

	const acceptQuestGenerated = async (questId: string) => {
		try {
			loading = true;
			await acceptQuest(questId);
			await fetchGeneratedQuest();
			await fetchAcceptedQuest();
			statusChange = true;
			loading = true;
		} catch (error) {
			loading = false;
		}
	};
</script>

<div class={trimContent}>
	{#if statusChange}
		<div class="alert success">
			<p>Status updated successfully!</p>
		</div>
	{/if}
	<div class="quest-info">
		<p>Id: {quest.questId}</p>
		<p>Type: {quest.type}</p>
		<p>Status: {quest.status}</p>
		<p>Created At: {quest.createdAt}</p>
		{#if !showMoreButton}
			<div class="quest-button-container">
				<button class="nb-button blue" on:click={showMore}>⬇️ Show more</button>
			</div>
		{/if}
	</div>

	<div class="quest-content">
		<p>{@html marked(quest.quest)}</p>
	</div>

	<div class="quest-button-container">
		{#if !statusChanged}
			{#if quest.status == 'generated'}
				<button
					class="nb-button blue"
					on:click={async () => await acceptQuestGenerated(quest.questId)}
				>
					{#if loadingStatusChange}
						🔄 Loading...
					{:else}
						✅ Accept
					{/if}
				</button>
			{/if}
			{#if quest.status == 'in progress'}
				<button
					class="nb-button green"
					on:click={async () => await changeStatusQuest(quest.questId, 'completed')}
				>
					{#if loadingStatusChange}
						🔄 Loading...
					{:else}
						✅ Completed
					{/if}
				</button>
			{/if}
		{/if}
		{#if showMoreButton}
			<button class="nb-button sky-blue" on:click={showMore}>⬆️ Show less</button>
		{/if}
	</div>
</div>

<style>
	.dialog {
		width: 700px;
		padding: 20px;
		border-radius: 10px;
		margin-bottom: 20px;
	}

	.trim-content {
		height: 280px;
		overflow: hidden;
	}

	.quest-info,
	.quest-content {
		border: 2px solid #000;
		padding: 12px;
		border-radius: 4px;
		margin-bottom: 8px;
	}

	.quest-button-container {
		display: block;
		align-items: center;
		justify-content: center;
	}

	button {
		width: 100%;
		margin-bottom: 4px;
	}
</style>
