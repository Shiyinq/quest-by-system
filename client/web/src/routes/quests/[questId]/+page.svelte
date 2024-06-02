<script lang="ts">
	import QuestDetail from '$lib/components/quests/QuestDetail.svelte';

	export let data: any;
</script>

<div class="card-container">
	{#if data.questDetail}
		<QuestDetail quest={data.questDetail} showFullContent={true} />
	{/if}
</div>
