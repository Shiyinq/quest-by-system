<script lang="ts">
	import { getUserDetail, setUserGoal } from '$lib/apis/users';
	import { dataUserInfo } from '$lib/store';

	export let userInfo;

	let goal = userInfo?.goal;
	let loading = false;
	const changeGoal = async () => {
		if (userInfo.goal == goal) return;
		try {
			loading = !loading;
			await setUserGoal(localStorage.userId, goal);
			let getUserInfo = await getUserDetail(localStorage.userId);
			dataUserInfo.set(getUserInfo);
			loading = !loading;
		} catch (error) {
			console.log(error);
			loading = !loading;
		}
	};
</script>

<div class="dialog">
	<h2>Your Goal</h2>
	<div class="form-goal">
		<input class="nb-input default input-goal" placeholder="Type your goal" bind:value={goal} />
		<button class="nb-button blue button-goal" on:click={changeGoal} disabled={loading}
			>{loading ? 'LOADING...' : 'SAVE'}</button
		>
	</div>
</div>

<style>
	.form-goal {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 3px;
	}
	.input-goal {
		width: 100%;
	}
	.button-goal {
		margin-top: 1px;
		width: 50%;
		padding: 11px;
		border-radius: 5px;
	}
</style>
