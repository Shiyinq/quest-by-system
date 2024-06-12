<script lang="ts">
	import { Toaster, toast } from 'svelte-sonner';
	import { getUserDetail, setUserGoal } from '$lib/apis/users';
	import { dataUserInfo, token } from '$lib/store';

	export let userInfo;

	let loading = false;
	let goal = userInfo?.goal;

	const changeGoal = async () => {
		if (userInfo.goal == goal) return;
		try {
			loading = !loading;
			let { message } = await setUserGoal($token, goal);
			let getUserInfo = await getUserDetail($token);
			dataUserInfo.set(getUserInfo);
			toast.success(message);
		} catch (error: any) {
			console.log(error);
			toast.error(error.detail || 'Internal Server Error!');
		} finally {
			loading = !loading;
		}
	};
</script>

<Toaster richColors position="top-center" />
<div class="dialog">
	<h2>🎯 Your Goal</h2>
	<div class="form-goal">
		<input class="nb-input default input-goal" placeholder="Type your goal" bind:value={goal} />
		<button class="nb-button blue button-goal" on:click={changeGoal} disabled={loading}
			>{loading ? 'LOADING...' : 'CHANGE'}</button
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
