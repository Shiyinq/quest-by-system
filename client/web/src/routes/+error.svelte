<script lang="ts">
	import { page } from '$app/stores';
	import { numberToEmoji } from '$lib/utils';
</script>

<div class="card-container">
	<h1>{numberToEmoji($page.status)}</h1>
	<p>Page {$page.error?.message || 'Error'}. Let's get you back on track!</p>
	<a href="/" class="nb-button blue">🚀 Back to Home</a>
</div>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 80vh;
	}
	h1 {
		font-size: 70px;
		margin: 0;
		padding: 0;
	}
</style>
