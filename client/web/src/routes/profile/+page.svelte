<script>
	import UserInfo from "$lib/components/profile/UserInfo.svelte";
	import CountQuests from "$lib/components/profile/CountQuests.svelte";

	const dailyQuest = {
		inProgress: 3,
		completed: 7,
		notCompleted: 2
	};

	const weeklyQuest = {
		inProgress: 0,
		completed: 3,
		notCompleted: 1
	};

	const monthlyQuest = {
		inProgress: 2,
		completed: 2,
		notCompleted: 2
	};

	const sideQuest = {
		inProgress: 1,
		completed: 4,
		notCompleted: 0
	};
</script>

<div class="card-container">
	<UserInfo />

	<CountQuests 
		title="📋 Daily Quest"
		quest={dailyQuest}
	/>

	<CountQuests 
		title="📋 Weekly Quest"
		quest={weeklyQuest}
	/>

	<CountQuests 
		title="📋 Monthly Quest"
		quest={monthlyQuest}
	/>
	<CountQuests 
		title="📋 Side Quest"
		quest={sideQuest}
	/>
</div>

<style>
    .card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
