<script>
	import CardQuests from "$lib/components/quests/CardQuests.svelte";

	const dailyQuests = ["Quest 1", "Quest 2", "Quest 3"];
	const weeklyQuests = ["Quest 1", "Quest 2", "Quest 3"];
	const monthlyQuests = ["Quest 1", "Quest 2", "Quest 3"];
	const sideQuests = ["Quest 1", "Quest 2", "Quest 3"];
</script>

<div class="card-container">
    <div class="dialog">
        <h2>📜 Quests</h2>
        <p>Your quest history</p>
    </div>

	<CardQuests 
		title="📅 Daily"
		description="Your daily quest"
		quests={dailyQuests}
	/>

	<CardQuests 
		title="📆 Weekly"
		description="Your weekly quest"
		quests={weeklyQuests}
	/>

	<CardQuests 
		title="🗓️ Monthly"
		description="Your monthly quest"
		quests={monthlyQuests}
	/>

	<CardQuests 
		title="➡️ Side"
		description="Your side quest"
		quests={sideQuests}
	/>
</div>

<style>
    .card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

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
</style>
