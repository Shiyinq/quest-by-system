<script>
	import { marked } from 'marked';
	export let quest;
	export let showFullContent = false;

	$: trimContent = showFullContent ? 'dialog' : 'dialog trim-content';
	$: showMoreButton = showFullContent;

	marked.setOptions({
		breaks: true
	});

	const showMore = () => {
		showFullContent = !showFullContent;
	};
</script>

<div class={trimContent}>
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
		{#if quest.status == 'generated'}
			<button class="nb-button blue">✅ Accept</button>
		{/if}
		{#if quest.status == 'in progress'}
			<button class="nb-button green">✅ Completed</button>
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
