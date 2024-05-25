<script>
	import { getLabelNew } from '$lib/utils';
	export let loading = false;
	export let title = '';
	export let description = '';
	export let quests;
	export let moreQuestType = 'all';
</script>

<div class="dialog">
	<h2>{title}</h2>
	<p>{description}</p>
	{#if loading}
		<p>Loading...</p>
	{:else}
		<ul class="quest-list">
			{#each quests.data as { questId, createdAt }}
				<li>
					<a class="quest-link" href={'quests/' + questId}>{'/' + questId}</a>{getLabelNew(
						createdAt
					)}
				</li>
			{/each}
		</ul>
		<div class="dialog-footer">
			<a class="nb-button blue" href={'/quests/more/' + moreQuestType}>More</a>
		</div>
	{/if}
</div>

<style>
	.dialog {
		width: 480px;
		padding: 20px;
		border-radius: 10px;
		margin-bottom: 20px;
	}

	.dialog-footer {
		display: flex;
		justify-content: flex-end;
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

	p {
		font-size: 18px;
		margin-bottom: 20px;
	}

	.quest-list {
		list-style-type: none;
		padding: 0;
	}

	.quest-link {
		color: #0077b6;
		text-decoration: none;
		margin-right: 10px;
	}

	.quest-link:hover {
		text-decoration: underline;
	}
</style>
