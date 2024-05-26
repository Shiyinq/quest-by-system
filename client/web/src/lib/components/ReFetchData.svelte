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
	button {
		margin-bottom: 18px;
	}
</style>
