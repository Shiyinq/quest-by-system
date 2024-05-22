<script>
    import QuestDetail from "$lib/components/quests/QuestDetail.svelte";
    import {page} from "$app/stores";
    import { getUserQuestHistory } from "$lib/apis/users";

    import LoadingCard from "$lib/components/LoadingCard.svelte";
    import ReFetchData from "$lib/components/ReFetchData.svelte";

    const questType = $page.params.questType;

    let userId = "123";
    let questHistory = getUserQuestHistory(userId, questType);
    const reFetchQuestHistory = () => {
        questHistory = getUserQuestHistory(userId, questType);
    }
</script>

<div class="card-container">
    {#await questHistory}
        <LoadingCard />
    {:then quest}
        {#each quest.data as data}
            <QuestDetail 
                quest={data}
                showFullContent={false}
            />
        {/each}
    {:catch}
        <ReFetchData actionButton={reFetchQuestHistory}/>
    {/await}
</div>

<style>
    .card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>