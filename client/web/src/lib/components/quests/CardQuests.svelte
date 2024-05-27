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
		<div class="dialog-footer">
			<a class="nb-button blue" href={'/quests/more' + query}>More</a>
		</div>
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
</style>
