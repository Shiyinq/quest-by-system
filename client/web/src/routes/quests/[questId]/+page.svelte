<script>
    import {page} from "$app/stores";
    const questId = $page.params.questId;
</script>

<div class="card-container">
    <h1>Quest ID: {questId}</h1>
</div>

<style>
    .card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>