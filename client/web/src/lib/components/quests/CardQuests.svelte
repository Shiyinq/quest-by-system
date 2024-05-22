<script>
	export let loading = false;
    export let title = "";
    export let description = "";
    export let quests;
</script>


<div class="dialog">
    <h2>{title}</h2>
    <p>{description}</p>
	{#if loading}
		<p>Loading...</p>
	{:else}
    <ul class="quest-list">
        {#each quests.data as {questId}}
            <li><a class="quest-link" href={'quests/' + questId}>{'/'+questId}</a></li>
        {/each}
    </ul>
	{/if}
</div>


<style>
    .dialog {
		width: 480px;
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