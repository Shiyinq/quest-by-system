<script lang="ts">
	import { Toaster, toast } from 'svelte-sonner';
	import { updateQuestStatus, acceptQuest } from '$lib/apis/quests';
	import { getUserQuestGenerated, getUserQuestHistory } from '$lib/apis/users';
	import { dataGeneratedQuests, dataAcceptedQuests, token } from '$lib/store';
	import { marked } from 'marked';
	import { emojiStatus } from '$lib/utils';

	export let quest;
	export let showFullContent = false;

	let loading = false;
	let statusChanged = false;

	$: trimContent = showFullContent ? 'dialog' : 'dialog trim-content';

	marked.setOptions({
		breaks: true
	});

	const showMore = () => {
		showFullContent = !showFullContent;
	};

	const fetchGeneratedQuest = async () => {
		try {
			let getGeneratedQuest = await getUserQuestGenerated($token);
			dataGeneratedQuests.set(getGeneratedQuest);
		} catch (error) {
			throw error;
		}
	};

	const fetchAcceptedQuest = async () => {
		try {
			let getAcceptedQuest = await getUserQuestHistory($token, 'all', 'in progress');
			dataAcceptedQuests.set(getAcceptedQuest);
		} catch (error) {
			throw error;
		}
	};

	const changeStatusQuest = async (questId: string, status: string) => {
		try {
			loading = true;
			let { message } = await updateQuestStatus($token, questId, status);
			statusChanged = true;
			showFullContent = false;
			toast.success(message);
		} catch (error: any) {
			loading = false;
			toast.error(error.detail || 'Internal Server Error!');
		} finally {
			loading = false;
		}
	};

	const acceptQuestGenerated = async (questId: string) => {
		try {
			loading = true;
			let { message } = await acceptQuest($token, questId);
			await fetchGeneratedQuest();
			await fetchAcceptedQuest();
			statusChanged = true;
			showFullContent = false;
			toast.success(message);
		} catch (error: any) {
			toast.error(error.detail || 'Internal Server Error!');
		} finally {
			loading = false;
		}
	};
</script>

<Toaster richColors position="top-center" />
<div class={trimContent}>
	<div class="quest-info">
		<div class="quest-info-content">
			<div class="quest-details">
				<p>Id: {quest.questId}</p>
				<p>Type: {quest.type}</p>
				<p>Status: {quest.status}</p>
				<p>Created At: {quest.createdAt}</p>
			</div>
			<div class="status-emoji">
				{@html emojiStatus(quest.status)}
			</div>
		</div>
		{#if !showFullContent}
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
					class="nb-button green"
					on:click={async () => await acceptQuestGenerated(quest.questId)}
				>
					{#if loading}
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
					{#if loading}
						🔄 Loading...
					{:else}
						✅ Completed
					{/if}
				</button>
			{/if}
		{/if}
		{#if showFullContent}
			<button class="nb-button blue" on:click={showMore}>⬆️ Show less</button>
		{/if}
	</div>
</div>

<style>
	.dialog {
		width: 700px;
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

	.quest-info {
		display: flex;
		flex-direction: column;
	}

	.quest-info-content {
		display: flex;
		justify-content: space-between;
	}

	.quest-details {
		flex: 1;
	}

	.status-emoji {
		font-size: 3em;
		margin-left: 10px;
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

	@media (max-width: 480px) {
		.dialog {
			width: 98%;
		}
	}
</style>
