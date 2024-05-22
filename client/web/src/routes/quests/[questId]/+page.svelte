<script>
    import QuestDetail from "$lib/components/quests/QuestDetail.svelte";
    import {page} from "$app/stores";
    import { getQuestDetail } from "$lib/apis/quests";
    import LoadingCard from "$lib/components/LoadingCard.svelte";
    import ReFetchData from "$lib/components/ReFetchData.svelte";

    const questId = $page.params.questId;

    let questDetail = getQuestDetail(questId);
    const reFetchQuestDetail = () => {
        questDetail = getQuestDetail(questId);
    }
</script>

<div class="card-container">
    {#await questDetail}
        <LoadingCard />
    {:then quest}
        <QuestDetail 
            quest={quest}
            showFullContent={true}
        />
    {:catch}
        <ReFetchData actionButton={reFetchQuestDetail}/>
    {/await}
</div>

<style>
    .card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>