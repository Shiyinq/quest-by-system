<script lang="ts">
    interface InfiniteEventDetail {
        loaded: () => void;
        complete: () => void;
    }

    import InfiniteLoading from 'svelte-infinite-loading';
    import QuestDetail from "$lib/components/quests/QuestDetail.svelte";
    import {page} from "$app/stores";
    import { getUserQuestHistory } from "$lib/apis/users";
    
    const questType = $page.params.questType;

    let list: any[] = [];
    let pages = 1;

    const infiniteHandler = async (event: CustomEvent<InfiniteEventDetail>) => {
        const { loaded, complete } = event.detail;
        try {
            const {metadata, data} = await getUserQuestHistory(localStorage.userId, questType, "null", pages);
            if (pages == 1) {
                list = [...list, ...data];
                pages += 1
                loaded();
            }else if (metadata.nextPage) {
                pages = metadata.nextPage; 
                list = [...list, ...data];
                loaded();
            } else {
                complete();
            }
        } catch (error) {
            complete();
        }
    }
</script>

<div class="card-container">
    {#each list as quest}
        <QuestDetail 
            quest={quest}
            showFullContent={false}
        />
    {/each}
</div>

<InfiniteLoading on:infinite={infiniteHandler} />
<br />

<style>
    .card-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
