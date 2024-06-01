<script>
	import { getLabelNew } from '$lib/utils';

	export let loading = false;
	export let title = '';
	export let description = '';
	export let quests;
	export let query = '?type=all';
</script>

<div class="dialog">
	<h2>{title}</h2>
	<p>{description}</p>
	{#if loading}
		<p>Loading...</p>
	{:else}
		<ul class="quest-list">
			{#if quests.data.length == 0}
				<div class="empty-state">
					<h2 class="empty-state-emoji">💤</h2>
					<p class="empty-state-text">You have no quests.</p>
				</div>
			{/if}
			{#each quests.data as { questId, status, createdAt }}
				<li>
					{#if status == 'generated'}
						<a class="quest-link" href={'quests/' + questId + '?type=generated'}>{'/' + questId}</a
						>{getLabelNew(createdAt)}
					{:else}
						<a class="quest-link" href={'quests/' + questId}>{'/' + questId}</a>{getLabelNew(
							createdAt
						)}
					{/if}
				</li>
			{/each}
		</ul>
		{#if quests.data.length > 0}
			<div class="dialog-footer">
				<a class="nb-button blue" href={'/quests/more' + query}>More</a>
			</div>
		{/if}
	{/if}
</div>

<style>
	.dialog-footer {
		display: flex;
		justify-content: flex-end;
	}

	.quest-list {
		list-style-type: none;
		padding: 0;
	}

	.quest-link:hover {
		text-decoration: underline;
	}

	.empty-state {
		text-align: center;
	}

	.empty-state-emoji {
		padding: 0;
	}

	.empty-state-text {
		margin: 0;
		padding: 0;
		font-size: 15px;
	}
</style>
