<script lang="ts">
	let goal = '';
	const changeGoal = () => {
		console.log(goal);
	};
</script>

<div class="dialog">
	<h2>Your Goal</h2>
	<div class="form-goal">
		<input class="nb-input default input-goal" placeholder="Type your goal" bind:value={goal} />
		<button class="nb-button blue button-goal" on:click={changeGoal}>SAVE</button>
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
