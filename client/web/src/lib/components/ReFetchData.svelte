<script>
	const reload = () => {
		console.log('Reload');
	};

	export let title = 'Failed to get data';
	export let buttonName = 'Reload';
	export let actionButton = reload;
</script>

<div class="dialog">
	<div class="alert error">
		<p>{title}</p>
		<button class="nb-button orange rounded" on:click={actionButton}>{buttonName}</button>
	</div>
</div>

<style>
	.dialog {
		width: 480px;
		padding: 20px;
		border-radius: 10px;
		margin-bottom: 20px;
	}
	button {
		margin-bottom: 18px;
	}
</style>
