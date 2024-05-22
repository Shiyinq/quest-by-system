<script>
	import { getUserDetail, getUserQuestStats } from "$lib/apis/users";
	import UserInfo from "$lib/components/profile/UserInfo.svelte";
	import CountQuests from "$lib/components/profile/CountQuests.svelte";
	import LoadingCard from "$lib/components/LoadingCard.svelte";
	import ReFetchData from "$lib/components/ReFetchData.svelte";

	let userId = "123";
	let getUserInfo = getUserDetail(localStorage.userId);
	let getQuestStats = getUserQuestStats(localStorage.userId);

	const questTypes = [
		{ title: "📋 Daily Quest", key: "daily" },
		{ title: "📋 Weekly Quest", key: "weekly" },
		{ title: "📋 Monthly Quest", key: "monthly" },
		{ title: "📋 Side Quest", key: "side" }
	];

	const reFetchUserInfo = () => {
		getUserInfo = getUserDetail(localStorage.userId);
	}

	const reFetchQuestStats = () => {
		getQuestStats = getUserQuestStats(localStorage.userId);
	}

</script>

<div class="card-container">
	{#await getUserInfo}
		<LoadingCard />
	{:then userInfo}
		<UserInfo userInfo={userInfo} />
	{:catch}
		<ReFetchData actionButton={reFetchUserInfo}/>
	{/await}

	{#await getQuestStats}
		<LoadingCard />
	{:then countQuests}
		{#each questTypes as questType}
			<CountQuests 
				title={questType.title}
				quest={countQuests[questType.key]}
			/>
		{/each}
	{:catch}
		<ReFetchData actionButton={reFetchQuestStats}/>
	{/await}
</div>

<style>
    .card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
