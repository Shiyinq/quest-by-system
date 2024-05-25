<script>
	import { slide } from "svelte/transition";

	export let text = 'Loading...';
</script>

<div class="dialog" transition:slide="{{ duration: 1000 }}">
	<p>{text}</p>
</div>

<style>
	.dialog {
		width: 480px;
		padding: 20px;
		border-radius: 10px;
		margin-bottom: 20px;
	}
</style>
